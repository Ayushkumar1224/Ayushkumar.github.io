"use strict";
/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http2 = require("http2");
const util = require("util");
const constants_1 = require("./constants");
const server_call_1 = require("./server-call");
const server_credentials_1 = require("./server-credentials");
const resolver_1 = require("./resolver");
const logging = require("./logging");
const subchannel_address_1 = require("./subchannel-address");
const uri_parser_1 = require("./uri-parser");
const channelz_1 = require("./channelz");
const server_interceptors_1 = require("./server-interceptors");
const UNLIMITED_CONNECTION_AGE_MS = ~(1 << 31);
const KEEPALIVE_MAX_TIME_MS = ~(1 << 31);
const KEEPALIVE_TIMEOUT_MS = 20000;
const { HTTP2_HEADER_PATH } = http2.constants;
const TRACER_NAME = 'server';
function noop() { }
/**
 * Decorator to wrap a class method with util.deprecate
 * @param message The message to output if the deprecated method is called
 * @returns
 */
function deprecate(message) {
    return function (target, context) {
        return util.deprecate(target, message);
    };
}
function getUnimplementedStatusResponse(methodName) {
    return {
        code: constants_1.Status.UNIMPLEMENTED,
        details: `The server does not implement the method ${methodName}`,
    };
}
function getDefaultHandler(handlerType, methodName) {
    const unimplementedStatusResponse = getUnimplementedStatusResponse(methodName);
    switch (handlerType) {
        case 'unary':
            return (call, callback) => {
                callback(unimplementedStatusResponse, null);
            };
        case 'clientStream':
            return (call, callback) => {
                callback(unimplementedStatusResponse, null);
            };
        case 'serverStream':
            return (call) => {
                call.emit('error', unimplementedStatusResponse);
            };
        case 'bidi':
            return (call) => {
                call.emit('error', unimplementedStatusResponse);
            };
        default:
            throw new Error(`Invalid handlerType ${handlerType}`);
    }
}
let Server = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _start_decorators;
    return _a = class Server {
            constructor(options) {
                var _b, _c, _d, _e, _f;
                this.boundPorts = (__runInitializers(this, _instanceExtraInitializers), new Map());
                this.http2Servers = new Map();
                this.handlers = new Map();
                this.sessions = new Map();
                /**
                 * This field only exists to ensure that the start method throws an error if
                 * it is called twice, as it did previously.
                 */
                this.started = false;
                this.shutdown = false;
                this.serverAddressString = 'null';
                // Channelz Info
                this.channelzEnabled = true;
                this.channelzTrace = new channelz_1.ChannelzTrace();
                this.callTracker = new channelz_1.ChannelzCallTracker();
                this.listenerChildrenTracker = new channelz_1.ChannelzChildrenTracker();
                this.sessionChildrenTracker = new channelz_1.ChannelzChildrenTracker();
                this.options = options !== null && options !== void 0 ? options : {};
                if (this.options['grpc.enable_channelz'] === 0) {
                    this.channelzEnabled = false;
                }
                this.channelzRef = (0, channelz_1.registerChannelzServer)(() => this.getChannelzInfo(), this.channelzEnabled);
                if (this.channelzEnabled) {
                    this.channelzTrace.addTrace('CT_INFO', 'Server created');
                }
                this.maxConnectionAgeMs =
                    (_b = this.options['grpc.max_connection_age_ms']) !== null && _b !== void 0 ? _b : UNLIMITED_CONNECTION_AGE_MS;
                this.maxConnectionAgeGraceMs =
                    (_c = this.options['grpc.max_connection_age_grace_ms']) !== null && _c !== void 0 ? _c : UNLIMITED_CONNECTION_AGE_MS;
                this.keepaliveTimeMs =
                    (_d = this.options['grpc.keepalive_time_ms']) !== null && _d !== void 0 ? _d : KEEPALIVE_MAX_TIME_MS;
                this.keepaliveTimeoutMs =
                    (_e = this.options['grpc.keepalive_timeout_ms']) !== null && _e !== void 0 ? _e : KEEPALIVE_TIMEOUT_MS;
                this.commonServerOptions = {
                    maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER,
                };
                if ('grpc-node.max_session_memory' in this.options) {
                    this.commonServerOptions.maxSessionMemory =
                        this.options['grpc-node.max_session_memory'];
                }
                else {
                    /* By default, set a very large max session memory limit, to effectively
                     * disable enforcement of the limit. Some testing indicates that Node's
                     * behavior degrades badly when this limit is reached, so we solve that
                     * by disabling the check entirely. */
                    this.commonServerOptions.maxSessionMemory = Number.MAX_SAFE_INTEGER;
                }
                if ('grpc.max_concurrent_streams' in this.options) {
                    this.commonServerOptions.settings = {
                        maxConcurrentStreams: this.options['grpc.max_concurrent_streams'],
                    };
                }
                this.interceptors = (_f = this.options.interceptors) !== null && _f !== void 0 ? _f : [];
                this.trace('Server constructed');
            }
            getChannelzInfo() {
                return {
                    trace: this.channelzTrace,
                    callTracker: this.callTracker,
                    listenerChildren: this.listenerChildrenTracker.getChildLists(),
                    sessionChildren: this.sessionChildrenTracker.getChildLists(),
                };
            }
            getChannelzSessionInfoGetter(session) {
                return () => {
                    var _b, _c, _d;
                    const sessionInfo = this.sessions.get(session);
                    const sessionSocket = session.socket;
                    const remoteAddress = sessionSocket.remoteAddress
                        ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.remoteAddress, sessionSocket.remotePort)
                        : null;
                    const localAddress = sessionSocket.localAddress
                        ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.localAddress, sessionSocket.localPort)
                        : null;
                    let tlsInfo;
                    if (session.encrypted) {
                        const tlsSocket = sessionSocket;
                        const cipherInfo = tlsSocket.getCipher();
                        const certificate = tlsSocket.getCertificate();
                        const peerCertificate = tlsSocket.getPeerCertificate();
                        tlsInfo = {
                            cipherSuiteStandardName: (_b = cipherInfo.standardName) !== null && _b !== void 0 ? _b : null,
                            cipherSuiteOtherName: cipherInfo.standardName
                                ? null
                                : cipherInfo.name,
                            localCertificate: certificate && 'raw' in certificate ? certificate.raw : null,
                            remoteCertificate: peerCertificate && 'raw' in peerCertificate
                                ? peerCertificate.raw
                                : null,
                        };
                    }
                    else {
                        tlsInfo = null;
                    }
                    const socketInfo = {
                        remoteAddress: remoteAddress,
                        localAddress: localAddress,
                        security: tlsInfo,
                        remoteName: null,
                        streamsStarted: sessionInfo.streamTracker.callsStarted,
                        streamsSucceeded: sessionInfo.streamTracker.callsSucceeded,
                        streamsFailed: sessionInfo.streamTracker.callsFailed,
                        messagesSent: sessionInfo.messagesSent,
                        messagesReceived: sessionInfo.messagesReceived,
                        keepAlivesSent: 0,
                        lastLocalStreamCreatedTimestamp: null,
                        lastRemoteStreamCreatedTimestamp: sessionInfo.streamTracker.lastCallStartedTimestamp,
                        lastMessageSentTimestamp: sessionInfo.lastMessageSentTimestamp,
                        lastMessageReceivedTimestamp: sessionInfo.lastMessageReceivedTimestamp,
                        localFlowControlWindow: (_c = session.state.localWindowSize) !== null && _c !== void 0 ? _c : null,
                        remoteFlowControlWindow: (_d = session.state.remoteWindowSize) !== null && _d !== void 0 ? _d : null,
                    };
                    return socketInfo;
                };
            }
            trace(text) {
                logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, '(' + this.channelzRef.id + ') ' + text);
            }
            addProtoService() {
                throw new Error('Not implemented. Use addService() instead');
            }
            addService(service, implementation) {
                if (service === null ||
                    typeof service !== 'object' ||
                    implementation === null ||
                    typeof implementation !== 'object') {
                    throw new Error('addService() requires two objects as arguments');
                }
                const serviceKeys = Object.keys(service);
                if (serviceKeys.length === 0) {
                    throw new Error('Cannot add an empty service to a server');
                }
                serviceKeys.forEach(name => {
                    const attrs = service[name];
                    let methodType;
                    if (attrs.requestStream) {
                        if (attrs.responseStream) {
                            methodType = 'bidi';
                        }
                        else {
                            methodType = 'clientStream';
                        }
                    }
                    else {
                        if (attrs.responseStream) {
                            methodType = 'serverStream';
                        }
                        else {
                            methodType = 'unary';
                        }
                    }
                    let implFn = implementation[name];
                    let impl;
                    if (implFn === undefined && typeof attrs.originalName === 'string') {
                        implFn = implementation[attrs.originalName];
                    }
                    if (implFn !== undefined) {
                        impl = implFn.bind(implementation);
                    }
                    else {
                        impl = getDefaultHandler(methodType, name);
                    }
                    const success = this.register(attrs.path, impl, attrs.responseSerialize, attrs.requestDeserialize, methodType);
                    if (success === false) {
                        throw new Error(`Method handler for ${attrs.path} already provided.`);
                    }
                });
            }
            removeService(service) {
                if (service === null || typeof service !== 'object') {
                    throw new Error('removeService() requires object as argument');
                }
                const serviceKeys = Object.keys(service);
                serviceKeys.forEach(name => {
                    const attrs = service[name];
                    this.unregister(attrs.path);
                });
            }
            bind(port, creds) {
                throw new Error('Not implemented. Use bindAsync() instead');
            }
            registerListenerToChannelz(boundAddress) {
                return (0, channelz_1.registerChannelzSocket)((0, subchannel_address_1.subchannelAddressToString)(boundAddress), () => {
                    return {
                        localAddress: boundAddress,
                        remoteAddress: null,
                        security: null,
                        remoteName: null,
                        streamsStarted: 0,
                        streamsSucceeded: 0,
                        streamsFailed: 0,
                        messagesSent: 0,
                        messagesReceived: 0,
                        keepAlivesSent: 0,
                        lastLocalStreamCreatedTimestamp: null,
                        lastRemoteStreamCreatedTimestamp: null,
                        lastMessageSentTimestamp: null,
                        lastMessageReceivedTimestamp: null,
                        localFlowControlWindow: null,
                        remoteFlowControlWindow: null,
                    };
                }, this.channelzEnabled);
            }
            createHttp2Server(credentials) {
                let http2Server;
                if (credentials._isSecure()) {
                    const secureServerOptions = Object.assign(this.commonServerOptions, credentials._getSettings());
                    secureServerOptions.enableTrace =
                        this.options['grpc-node.tls_enable_trace'] === 1;
                    http2Server = http2.createSecureServer(secureServerOptions);
                    http2Server.on('secureConnection', (socket) => {
                        /* These errors need to be handled by the user of Http2SecureServer,
                         * according to https://github.com/nodejs/node/issues/35824 */
                        socket.on('error', (e) => {
                            this.trace('An incoming TLS connection closed with error: ' + e.message);
                        });
                    });
                }
                else {
                    http2Server = http2.createServer(this.commonServerOptions);
                }
                http2Server.setTimeout(0, noop);
                this._setupHandlers(http2Server);
                return http2Server;
            }
            bindOneAddress(address, boundPortObject) {
                this.trace('Attempting to bind ' + (0, subchannel_address_1.subchannelAddressToString)(address));
                const http2Server = this.createHttp2Server(boundPortObject.credentials);
                return new Promise((resolve, reject) => {
                    const onError = (err) => {
                        this.trace('Failed to bind ' +
                            (0, subchannel_address_1.subchannelAddressToString)(address) +
                            ' with error ' +
                            err.message);
                        resolve({
                            port: 'port' in address ? address.port : 1,
                            error: err.message
                        });
                    };
                    http2Server.once('error', onError);
                    http2Server.listen(address, () => {
                        const boundAddress = http2Server.address();
                        let boundSubchannelAddress;
                        if (typeof boundAddress === 'string') {
                            boundSubchannelAddress = {
                                path: boundAddress,
                            };
                        }
                        else {
                            boundSubchannelAddress = {
                                host: boundAddress.address,
                                port: boundAddress.port,
                            };
                        }
                        const channelzRef = this.registerListenerToChannelz(boundSubchannelAddress);
                        if (this.channelzEnabled) {
                            this.listenerChildrenTracker.refChild(channelzRef);
                        }
                        this.http2Servers.set(http2Server, {
                            channelzRef: channelzRef,
                            sessions: new Set()
                        });
                        boundPortObject.listeningServers.add(http2Server);
                        this.trace('Successfully bound ' +
                            (0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress));
                        resolve({
                            port: 'port' in boundSubchannelAddress
                                ? boundSubchannelAddress.port
                                : 1
                        });
                        http2Server.removeListener('error', onError);
                    });
                });
            }
            async bindManyPorts(addressList, boundPortObject) {
                if (addressList.length === 0) {
                    return {
                        count: 0,
                        port: 0,
                        errors: []
                    };
                }
                if ((0, subchannel_address_1.isTcpSubchannelAddress)(addressList[0]) && addressList[0].port === 0) {
                    /* If binding to port 0, first try to bind the first address, then bind
                     * the rest of the address list to the specific port that it binds. */
                    const firstAddressResult = await this.bindOneAddress(addressList[0], boundPortObject);
                    if (firstAddressResult.error) {
                        /* If the first address fails to bind, try the same operation starting
                         * from the second item in the list. */
                        const restAddressResult = await this.bindManyPorts(addressList.slice(1), boundPortObject);
                        return Object.assign(Object.assign({}, restAddressResult), { errors: [firstAddressResult.error, ...restAddressResult.errors] });
                    }
                    else {
                        const restAddresses = addressList.slice(1).map(address => (0, subchannel_address_1.isTcpSubchannelAddress)(address) ? { host: address.host, port: firstAddressResult.port } : address);
                        const restAddressResult = await Promise.all(restAddresses.map(address => this.bindOneAddress(address, boundPortObject)));
                        const allResults = [firstAddressResult, ...restAddressResult];
                        return {
                            count: allResults.filter(result => result.error === undefined).length,
                            port: firstAddressResult.port,
                            errors: allResults.filter(result => result.error).map(result => result.error)
                        };
                    }
                }
                else {
                    const allResults = await Promise.all(addressList.map(address => this.bindOneAddress(address, boundPortObject)));
                    return {
                        count: allResults.filter(result => result.error === undefined).length,
                        port: allResults[0].port,
                        errors: allResults.filter(result => result.error).map(result => result.error)
                    };
                }
            }
            async bindAddressList(addressList, boundPortObject) {
                let bindResult;
                try {
                    bindResult = await this.bindManyPorts(addressList, boundPortObject);
                }
                catch (error) {
                    throw error;
                }
                if (bindResult.count > 0) {
                    if (bindResult.count < addressList.length) {
                        logging.log(constants_1.LogVerbosity.INFO, `WARNING Only ${bindResult.count} addresses added out of total ${addressList.length} resolved`);
                    }
                    return bindResult.port;
                }
                else {
                    const errorString = `No address added out of total ${addressList.length} resolved`;
                    logging.log(constants_1.LogVerbosity.ERROR, errorString);
                    throw new Error(`${errorString} errors: [${bindResult.errors.join(',')}]`);
                }
            }
            resolvePort(port) {
                return new Promise((resolve, reject) => {
                    const resolverListener = {
                        onSuccessfulResolution: (endpointList, serviceConfig, serviceConfigError) => {
                            // We only want one resolution result. Discard all future results
                            resolverListener.onSuccessfulResolution = () => { };
                            const addressList = [].concat(...endpointList.map(endpoint => endpoint.addresses));
                            if (addressList.length === 0) {
                                reject(new Error(`No addresses resolved for port ${port}`));
                                return;
                            }
                            resolve(addressList);
                        },
                        onError: error => {
                            reject(new Error(error.details));
                        },
                    };
                    const resolver = (0, resolver_1.createResolver)(port, resolverListener, this.options);
                    resolver.updateResolution();
                });
            }
            async bindPort(port, boundPortObject) {
                const addressList = await this.resolvePort(port);
                if (boundPortObject.cancelled) {
                    this.completeUnbind(boundPortObject);
                    throw new Error('bindAsync operation cancelled by unbind call');
                }
                const portNumber = await this.bindAddressList(addressList, boundPortObject);
                if (boundPortObject.cancelled) {
                    this.completeUnbind(boundPortObject);
                    throw new Error('bindAsync operation cancelled by unbind call');
                }
                return portNumber;
            }
            normalizePort(port) {
                const initialPortUri = (0, uri_parser_1.parseUri)(port);
                if (initialPortUri === null) {
                    throw new Error(`Could not parse port "${port}"`);
                }
                const portUri = (0, resolver_1.mapUriDefaultScheme)(initialPortUri);
                if (portUri === null) {
                    throw new Error(`Could not get a default scheme for port "${port}"`);
                }
                return portUri;
            }
            bindAsync(port, creds, callback) {
                if (this.shutdown) {
                    throw new Error('bindAsync called after shutdown');
                }
                if (typeof port !== 'string') {
                    throw new TypeError('port must be a string');
                }
                if (creds === null || !(creds instanceof server_credentials_1.ServerCredentials)) {
                    throw new TypeError('creds must be a ServerCredentials object');
                }
                if (typeof callback !== 'function') {
                    throw new TypeError('callback must be a function');
                }
                this.trace('bindAsync port=' + port);
                const portUri = this.normalizePort(port);
                const deferredCallback = (error, port) => {
                    process.nextTick(() => callback(error, port));
                };
                /* First, if this port is already bound or that bind operation is in
                 * progress, use that result. */
                let boundPortObject = this.boundPorts.get((0, uri_parser_1.uriToString)(portUri));
                if (boundPortObject) {
                    if (!creds._equals(boundPortObject.credentials)) {
                        deferredCallback(new Error(`${port} already bound with incompatible credentials`), 0);
                        return;
                    }
                    /* If that operation has previously been cancelled by an unbind call,
                     * uncancel it. */
                    boundPortObject.cancelled = false;
                    if (boundPortObject.completionPromise) {
                        boundPortObject.completionPromise.then(portNum => callback(null, portNum), error => callback(error, 0));
                    }
                    else {
                        deferredCallback(null, boundPortObject.portNumber);
                    }
                    return;
                }
                boundPortObject = {
                    mapKey: (0, uri_parser_1.uriToString)(portUri),
                    originalUri: portUri,
                    completionPromise: null,
                    cancelled: false,
                    portNumber: 0,
                    credentials: creds,
                    listeningServers: new Set()
                };
                const splitPort = (0, uri_parser_1.splitHostPort)(portUri.path);
                const completionPromise = this.bindPort(portUri, boundPortObject);
                boundPortObject.completionPromise = completionPromise;
                /* If the port number is 0, defer populating the map entry until after the
                 * bind operation completes and we have a specific port number. Otherwise,
                 * populate it immediately. */
                if ((splitPort === null || splitPort === void 0 ? void 0 : splitPort.port) === 0) {
                    completionPromise.then(portNum => {
                        const finalUri = {
                            scheme: portUri.scheme,
                            authority: portUri.authority,
                            path: (0, uri_parser_1.combineHostPort)({ host: splitPort.host, port: portNum })
                        };
                        boundPortObject.mapKey = (0, uri_parser_1.uriToString)(finalUri);
                        boundPortObject.completionPromise = null;
                        boundPortObject.portNumber = portNum;
                        this.boundPorts.set(boundPortObject.mapKey, boundPortObject);
                        callback(null, portNum);
                    }, error => {
                        callback(error, 0);
                    });
                }
                else {
                    this.boundPorts.set(boundPortObject.mapKey, boundPortObject);
                    completionPromise.then(portNum => {
                        boundPortObject.completionPromise = null;
                        boundPortObject.portNumber = portNum;
                        callback(null, portNum);
                    }, error => {
                        callback(error, 0);
                    });
                }
            }
            closeServer(server, callback) {
                this.trace('Closing server with address ' + JSON.stringify(server.address()));
                const serverInfo = this.http2Servers.get(server);
                server.close(() => {
                    if (this.channelzEnabled && serverInfo) {
                        this.listenerChildrenTracker.unrefChild(serverInfo.channelzRef);
                        (0, channelz_1.unregisterChannelzRef)(serverInfo.channelzRef);
                    }
                    this.http2Servers.delete(server);
                    callback === null || callback === void 0 ? void 0 : callback();
                });
            }
            closeSession(session, callback) {
                var _b;
                this.trace('Closing session initiated by ' + ((_b = session.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress));
                const sessionInfo = this.sessions.get(session);
                const closeCallback = () => {
                    if (this.channelzEnabled && sessionInfo) {
                        this.sessionChildrenTracker.unrefChild(sessionInfo.ref);
                        (0, channelz_1.unregisterChannelzRef)(sessionInfo.ref);
                    }
                    this.sessions.delete(session);
                    callback === null || callback === void 0 ? void 0 : callback();
                };
                if (session.closed) {
                    process.nextTick(closeCallback);
                }
                else {
                    session.close(closeCallback);
                }
            }
            completeUnbind(boundPortObject) {
                for (const server of boundPortObject.listeningServers) {
                    const serverInfo = this.http2Servers.get(server);
                    this.closeServer(server, () => {
                        boundPortObject.listeningServers.delete(server);
                    });
                    if (serverInfo) {
                        for (const session of serverInfo.sessions) {
                            this.closeSession(session);
                        }
                    }
                }
                this.boundPorts.delete(boundPortObject.mapKey);
            }
            /**
             * Unbind a previously bound port, or cancel an in-progress bindAsync
             * operation. If port 0 was bound, only the actual bound port can be
             * unbound. For example, if bindAsync was called with "localhost:0" and the
             * bound port result was 54321, it can be unbound as "localhost:54321".
             * @param port
             */
            unbind(port) {
                this.trace('unbind port=' + port);
                const portUri = this.normalizePort(port);
                const splitPort = (0, uri_parser_1.splitHostPort)(portUri.path);
                if ((splitPort === null || splitPort === void 0 ? void 0 : splitPort.port) === 0) {
                    throw new Error('Cannot unbind port 0');
                }
                const boundPortObject = this.boundPorts.get((0, uri_parser_1.uriToString)(portUri));
                if (boundPortObject) {
                    this.trace('unbinding ' + boundPortObject.mapKey + ' originally bound as ' + (0, uri_parser_1.uriToString)(boundPortObject.originalUri));
                    /* If the bind operation is pending, the cancelled flag will trigger
                     * the unbind operation later. */
                    if (boundPortObject.completionPromise) {
                        boundPortObject.cancelled = true;
                    }
                    else {
                        this.completeUnbind(boundPortObject);
                    }
                }
            }
            /**
             * Gracefully close all connections associated with a previously bound port.
             * After the grace time, forcefully close all remaining open connections.
             *
             * If port 0 was bound, only the actual bound port can be
             * drained. For example, if bindAsync was called with "localhost:0" and the
             * bound port result was 54321, it can be drained as "localhost:54321".
             * @param port
             * @param graceTimeMs
             * @returns
             */
            drain(port, graceTimeMs) {
                var _b, _c;
                this.trace('drain port=' + port + ' graceTimeMs=' + graceTimeMs);
                const portUri = this.normalizePort(port);
                const splitPort = (0, uri_parser_1.splitHostPort)(portUri.path);
                if ((splitPort === null || splitPort === void 0 ? void 0 : splitPort.port) === 0) {
                    throw new Error('Cannot drain port 0');
                }
                const boundPortObject = this.boundPorts.get((0, uri_parser_1.uriToString)(portUri));
                if (!boundPortObject) {
                    return;
                }
                const allSessions = new Set();
                for (const http2Server of boundPortObject.listeningServers) {
                    const serverEntry = this.http2Servers.get(http2Server);
                    if (!serverEntry) {
                        continue;
                    }
                    for (const session of serverEntry.sessions) {
                        allSessions.add(session);
                        this.closeSession(session, () => {
                            allSessions.delete(session);
                        });
                    }
                }
                /* After the grace time ends, send another goaway to all remaining sessions
                 * with the CANCEL code. */
                (_c = (_b = setTimeout(() => {
                    for (const session of allSessions) {
                        session.destroy(http2.constants.NGHTTP2_CANCEL);
                    }
                }, graceTimeMs)).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
            }
            forceShutdown() {
                for (const boundPortObject of this.boundPorts.values()) {
                    boundPortObject.cancelled = true;
                }
                this.boundPorts.clear();
                // Close the server if it is still running.
                for (const server of this.http2Servers.keys()) {
                    this.closeServer(server);
                }
                // Always destroy any available sessions. It's possible that one or more
                // tryShutdown() calls are in progress. Don't wait on them to finish.
                this.sessions.forEach((channelzInfo, session) => {
                    this.closeSession(session);
                    // Cast NGHTTP2_CANCEL to any because TypeScript doesn't seem to
                    // recognize destroy(code) as a valid signature.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    session.destroy(http2.constants.NGHTTP2_CANCEL);
                });
                this.sessions.clear();
                if (this.channelzEnabled) {
                    (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
                }
                this.shutdown = true;
            }
            register(name, handler, serialize, deserialize, type) {
                if (this.handlers.has(name)) {
                    return false;
                }
                this.handlers.set(name, {
                    func: handler,
                    serialize,
                    deserialize,
                    type,
                    path: name,
                });
                return true;
            }
            unregister(name) {
                return this.handlers.delete(name);
            }
            /**
             * @deprecated No longer needed as of version 1.10.x
             */
            start() {
                if (this.http2Servers.size === 0 ||
                    [...this.http2Servers.keys()].every(server => !server.listening)) {
                    throw new Error('server must be bound in order to start');
                }
                if (this.started === true) {
                    throw new Error('server is already started');
                }
                this.started = true;
            }
            tryShutdown(callback) {
                var _b;
                const wrappedCallback = (error) => {
                    if (this.channelzEnabled) {
                        (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
                    }
                    callback(error);
                };
                let pendingChecks = 0;
                function maybeCallback() {
                    pendingChecks--;
                    if (pendingChecks === 0) {
                        wrappedCallback();
                    }
                }
                this.shutdown = true;
                for (const server of this.http2Servers.keys()) {
                    pendingChecks++;
                    const serverString = this.http2Servers.get(server).channelzRef.name;
                    this.trace('Waiting for server ' + serverString + ' to close');
                    this.closeServer(server, () => {
                        this.trace('Server ' + serverString + ' finished closing');
                        maybeCallback();
                    });
                }
                for (const session of this.sessions.keys()) {
                    pendingChecks++;
                    const sessionString = (_b = session.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress;
                    this.trace('Waiting for session ' + sessionString + ' to close');
                    this.closeSession(session, () => {
                        this.trace('Session ' + sessionString + ' finished closing');
                        maybeCallback();
                    });
                }
                if (pendingChecks === 0) {
                    wrappedCallback();
                }
            }
            addHttp2Port() {
                throw new Error('Not yet implemented');
            }
            /**
             * Get the channelz reference object for this server. The returned value is
             * garbage if channelz is disabled for this server.
             * @returns
             */
            getChannelzRef() {
                return this.channelzRef;
            }
            _verifyContentType(stream, headers) {
                const contentType = headers[http2.constants.HTTP2_HEADER_CONTENT_TYPE];
                if (typeof contentType !== 'string' ||
                    !contentType.startsWith('application/grpc')) {
                    stream.respond({
                        [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE,
                    }, { endStream: true });
                    return false;
                }
                return true;
            }
            _retrieveHandler(path) {
                this.trace('Received call to method ' +
                    path +
                    ' at address ' +
                    this.serverAddressString);
                const handler = this.handlers.get(path);
                if (handler === undefined) {
                    this.trace('No handler registered for method ' +
                        path +
                        '. Sending UNIMPLEMENTED status.');
                    return null;
                }
                return handler;
            }
            _respondWithError(err, stream, channelzSessionInfo = null) {
                var _b, _c;
                const trailersToSend = Object.assign({ 'grpc-status': (_b = err.code) !== null && _b !== void 0 ? _b : constants_1.Status.INTERNAL, 'grpc-message': err.details, [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_OK, [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: 'application/grpc+proto' }, (_c = err.metadata) === null || _c === void 0 ? void 0 : _c.toHttp2Headers());
                stream.respond(trailersToSend, { endStream: true });
                if (this.channelzEnabled) {
                    this.callTracker.addCallFailed();
                    channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
                }
            }
            _channelzHandler(stream, headers) {
                const channelzSessionInfo = this.sessions.get(stream.session);
                this.callTracker.addCallStarted();
                channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallStarted();
                if (!this._verifyContentType(stream, headers)) {
                    this.callTracker.addCallFailed();
                    channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
                    return;
                }
                const path = headers[HTTP2_HEADER_PATH];
                const handler = this._retrieveHandler(path);
                if (!handler) {
                    this._respondWithError(getUnimplementedStatusResponse(path), stream, channelzSessionInfo);
                    return;
                }
                let callEventTracker = {
                    addMessageSent: () => {
                        if (channelzSessionInfo) {
                            channelzSessionInfo.messagesSent += 1;
                            channelzSessionInfo.lastMessageSentTimestamp = new Date();
                        }
                    },
                    addMessageReceived: () => {
                        if (channelzSessionInfo) {
                            channelzSessionInfo.messagesReceived += 1;
                            channelzSessionInfo.lastMessageReceivedTimestamp = new Date();
                        }
                    },
                    onCallEnd: status => {
                        if (status.code === constants_1.Status.OK) {
                            this.callTracker.addCallSucceeded();
                        }
                        else {
                            this.callTracker.addCallFailed();
                        }
                    },
                    onStreamEnd: success => {
                        if (channelzSessionInfo) {
                            if (success) {
                                channelzSessionInfo.streamTracker.addCallSucceeded();
                            }
                            else {
                                channelzSessionInfo.streamTracker.addCallFailed();
                            }
                        }
                    }
                };
                const call = (0, server_interceptors_1.getServerInterceptingCall)(this.interceptors, stream, headers, callEventTracker, handler, this.options);
                if (!this._runHandlerForCall(call, handler)) {
                    this.callTracker.addCallFailed();
                    channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
                    call.sendStatus({
                        code: constants_1.Status.INTERNAL,
                        details: `Unknown handler type: ${handler.type}`,
                    });
                }
            }
            _streamHandler(stream, headers) {
                if (this._verifyContentType(stream, headers) !== true) {
                    return;
                }
                const path = headers[HTTP2_HEADER_PATH];
                const handler = this._retrieveHandler(path);
                if (!handler) {
                    this._respondWithError(getUnimplementedStatusResponse(path), stream, null);
                    return;
                }
                const call = (0, server_interceptors_1.getServerInterceptingCall)(this.interceptors, stream, headers, null, handler, this.options);
                if (!this._runHandlerForCall(call, handler)) {
                    call.sendStatus({
                        code: constants_1.Status.INTERNAL,
                        details: `Unknown handler type: ${handler.type}`,
                    });
                }
            }
            _runHandlerForCall(call, handler) {
                const { type } = handler;
                if (type === 'unary') {
                    handleUnary(call, handler);
                }
                else if (type === 'clientStream') {
                    handleClientStreaming(call, handler);
                }
                else if (type === 'serverStream') {
                    handleServerStreaming(call, handler);
                }
                else if (type === 'bidi') {
                    handleBidiStreaming(call, handler);
                }
                else {
                    return false;
                }
                return true;
            }
            _setupHandlers(http2Server) {
                if (http2Server === null) {
                    return;
                }
                const serverAddress = http2Server.address();
                let serverAddressString = 'null';
                if (serverAddress) {
                    if (typeof serverAddress === 'string') {
                        serverAddressString = serverAddress;
                    }
                    else {
                        serverAddressString = serverAddress.address + ':' + serverAddress.port;
                    }
                }
                this.serverAddressString = serverAddressString;
                const handler = this.channelzEnabled
                    ? this._channelzHandler
                    : this._streamHandler;
                http2Server.on('stream', handler.bind(this));
                http2Server.on('session', session => {
                    var _b, _c, _d, _e, _f, _g;
                    const channelzRef = (0, channelz_1.registerChannelzSocket)((_b = session.socket.remoteAddress) !== null && _b !== void 0 ? _b : 'unknown', this.getChannelzSessionInfoGetter(session), this.channelzEnabled);
                    const channelzSessionInfo = {
                        ref: channelzRef,
                        streamTracker: new channelz_1.ChannelzCallTracker(),
                        messagesSent: 0,
                        messagesReceived: 0,
                        lastMessageSentTimestamp: null,
                        lastMessageReceivedTimestamp: null,
                    };
                    (_c = this.http2Servers.get(http2Server)) === null || _c === void 0 ? void 0 : _c.sessions.add(session);
                    this.sessions.set(session, channelzSessionInfo);
                    const clientAddress = session.socket.remoteAddress;
                    if (this.channelzEnabled) {
                        this.channelzTrace.addTrace('CT_INFO', 'Connection established by client ' + clientAddress);
                        this.sessionChildrenTracker.refChild(channelzRef);
                    }
                    let connectionAgeTimer = null;
                    let connectionAgeGraceTimer = null;
                    let sessionClosedByServer = false;
                    if (this.maxConnectionAgeMs !== UNLIMITED_CONNECTION_AGE_MS) {
                        // Apply a random jitter within a +/-10% range
                        const jitterMagnitude = this.maxConnectionAgeMs / 10;
                        const jitter = Math.random() * jitterMagnitude * 2 - jitterMagnitude;
                        connectionAgeTimer = (_e = (_d = setTimeout(() => {
                            var _b, _c;
                            sessionClosedByServer = true;
                            if (this.channelzEnabled) {
                                this.channelzTrace.addTrace('CT_INFO', 'Connection dropped by max connection age from ' + clientAddress);
                            }
                            try {
                                session.goaway(http2.constants.NGHTTP2_NO_ERROR, ~(1 << 31), Buffer.from('max_age'));
                            }
                            catch (e) {
                                // The goaway can't be sent because the session is already closed
                                session.destroy();
                                return;
                            }
                            session.close();
                            /* Allow a grace period after sending the GOAWAY before forcibly
                             * closing the connection. */
                            if (this.maxConnectionAgeGraceMs !== UNLIMITED_CONNECTION_AGE_MS) {
                                connectionAgeGraceTimer = (_c = (_b = setTimeout(() => {
                                    session.destroy();
                                }, this.maxConnectionAgeGraceMs)).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
                            }
                        }, this.maxConnectionAgeMs + jitter)).unref) === null || _e === void 0 ? void 0 : _e.call(_d);
                    }
                    const keeapliveTimeTimer = (_g = (_f = setInterval(() => {
                        var _b, _c;
                        const timeoutTImer = (_c = (_b = setTimeout(() => {
                            sessionClosedByServer = true;
                            if (this.channelzEnabled) {
                                this.channelzTrace.addTrace('CT_INFO', 'Connection dropped by keepalive timeout from ' + clientAddress);
                            }
                            session.close();
                        }, this.keepaliveTimeoutMs)).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
                        try {
                            session.ping((err, duration, payload) => {
                                clearTimeout(timeoutTImer);
                            });
                        }
                        catch (e) {
                            // The ping can't be sent because the session is already closed
                            session.destroy();
                        }
                    }, this.keepaliveTimeMs)).unref) === null || _g === void 0 ? void 0 : _g.call(_f);
                    session.on('close', () => {
                        var _b;
                        if (this.channelzEnabled) {
                            if (!sessionClosedByServer) {
                                this.channelzTrace.addTrace('CT_INFO', 'Connection dropped by client ' + clientAddress);
                            }
                            this.sessionChildrenTracker.unrefChild(channelzRef);
                            (0, channelz_1.unregisterChannelzRef)(channelzRef);
                        }
                        if (connectionAgeTimer) {
                            clearTimeout(connectionAgeTimer);
                        }
                        if (connectionAgeGraceTimer) {
                            clearTimeout(connectionAgeGraceTimer);
                        }
                        if (keeapliveTimeTimer) {
                            clearTimeout(keeapliveTimeTimer);
                        }
                        (_b = this.http2Servers.get(http2Server)) === null || _b === void 0 ? void 0 : _b.sessions.delete(session);
                        this.sessions.delete(session);
                    });
                });
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _start_decorators = [deprecate('Calling start() is no longer necessary. It can be safely omitted.')];
            __esDecorate(_a, null, _start_decorators, { kind: "method", name: "start", static: false, private: false, access: { has: obj => "start" in obj, get: obj => obj.start }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.Server = Server;
async function handleUnary(call, handler) {
    let stream;
    function respond(err, value, trailer, flags) {
        if (err) {
            call.sendStatus((0, server_call_1.serverErrorToStatus)(err, trailer));
            return;
        }
        call.sendMessage(value, () => {
            call.sendStatus({
                code: constants_1.Status.OK,
                details: 'OK',
                metadata: trailer !== null && trailer !== void 0 ? trailer : null
            });
        });
    }
    let requestMetadata;
    let requestMessage = null;
    call.start({
        onReceiveMetadata(metadata) {
            requestMetadata = metadata;
            call.startRead();
        },
        onReceiveMessage(message) {
            if (requestMessage) {
                call.sendStatus({
                    code: constants_1.Status.UNIMPLEMENTED,
                    details: `Received a second request message for server streaming method ${handler.path}`,
                    metadata: null
                });
                return;
            }
            requestMessage = message;
            call.startRead();
        },
        onReceiveHalfClose() {
            if (!requestMessage) {
                call.sendStatus({
                    code: constants_1.Status.UNIMPLEMENTED,
                    details: `Received no request message for server streaming method ${handler.path}`,
                    metadata: null
                });
                return;
            }
            stream = new server_call_1.ServerWritableStreamImpl(handler.path, call, requestMetadata, requestMessage);
            try {
                handler.func(stream, respond);
            }
            catch (err) {
                call.sendStatus({
                    code: constants_1.Status.UNKNOWN,
                    details: `Server method handler threw error ${err.message}`,
                    metadata: null
                });
            }
        },
        onCancel() {
            if (stream) {
                stream.cancelled = true;
                stream.emit('cancelled', 'cancelled');
            }
        },
    });
}
function handleClientStreaming(call, handler) {
    let stream;
    function respond(err, value, trailer, flags) {
        if (err) {
            call.sendStatus((0, server_call_1.serverErrorToStatus)(err, trailer));
            return;
        }
        call.sendMessage(value, () => {
            call.sendStatus({
                code: constants_1.Status.OK,
                details: 'OK',
                metadata: trailer !== null && trailer !== void 0 ? trailer : null
            });
        });
    }
    call.start({
        onReceiveMetadata(metadata) {
            stream = new server_call_1.ServerDuplexStreamImpl(handler.path, call, metadata);
            try {
                handler.func(stream, respond);
            }
            catch (err) {
                call.sendStatus({
                    code: constants_1.Status.UNKNOWN,
                    details: `Server method handler threw error ${err.message}`,
                    metadata: null
                });
            }
        },
        onReceiveMessage(message) {
            stream.push(message);
        },
        onReceiveHalfClose() {
            stream.push(null);
        },
        onCancel() {
            if (stream) {
                stream.cancelled = true;
                stream.emit('cancelled', 'cancelled');
                stream.destroy();
            }
        },
    });
}
function handleServerStreaming(call, handler) {
    let stream;
    let requestMetadata;
    let requestMessage = null;
    call.start({
        onReceiveMetadata(metadata) {
            requestMetadata = metadata;
            call.startRead();
        },
        onReceiveMessage(message) {
            if (requestMessage) {
                call.sendStatus({
                    code: constants_1.Status.UNIMPLEMENTED,
                    details: `Received a second request message for server streaming method ${handler.path}`,
                    metadata: null
                });
                return;
            }
            requestMessage = message;
            call.startRead();
        },
        onReceiveHalfClose() {
            if (!requestMessage) {
                call.sendStatus({
                    code: constants_1.Status.UNIMPLEMENTED,
                    details: `Received no request message for server streaming method ${handler.path}`,
                    metadata: null
                });
                return;
            }
            stream = new server_call_1.ServerWritableStreamImpl(handler.path, call, requestMetadata, requestMessage);
            try {
                handler.func(stream);
            }
            catch (err) {
                call.sendStatus({
                    code: constants_1.Status.UNKNOWN,
                    details: `Server method handler threw error ${err.message}`,
                    metadata: null
                });
            }
        },
        onCancel() {
            if (stream) {
                stream.cancelled = true;
                stream.emit('cancelled', 'cancelled');
                stream.destroy();
            }
        },
    });
}
function handleBidiStreaming(call, handler) {
    let stream;
    call.start({
        onReceiveMetadata(metadata) {
            stream = new server_call_1.ServerDuplexStreamImpl(handler.path, call, metadata);
            try {
                handler.func(stream);
            }
            catch (err) {
                call.sendStatus({
                    code: constants_1.Status.UNKNOWN,
                    details: `Server method handler threw error ${err.message}`,
                    metadata: null
                });
            }
        },
        onReceiveMessage(message) {
            stream.push(message);
        },
        onReceiveHalfClose() {
            stream.push(null);
        },
        onCancel() {
            if (stream) {
                stream.cancelled = true;
                stream.emit('cancelled', 'cancelled');
                stream.destroy();
            }
        },
    });
}
//# sourceMappingURL=server.js.map