"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),r=require("react"),n=require("@react-three/fiber"),t=require("three"),u=require("three-stdlib"),o=require("./useEnvironment.cjs.js");function c(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function s(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var t=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,t.get?t:{enumerable:!0,get:function(){return e[n]}})}})),r.default=e,Object.freeze(r)}require("../helpers/environment-assets.cjs.js");var a=c(e),l=s(r);const i=e=>{return(r=e).current&&r.current.isScene?e.current:e;var r};function d(e,r,n,t,u=0){const o=i(r||n),c=o.background,s=o.environment,a=o.backgroundBlurriness||0;return"only"!==e&&(o.environment=t),e&&(o.background=t),e&&void 0!==o.backgroundBlurriness&&(o.backgroundBlurriness=u),()=>{"only"!==e&&(o.environment=s),e&&(o.background=c),e&&void 0!==o.backgroundBlurriness&&(o.backgroundBlurriness=a)}}function m({scene:e,background:r=!1,blur:t,map:u}){const o=n.useThree((e=>e.scene));return l.useLayoutEffect((()=>{if(u)return d(r,e,o,u,t)}),[o,e,u,r,t]),null}function f({background:e=!1,scene:r,blur:t,...u}){const c=o.useEnvironment(u),s=n.useThree((e=>e.scene));return l.useLayoutEffect((()=>d(e,r,s,c,t)),[c,e,r,s,t]),null}function b({children:e,near:r=1,far:u=1e3,resolution:o=256,frames:c=1,map:s,background:a=!1,blur:i,scene:b,files:g,path:p,preset:v,extensions:E}){const h=n.useThree((e=>e.gl)),j=n.useThree((e=>e.scene)),k=l.useRef(null),[x]=l.useState((()=>new t.Scene)),y=l.useMemo((()=>{const e=new t.WebGLCubeRenderTarget(o);return e.texture.type=t.HalfFloatType,e}),[o]);l.useLayoutEffect((()=>(1===c&&k.current.update(h,x),d(a,b,j,y.texture,i))),[e,x,y.texture,b,j,a,c,h]);let P=1;return n.useFrame((()=>{(c===1/0||P<c)&&(k.current.update(h,x),P++)})),l.createElement(l.Fragment,null,n.createPortal(l.createElement(l.Fragment,null,e,l.createElement("cubeCamera",{ref:k,args:[r,u,y]}),g||v?l.createElement(f,{background:!0,files:g,preset:v,path:p,extensions:E}):s?l.createElement(m,{background:!0,map:s,extensions:E}):null),x))}function g(e){var r,t,c,s;const i=o.useEnvironment(e),d=e.map||i;l.useMemo((()=>n.extend({GroundProjectedEnvImpl:u.GroundProjectedEnv})),[]);const f=l.useMemo((()=>[d]),[d]),b=null==(r=e.ground)?void 0:r.height,g=null==(t=e.ground)?void 0:t.radius,p=null!==(c=null==(s=e.ground)?void 0:s.scale)&&void 0!==c?c:1e3;return l.createElement(l.Fragment,null,l.createElement(m,a.default({},e,{map:d})),l.createElement("groundProjectedEnvImpl",{args:f,scale:p,height:b,radius:g}))}exports.Environment=function(e){return e.ground?l.createElement(g,e):e.map?l.createElement(m,e):e.children?l.createElement(b,e):l.createElement(f,e)},exports.EnvironmentCube=f,exports.EnvironmentMap=m,exports.EnvironmentPortal=b;
