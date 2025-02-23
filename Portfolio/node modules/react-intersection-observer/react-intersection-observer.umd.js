(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.ReactIntersectionObserver = {}, global.react));
})(this, (function (exports, React) {
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return n;
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var observerMap = new Map();
  var RootIds = new WeakMap();
  var rootId = 0;
  var unsupportedValue = undefined;
  /**
   * What should be the default behavior if the IntersectionObserver is unsupported?
   * Ideally the polyfill has been loaded, you can have the following happen:
   * - `undefined`: Throw an error
   * - `true` or `false`: Set the `inView` value to this regardless of intersection state
   * **/

  function defaultFallbackInView(inView) {
    unsupportedValue = inView;
  }
  /**
   * Generate a unique ID for the root element
   * @param root
   */

  function getRootId(root) {
    if (!root) return '0';
    if (RootIds.has(root)) return RootIds.get(root);
    rootId += 1;
    RootIds.set(root, rootId.toString());
    return RootIds.get(root);
  }
  /**
   * Convert the options to a string Id, based on the values.
   * Ensures we can reuse the same observer when observing elements with the same options.
   * @param options
   */


  function optionsToId(options) {
    return Object.keys(options).sort().filter(function (key) {
      return options[key] !== undefined;
    }).map(function (key) {
      return key + "_" + (key === 'root' ? getRootId(options.root) : options[key]);
    }).toString();
  }

  function createObserver(options) {
    // Create a unique ID for this observer instance, based on the root, root margin and threshold.
    var id = optionsToId(options);
    var instance = observerMap.get(id);

    if (!instance) {
      // Create a map of elements this observer is going to observe. Each element has a list of callbacks that should be triggered, once it comes into view.
      var elements = new Map();
      var thresholds;
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var _elements$get;

          // While it would be nice if you could just look at isIntersecting to determine if the component is inside the viewport, browsers can't agree on how to use it.
          // -Firefox ignores `threshold` when considering `isIntersecting`, so it will never be false again if `threshold` is > 0
          var inView = entry.isIntersecting && thresholds.some(function (threshold) {
            return entry.intersectionRatio >= threshold;
          }); // @ts-ignore support IntersectionObserver v2

          if (options.trackVisibility && typeof entry.isVisible === 'undefined') {
            // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
            // @ts-ignore
            entry.isVisible = inView;
          }

          (_elements$get = elements.get(entry.target)) == null ? void 0 : _elements$get.forEach(function (callback) {
            callback(inView, entry);
          });
        });
      }, options); // Ensure we have a valid thresholds array. If not, use the threshold from the options

      thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
      instance = {
        id: id,
        observer: observer,
        elements: elements
      };
      observerMap.set(id, instance);
    }

    return instance;
  }
  /**
   * @param element - DOM Element to observe
   * @param callback - Callback function to trigger when intersection status changes
   * @param options - Intersection Observer options
   * @param fallbackInView - Fallback inView value.
   * @return Function - Cleanup function that should be triggered to unregister the observer
   */


  function observe(element, callback, options, fallbackInView) {
    if (options === void 0) {
      options = {};
    }

    if (fallbackInView === void 0) {
      fallbackInView = unsupportedValue;
    }

    if (typeof window.IntersectionObserver === 'undefined' && fallbackInView !== undefined) {
      var bounds = element.getBoundingClientRect();
      callback(fallbackInView, {
        isIntersecting: fallbackInView,
        target: element,
        intersectionRatio: typeof options.threshold === 'number' ? options.threshold : 0,
        time: 0,
        boundingClientRect: bounds,
        intersectionRect: bounds,
        rootBounds: bounds
      });
      return function () {// Nothing to cleanup
      };
    } // An observer with the same options can be reused, so lets use this fact


    var _createObserver = createObserver(options),
        id = _createObserver.id,
        observer = _createObserver.observer,
        elements = _createObserver.elements; // Register the callback listener for this element


    var callbacks = elements.get(element) || [];

    if (!elements.has(element)) {
      elements.set(element, callbacks);
    }

    callbacks.push(callback);
    observer.observe(element);
    return function unobserve() {
      // Remove the callback from the callback list
      callbacks.splice(callbacks.indexOf(callback), 1);

      if (callbacks.length === 0) {
        // No more callback exists for element, so destroy it
        elements["delete"](element);
        observer.unobserve(element);
      }

      if (elements.size === 0) {
        // No more elements are being observer by this instance, so destroy it
        observer.disconnect();
        observerMap["delete"](id);
      }
    };
  }

  var _excluded = ["children", "as", "triggerOnce", "threshold", "root", "rootMargin", "onChange", "skip", "trackVisibility", "delay", "initialInView", "fallbackInView"];

  function isPlainChildren(props) {
    return typeof props.children !== 'function';
  }
  /**
   ## Render props

   To use the `<InView>` component, you pass it a function. It will be called
   whenever the state changes, with the new value of `inView`. In addition to the
   `inView` prop, children also receive a `ref` that should be set on the
   containing DOM element. This is the element that the IntersectionObserver will
   monitor.

   If you need it, you can also access the
   [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
   on `entry`, giving you access to all the details about the current intersection
   state.

   ```jsx
   import { InView } from 'react-intersection-observer';

   const Component = () => (
   <InView>
   {({ inView, ref, entry }) => (
        <div ref={ref}>
          <h2>{`Header inside viewport ${inView}.`}</h2>
        </div>
      )}
   </InView>
   );

   export default Component;
   ```

   ## Plain children

   You can pass any element to the `<InView />`, and it will handle creating the
   wrapping DOM element. Add a handler to the `onChange` method, and control the
   state in your own component. Any extra props you add to `<InView>` will be
   passed to the HTML element, allowing you set the `className`, `style`, etc.

   ```jsx
   import { InView } from 'react-intersection-observer';

   const Component = () => (
   <InView as="div" onChange={(inView, entry) => console.log('Inview:', inView)}>
   <h2>Plain children are always rendered. Use onChange to monitor state.</h2>
   </InView>
   );

   export default Component;
   ```
   */


  var InView = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(InView, _React$Component);

    function InView(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.node = null;
      _this._unobserveCb = null;

      _this.handleNode = function (node) {
        if (_this.node) {
          // Clear the old observer, before we start observing a new element
          _this.unobserve();

          if (!node && !_this.props.triggerOnce && !_this.props.skip) {
            // Reset the state if we get a new node, and we aren't ignoring updates
            _this.setState({
              inView: !!_this.props.initialInView,
              entry: undefined
            });
          }
        }

        _this.node = node ? node : null;

        _this.observeNode();
      };

      _this.handleChange = function (inView, entry) {
        if (inView && _this.props.triggerOnce) {
          // If `triggerOnce` is true, we should stop observing the element.
          _this.unobserve();
        }

        if (!isPlainChildren(_this.props)) {
          // Store the current State, so we can pass it to the children in the next render update
          // There's no reason to update the state for plain children, since it's not used in the rendering.
          _this.setState({
            inView: inView,
            entry: entry
          });
        }

        if (_this.props.onChange) {
          // If the user is actively listening for onChange, always trigger it
          _this.props.onChange(inView, entry);
        }
      };

      _this.state = {
        inView: !!props.initialInView,
        entry: undefined
      };
      return _this;
    }

    var _proto = InView.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      // If a IntersectionObserver option changed, reinit the observer
      if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold || prevProps.skip !== this.props.skip || prevProps.trackVisibility !== this.props.trackVisibility || prevProps.delay !== this.props.delay) {
        this.unobserve();
        this.observeNode();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unobserve();
      this.node = null;
    };

    _proto.observeNode = function observeNode() {
      if (!this.node || this.props.skip) return;
      var _this$props = this.props,
          threshold = _this$props.threshold,
          root = _this$props.root,
          rootMargin = _this$props.rootMargin,
          trackVisibility = _this$props.trackVisibility,
          delay = _this$props.delay,
          fallbackInView = _this$props.fallbackInView;
      this._unobserveCb = observe(this.node, this.handleChange, {
        threshold: threshold,
        root: root,
        rootMargin: rootMargin,
        // @ts-ignore
        trackVisibility: trackVisibility,
        // @ts-ignore
        delay: delay
      }, fallbackInView);
    };

    _proto.unobserve = function unobserve() {
      if (this._unobserveCb) {
        this._unobserveCb();

        this._unobserveCb = null;
      }
    };

    _proto.render = function render() {
      if (!isPlainChildren(this.props)) {
        var _this$state = this.state,
            inView = _this$state.inView,
            entry = _this$state.entry;
        return this.props.children({
          inView: inView,
          entry: entry,
          ref: this.handleNode
        });
      }

      var _this$props2 = this.props,
          children = _this$props2.children,
          as = _this$props2.as,
          props = _objectWithoutPropertiesLoose(_this$props2, _excluded);

      return /*#__PURE__*/React__namespace.createElement(as || 'div', _extends({
        ref: this.handleNode
      }, props), children);
    };

    return InView;
  }(React__namespace.Component);
  InView.displayName = 'InView';
  InView.defaultProps = {
    threshold: 0,
    triggerOnce: false,
    initialInView: false
  };

  /**
   * React Hooks make it easy to monitor the `inView` state of your components. Call
   * the `useInView` hook with the (optional) [options](#options) you need. It will
   * return an array containing a `ref`, the `inView` status and the current
   * [`entry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).
   * Assign the `ref` to the DOM element you want to monitor, and the hook will
   * report the status.
   *
   * @example
   * ```jsx
   * import React from 'react';
   * import { useInView } from 'react-intersection-observer';
   *
   * const Component = () => {
   *   const { ref, inView, entry } = useInView({
   *       threshold: 0,
   *   });
   *
   *   return (
   *     <div ref={ref}>
   *       <h2>{`Header inside viewport ${inView}.`}</h2>
   *     </div>
   *   );
   * };
   * ```
   */

  function useInView(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        threshold = _ref.threshold,
        delay = _ref.delay,
        trackVisibility = _ref.trackVisibility,
        rootMargin = _ref.rootMargin,
        root = _ref.root,
        triggerOnce = _ref.triggerOnce,
        skip = _ref.skip,
        initialInView = _ref.initialInView,
        fallbackInView = _ref.fallbackInView;

    var unobserve = React__namespace.useRef();

    var _React$useState = React__namespace.useState({
      inView: !!initialInView
    }),
        state = _React$useState[0],
        setState = _React$useState[1];

    var setRef = React__namespace.useCallback(function (node) {
      if (unobserve.current !== undefined) {
        unobserve.current();
        unobserve.current = undefined;
      } // Skip creating the observer


      if (skip) return;

      if (node) {
        unobserve.current = observe(node, function (inView, entry) {
          setState({
            inView: inView,
            entry: entry
          });

          if (entry.isIntersecting && triggerOnce && unobserve.current) {
            // If it should only trigger once, unobserve the element after it's inView
            unobserve.current();
            unobserve.current = undefined;
          }
        }, {
          root: root,
          rootMargin: rootMargin,
          threshold: threshold,
          // @ts-ignore
          trackVisibility: trackVisibility,
          // @ts-ignore
          delay: delay
        }, fallbackInView);
      }
    }, // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [// If the threshold is an array, convert it to a string so it won't change between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(threshold) ? threshold.toString() : threshold, root, rootMargin, triggerOnce, skip, trackVisibility, fallbackInView, delay]);
    /* eslint-disable-next-line */

    React.useEffect(function () {
      if (!unobserve.current && state.entry && !triggerOnce && !skip) {
        // If we don't have a ref, then reset the state (unless the hook is set to only `triggerOnce` or `skip`)
        // This ensures we correctly reflect the current state - If you aren't observing anything, then nothing is inView
        setState({
          inView: !!initialInView
        });
      }
    });
    var result = [setRef, state.inView, state.entry]; // Support object destructuring, by adding the specific values.

    result.ref = result[0];
    result.inView = result[1];
    result.entry = result[2];
    return result;
  }

  exports.InView = InView;
  exports["default"] = InView;
  exports.defaultFallbackInView = defaultFallbackInView;
  exports.observe = observe;
  exports.useInView = useInView;

}));
//# sourceMappingURL=react-intersection-observer.umd.js.map
