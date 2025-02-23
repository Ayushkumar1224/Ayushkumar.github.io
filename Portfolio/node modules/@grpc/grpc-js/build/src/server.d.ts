import { Deserialize, Serialize, ServiceDefinition } from './make-client';
import { HandleCall } from './server-call';
import { ServerCredentials } from './server-credentials';
import { ChannelOptions } from './channel-options';
import { ServerRef } from './channelz';
import { ServerInterceptor } from './server-interceptors';
export type UntypedHandleCall = HandleCall<any, any>;
export interface UntypedServiceImplementation {
    [name: string]: UntypedHandleCall;
}
export interface ServerOptions extends ChannelOptions {
    interceptors?: ServerInterceptor[];
}
export declare class Server {
    private boundPorts;
    private http2Servers;
    private handlers;
    private sessions;
    /**
     * This field only exists to ensure that the start method throws an error if
     * it is called twice, as it did previously.
     */
    private started;
    private shutdown;
    private options;
    private serverAddressString;
    private readonly channelzEnabled;
    private channelzRef;
    private channelzTrace;
    private callTracker;
    private listenerChildrenTracker;
    private sessionChildrenTracker;
    private readonly maxConnectionAgeMs;
    private readonly maxConnectionAgeGraceMs;
    private readonly keepaliveTimeMs;
    private readonly keepaliveTimeoutMs;
    private readonly interceptors;
    /**
     * Options that will be used to construct all Http2Server instances for this
     * Server.
     */
    private commonServerOptions;
    constructor(options?: ServerOptions);
    private getChannelzInfo;
    private getChannelzSessionInfoGetter;
    private trace;
    addProtoService(): never;
    addService(service: ServiceDefinition, implementation: UntypedServiceImplementation): void;
    removeService(service: ServiceDefinition): void;
    bind(port: string, creds: ServerCredentials): never;
    private registerListenerToChannelz;
    private createHttp2Server;
    private bindOneAddress;
    private bindManyPorts;
    private bindAddressList;
    private resolvePort;
    private bindPort;
    private normalizePort;
    bindAsync(port: string, creds: ServerCredentials, callback: (error: Error | null, port: number) => void): void;
    private closeServer;
    private closeSession;
    private completeUnbind;
    /**
     * Unbind a previously bound port, or cancel an in-progress bindAsync
     * operation. If port 0 was bound, only the actual bound port can be
     * unbound. For example, if bindAsync was called with "localhost:0" and the
     * bound port result was 54321, it can be unbound as "localhost:54321".
     * @param port
     */
    unbind(port: string): void;
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
    drain(port: string, graceTimeMs: number): void;
    forceShutdown(): void;
    register<RequestType, ResponseType>(name: string, handler: HandleCall<RequestType, ResponseType>, serialize: Serialize<ResponseType>, deserialize: Deserialize<RequestType>, type: string): boolean;
    unregister(name: string): boolean;
    /**
     * @deprecated No longer needed as of version 1.10.x
     */
    start(): void;
    tryShutdown(callback: (error?: Error) => void): void;
    addHttp2Port(): never;
    /**
     * Get the channelz reference object for this server. The returned value is
     * garbage if channelz is disabled for this server.
     * @returns
     */
    getChannelzRef(): ServerRef;
    private _verifyContentType;
    private _retrieveHandler;
    private _respondWithError;
    private _channelzHandler;
    private _streamHandler;
    private _runHandlerForCall;
    private _setupHandlers;
}
