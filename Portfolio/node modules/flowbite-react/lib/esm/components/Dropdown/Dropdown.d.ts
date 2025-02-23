import type { ExtendedRefs } from '@floating-ui/react';
import type { Dispatch, FC, HTMLProps, ReactElement, ReactNode, SetStateAction } from 'react';
import type { DeepPartial } from '../../types';
import { type ButtonProps } from '../Button';
import type { FloatingProps, FlowbiteFloatingTheme } from '../Floating';
import { type FlowbiteDropdownDividerTheme } from './DropdownDivider';
import { type FlowbiteDropdownHeaderTheme } from './DropdownHeader';
import { type FlowbiteDropdownItemTheme } from './DropdownItem';
export interface FlowbiteDropdownFloatingTheme extends FlowbiteFloatingTheme, FlowbiteDropdownDividerTheme, FlowbiteDropdownHeaderTheme {
    item: FlowbiteDropdownItemTheme;
}
export interface FlowbiteDropdownTheme {
    floating: FlowbiteDropdownFloatingTheme;
    content: string;
    inlineWrapper: string;
    arrowIcon: string;
}
export interface DropdownProps extends Pick<FloatingProps, 'placement' | 'trigger'>, Omit<ButtonProps, 'theme'> {
    arrowIcon?: boolean;
    dismissOnClick?: boolean;
    floatingArrow?: boolean;
    inline?: boolean;
    label: ReactNode;
    theme?: DeepPartial<FlowbiteDropdownTheme>;
    renderTrigger?: (theme: FlowbiteDropdownTheme) => ReactElement;
    'data-testid'?: string;
}
export interface TriggerProps extends Omit<ButtonProps, 'theme'> {
    refs: ExtendedRefs<HTMLElement>;
    inline?: boolean;
    theme: FlowbiteDropdownTheme;
    setButtonWidth?: Dispatch<SetStateAction<number | undefined>>;
    getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>;
    renderTrigger?: (theme: FlowbiteDropdownTheme) => ReactElement;
}
export declare const Dropdown: FC<DropdownProps> & {
    Item: <T extends import("react").ElementType = "button">({ children, className, icon: Icon, onClick, theme: customTheme, ...props }: import("./DropdownItem").DropdownItemProps<T>) => import("react/jsx-runtime").JSX.Element;
    Header: FC<import("./DropdownHeader").DropdownHeaderProps>;
    Divider: FC<import("./DropdownDivider").DropdownDividerProps>;
};
