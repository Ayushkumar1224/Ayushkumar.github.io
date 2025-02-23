import { ObserverInstanceCallback } from './index';
/**
 * What should be the default behavior if the IntersectionObserver is unsupported?
 * Ideally the polyfill has been loaded, you can have the following happen:
 * - `undefined`: Throw an error
 * - `true` or `false`: Set the `inView` value to this regardless of intersection state
 * **/
export declare function defaultFallbackInView(inView: boolean | undefined): void;
/**
 * Convert the options to a string Id, based on the values.
 * Ensures we can reuse the same observer when observing elements with the same options.
 * @param options
 */
export declare function optionsToId(options: IntersectionObserverInit): string;
/**
 * @param element - DOM Element to observe
 * @param callback - Callback function to trigger when intersection status changes
 * @param options - Intersection Observer options
 * @param fallbackInView - Fallback inView value.
 * @return Function - Cleanup function that should be triggered to unregister the observer
 */
export declare function observe(element: Element, callback: ObserverInstanceCallback, options?: IntersectionObserverInit, fallbackInView?: boolean | undefined): () => void;
