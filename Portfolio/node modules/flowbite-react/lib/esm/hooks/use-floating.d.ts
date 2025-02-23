import type { ElementProps, Placement, ReferenceType, UseRoleProps } from '@floating-ui/react';
import { useFloating } from '@floating-ui/react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
export type UseBaseFloatingParams = {
    placement?: 'auto' | Placement;
    open: boolean;
    arrowRef?: RefObject<HTMLDivElement>;
    setOpen: Dispatch<SetStateAction<boolean>>;
};
export declare const useBaseFLoating: <Type extends ReferenceType>({ open, arrowRef, placement, setOpen, }: UseBaseFloatingParams) => {
    placement: Placement;
    strategy: import("@floating-ui/utils").Strategy;
    middlewareData: import("@floating-ui/core").MiddlewareData;
    x: number;
    y: number;
    isPositioned: boolean;
    update: () => void;
    floatingStyles: import("react").CSSProperties;
    refs: {
        reference: import("react").MutableRefObject<import("@floating-ui/react-dom").ReferenceType | null>;
        floating: import("react").MutableRefObject<HTMLElement | null>;
        setReference: (node: import("@floating-ui/react-dom").ReferenceType | null) => void;
        setFloating: (node: HTMLElement | null) => void;
    } & import("@floating-ui/react").ExtendedRefs<Type>;
    elements: {
        reference: import("@floating-ui/react-dom").ReferenceType | null;
        floating: HTMLElement | null;
    } & import("@floating-ui/react").ExtendedElements<Type>;
    context: {
        placement: Placement;
        x: number;
        y: number;
        strategy: import("@floating-ui/utils").Strategy;
        middlewareData: import("@floating-ui/core").MiddlewareData;
        isPositioned: boolean;
        update: () => void;
        floatingStyles: import("react").CSSProperties;
        open: boolean;
        onOpenChange: (open: boolean, event?: Event | undefined, reason?: import("@floating-ui/react").OpenChangeReason | undefined) => void;
        events: import("@floating-ui/react").FloatingEvents;
        dataRef: import("react").MutableRefObject<import("@floating-ui/react").ContextData>;
        nodeId: string | undefined;
        floatingId: string;
        refs: import("@floating-ui/react").ExtendedRefs<Type>;
        elements: import("@floating-ui/react").ExtendedElements<Type>;
    };
};
export type UseFloatingInteractionsParams = {
    context: ReturnType<typeof useFloating>['context'];
    trigger?: 'hover' | 'click';
    role?: UseRoleProps['role'];
    interactions?: ElementProps[];
};
export declare const useFloatingInteractions: ({ context, trigger, role, interactions, }: UseFloatingInteractionsParams) => {
    getReferenceProps: (userProps?: import("react").HTMLProps<Element> | undefined) => Record<string, unknown>;
    getFloatingProps: (userProps?: import("react").HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    getItemProps: (userProps?: import("react").HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
};
