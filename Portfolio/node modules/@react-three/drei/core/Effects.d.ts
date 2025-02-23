import { ReactThreeFiber } from '@react-three/fiber';
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';
import { ForwardRefComponent } from '../helpers/ts-utils';
type Props = ReactThreeFiber.Node<EffectComposer, typeof EffectComposer> & {
    multisamping?: number;
    encoding?: number;
    type?: number;
    renderIndex?: number;
    disableGamma?: boolean;
    disableRenderPass?: boolean;
    disableRender?: boolean;
    depthBuffer?: boolean;
    stencilBuffer?: boolean;
    anisotropy?: number;
};
declare global {
    namespace JSX {
        interface IntrinsicElements {
            effectComposer: ReactThreeFiber.Node<EffectComposer, typeof EffectComposer>;
            renderPass: ReactThreeFiber.Node<RenderPass, typeof RenderPass>;
            shaderPass: ReactThreeFiber.Node<ShaderPass, typeof ShaderPass>;
        }
    }
}
export declare const isWebGL2Available: () => boolean;
export declare const Effects: ForwardRefComponent<Props, EffectComposer>;
export {};
