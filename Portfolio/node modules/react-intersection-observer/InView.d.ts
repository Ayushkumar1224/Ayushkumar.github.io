import * as React from 'react';
import { IntersectionObserverProps, PlainChildrenProps } from './index';
declare type State = {
    inView: boolean;
    entry?: IntersectionObserverEntry;
};
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
export declare class InView extends React.Component<IntersectionObserverProps | PlainChildrenProps, State> {
    static displayName: string;
    static defaultProps: {
        threshold: number;
        triggerOnce: boolean;
        initialInView: boolean;
    };
    constructor(props: IntersectionObserverProps | PlainChildrenProps);
    componentDidUpdate(prevProps: IntersectionObserverProps): void;
    componentWillUnmount(): void;
    node: Element | null;
    _unobserveCb: (() => void) | null;
    observeNode(): void;
    unobserve(): void;
    handleNode: (node?: Element | null | undefined) => void;
    handleChange: (inView: boolean, entry: IntersectionObserverEntry) => void;
    render(): React.ReactNode;
}
export {};
