import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Instances, Instance } from './Instances.js';
import { useSpriteLoader } from './useSpriteLoader.js';

const context = /*#__PURE__*/React.createContext(null);
function useSpriteAnimator() {
  return React.useContext(context);
}
const SpriteAnimator = /* @__PURE__ */React.forwardRef(({
  startFrame,
  endFrame,
  fps,
  frameName,
  textureDataURL,
  textureImageURL,
  loop,
  numberOfFrames,
  autoPlay,
  animationNames,
  onStart,
  onEnd,
  onLoopEnd,
  onFrame,
  play,
  pause,
  flipX,
  alphaTest,
  children,
  asSprite,
  offset,
  playBackwards,
  resetOnEnd,
  maxItems,
  instanceItems,
  spriteDataset,
  ...props
}, fref) => {
  var _props$scale;
  const ref = React.useRef();
  const spriteData = React.useRef(null);
  const matRef = React.useRef();
  const spriteRef = React.useRef();
  const timerOffset = React.useRef(window.performance.now());
  const currentFrame = React.useRef(startFrame || 0);
  const currentFrameName = React.useRef(frameName || '');
  const fpsInterval = 1000 / (fps || 30);
  const [spriteTexture, setSpriteTexture] = React.useState(new THREE.Texture());
  const totalFrames = React.useRef(0);
  const [aspect, setAspect] = React.useState([1, 1, 1]);
  const flipOffset = flipX ? -1 : 1;
  const [displayAsSprite, setDisplayAsSprite] = React.useState(asSprite !== null && asSprite !== void 0 ? asSprite : true);
  const pauseRef = React.useRef(pause);
  const pos = React.useRef(offset);
  const softEnd = React.useRef(false);
  const frameBuffer = React.useRef([]);
  const {
    spriteObj,
    loadJsonAndTexture
  } = useSpriteLoader(null, null, animationNames, numberOfFrames);
  //

  function reset() {}
  const state = React.useMemo(() => ({
    current: pos.current,
    offset: pos.current,
    imageUrl: textureImageURL,
    reset: reset,
    hasEnded: false,
    ref: fref
  }), [textureImageURL, spriteDataset]);
  React.useImperativeHandle(fref, () => ref.current, []);
  React.useLayoutEffect(() => {
    pos.current = offset;
  }, [offset]);
  const calculateAspectRatio = (width, height) => {
    const aspectRatio = height / width;
    if (spriteRef.current) {
      spriteRef.current.scale.set(1, aspectRatio, 1);
    }
    return [1, aspectRatio, 1];
  };

  // initial loads
  React.useEffect(() => {
    if (spriteDataset) {
      var _spriteDataset$sprite;
      parseSpriteDataLite(spriteDataset == null || (_spriteDataset$sprite = spriteDataset.spriteTexture) == null ? void 0 : _spriteDataset$sprite.clone(), spriteDataset.spriteData);
    } else {
      loadJsonAndTexture(textureImageURL, textureDataURL);
    }
  }, [spriteDataset]);
  React.useEffect(() => {
    if (spriteObj) {
      var _spriteObj$spriteText;
      parseSpriteDataLite(spriteObj == null || (_spriteObj$spriteText = spriteObj.spriteTexture) == null ? void 0 : _spriteObj$spriteText.clone(), spriteObj == null ? void 0 : spriteObj.spriteData);
    }
  }, [spriteObj]);
  React.useEffect(() => {
    setDisplayAsSprite(asSprite !== null && asSprite !== void 0 ? asSprite : true);
  }, [asSprite]);

  // support backwards play
  React.useEffect(() => {
    state.hasEnded = false;
    if (spriteData.current && playBackwards === true) {
      currentFrame.current = spriteData.current.frames.length - 1;
    } else {
      currentFrame.current = 0;
    }
  }, [playBackwards]);
  React.useLayoutEffect(() => {
    modifySpritePosition();
  }, [spriteTexture, flipX]);
  React.useEffect(() => {
    if (autoPlay) {
      pauseRef.current = false;
    }
  }, [autoPlay]);
  React.useLayoutEffect(() => {
    if (currentFrameName.current !== frameName && frameName) {
      currentFrame.current = 0;
      currentFrameName.current = frameName;
      state.hasEnded = false;
      // modifySpritePosition()
      if (spriteData.current) {
        const {
          w,
          h
        } = getFirstItem(spriteData.current.frames).sourceSize;
        const _aspect = calculateAspectRatio(w, h);
        setAspect(_aspect);
      }
    }
  }, [frameName]);

  // lite version for pre-loaded assets
  const parseSpriteDataLite = (textureData, frameData = null) => {
    if (frameData === null) {
      if (numberOfFrames) {
        //get size from texture
        const width = textureData.image.width;
        const height = textureData.image.height;
        totalFrames.current = numberOfFrames;
        if (playBackwards) {
          currentFrame.current = numberOfFrames - 1;
        }
        spriteData.current = {
          frames: [],
          meta: {
            version: '1.0',
            size: {
              w: width,
              h: height
            },
            scale: '1'
          }
        };
        spriteData.current.frames = frameData;
      }
    } else {
      spriteData.current = frameData;
      totalFrames.current = spriteData.current.frames.length;
      if (playBackwards) {
        currentFrame.current = totalFrames.current - 1;
      }
      const {
        w,
        h
      } = getFirstItem(spriteData.current.frames).sourceSize;
      const aspect = calculateAspectRatio(w, h);
      setAspect(aspect);
      if (matRef.current) {
        matRef.current.map = textureData;
      }
    }

    // buffer for instanced
    if (instanceItems) {
      for (var i = 0; i < instanceItems.length; i++) {
        const keys = Object.keys(spriteData.current.frames);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        frameBuffer.current.push({
          key: i,
          frames: spriteData.current.frames,
          selectedFrame: randomKey,
          offset: {
            x: 0,
            y: 0
          }
        });
      }
    }
    setSpriteTexture(textureData);
  };

  // modify the sprite material after json is parsed and state updated
  const modifySpritePosition = () => {
    if (!spriteData.current) return;
    const {
      meta: {
        size: metaInfo
      },
      frames
    } = spriteData.current;
    const {
      w: frameW,
      h: frameH
    } = Array.isArray(frames) ? frames[0].sourceSize : frameName ? frames[frameName] ? frames[frameName][0].sourceSize : {
      w: 0,
      h: 0
    } : {
      w: 0,
      h: 0
    };
    matRef.current.map.wrapS = matRef.current.map.wrapT = THREE.RepeatWrapping;
    matRef.current.map.center.set(0, 0);
    matRef.current.map.repeat.set(1 * flipOffset / (metaInfo.w / frameW), 1 / (metaInfo.h / frameH));

    //const framesH = (metaInfo.w - 1) / frameW
    const framesV = (metaInfo.h - 1) / frameH;
    const frameOffsetY = 1 / framesV;
    matRef.current.map.offset.x = 0.0; //-matRef.current.map.repeat.x
    matRef.current.map.offset.y = 1 - frameOffsetY;
    if (onStart) {
      onStart({
        currentFrameName: frameName,
        currentFrame: currentFrame.current
      });
    }
  };

  // run the animation on each frame
  const runAnimation = () => {
    //if (!frameName) return

    const now = window.performance.now();
    const diff = now - timerOffset.current;
    const {
      meta: {
        size: metaInfo
      },
      frames
    } = spriteData.current;
    const {
      w: frameW,
      h: frameH
    } = getFirstItem(frames).sourceSize;
    const spriteFrames = Array.isArray(frames) ? frames : frameName ? frames[frameName] : [];
    const _endFrame = endFrame || spriteFrames.length - 1;
    var _offset = offset === undefined ? state.current : offset;

    // conditionals to support backwards play
    var endCondition = playBackwards ? currentFrame.current < 0 : currentFrame.current > _endFrame;
    var onStartCondition = playBackwards ? currentFrame.current === _endFrame : currentFrame.current === 0;
    var manualProgressEndCondition = playBackwards ? currentFrame.current < 0 : currentFrame.current >= _endFrame;
    if (endCondition) {
      currentFrame.current = loop ? startFrame !== null && startFrame !== void 0 ? startFrame : 0 : 0;
      if (playBackwards) {
        currentFrame.current = _endFrame;
      }
      if (loop) {
        onLoopEnd == null || onLoopEnd({
          currentFrameName: frameName,
          currentFrame: currentFrame.current
        });
      } else {
        onEnd == null || onEnd({
          currentFrameName: frameName,
          currentFrame: currentFrame.current
        });
        state.hasEnded = resetOnEnd ? false : true;
        if (resetOnEnd) {
          pauseRef.current = true;
          //calculateFinalPosition(frameW, frameH, metaInfo, spriteFrames)
        }
      }

      if (!loop) return;
    } else if (onStartCondition) {
      onStart == null || onStart({
        currentFrameName: frameName,
        currentFrame: currentFrame.current
      });
    }

    // for manual update
    if (_offset !== undefined && manualProgressEndCondition) {
      if (softEnd.current === false) {
        onEnd == null || onEnd({
          currentFrameName: frameName,
          currentFrame: currentFrame.current
        });
        softEnd.current = true;
      }
    } else {
      // same for start?
      softEnd.current = false;
    }

    // clock to limit fps
    if (diff <= fpsInterval) return;
    timerOffset.current = now - diff % fpsInterval;
    calculateFinalPosition(frameW, frameH, metaInfo, spriteFrames);
  };
  const calculateFinalPosition = (frameW, frameH, metaInfo, spriteFrames) => {
    // get the manual update offset to find the next frame
    var _offset = offset === undefined ? state.current : offset;
    const targetFrame = currentFrame.current;
    let finalValX = 0;
    let finalValY = 0;
    calculateAspectRatio(frameW, frameH);
    const framesH = (metaInfo.w - 1) / frameW;
    const framesV = (metaInfo.h - 1) / frameH;
    if (!spriteFrames[targetFrame]) {
      return;
    }
    const {
      frame: {
        x: frameX,
        y: frameY
      },
      sourceSize: {
        w: originalSizeX,
        h: originalSizeY
      }
    } = spriteFrames[targetFrame];
    const frameOffsetX = 1 / framesH;
    const frameOffsetY = 1 / framesV;
    finalValX = flipOffset > 0 ? frameOffsetX * (frameX / originalSizeX) : frameOffsetX * (frameX / originalSizeX) - matRef.current.map.repeat.x;
    finalValY = Math.abs(1 - frameOffsetY) - frameOffsetY * (frameY / originalSizeY);
    matRef.current.map.offset.x = finalValX;
    matRef.current.map.offset.y = finalValY;

    // if manual update is active
    if (_offset !== undefined && _offset !== null) {
      // Calculate the frame index, based on offset given from the provider
      let frameIndex = Math.floor(_offset * spriteFrames.length);

      // Ensure the frame index is within the valid range
      frameIndex = Math.max(0, Math.min(frameIndex, spriteFrames.length - 1));
      if (isNaN(frameIndex)) {
        frameIndex = 0; //fallback
      }

      currentFrame.current = frameIndex;
    } else {
      // auto update
      if (playBackwards) {
        currentFrame.current -= 1;
      } else {
        currentFrame.current += 1;
      }
    }
  };

  // *** Warning! It runs on every frame! ***
  useFrame((_state, _delta) => {
    var _spriteData$current, _matRef$current;
    if (!((_spriteData$current = spriteData.current) != null && _spriteData$current.frames) || !((_matRef$current = matRef.current) != null && _matRef$current.map)) {
      return;
    }
    if (pauseRef.current) {
      return;
    }
    if (!state.hasEnded && (autoPlay || play)) {
      runAnimation();
      onFrame && onFrame({
        currentFrameName: currentFrameName.current,
        currentFrame: currentFrame.current
      });
    }
  });

  // utils
  const getFirstItem = param => {
    if (Array.isArray(param)) {
      return param[0];
    } else if (typeof param === 'object' && param !== null) {
      const keys = Object.keys(param);
      return frameName ? param[frameName][0] : param[keys[0]][0];
    } else {
      return {
        w: 0,
        h: 0
      };
    }
  };
  function multiplyScale(initialScale, newScale) {
    let _newScale = [];

    // If newScale is a single number, convert it to a Vector3
    if (typeof newScale === 'number') {
      _newScale = [newScale, newScale, newScale];
    } else if (Array.isArray(newScale)) {
      // If newScale is an array, convert it to a Vector3
      _newScale = newScale;
    } else if (newScale instanceof THREE.Vector3) {
      _newScale = [newScale.x, newScale.y, newScale.z];
    }

    // Multiply the scale values element-wise
    const result = initialScale.map((value, index) => value * _newScale[index]);
    // Convert the result to an array of numbers
    return result;
  }
  return /*#__PURE__*/React.createElement("group", _extends({}, props, {
    ref: ref,
    scale: multiplyScale(aspect !== null && aspect !== void 0 ? aspect : [1, 1, 1], (_props$scale = props.scale) !== null && _props$scale !== void 0 ? _props$scale : 1.0)
  }), /*#__PURE__*/React.createElement(context.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(React.Suspense, {
    fallback: null
  }, displayAsSprite && /*#__PURE__*/React.createElement("sprite", {
    ref: spriteRef,
    scale: 1.0
  }, /*#__PURE__*/React.createElement("spriteMaterial", {
    premultipliedAlpha: false,
    toneMapped: false,
    ref: matRef,
    map: spriteTexture,
    transparent: true,
    alphaTest: alphaTest !== null && alphaTest !== void 0 ? alphaTest : 0.0
  })), !displayAsSprite && /*#__PURE__*/React.createElement(Instances, {
    limit: maxItems !== null && maxItems !== void 0 ? maxItems : 1 // Optional: max amount of items (for calculating buffer size)
  }, /*#__PURE__*/React.createElement("planeGeometry", {
    args: [1, 1]
  }), /*#__PURE__*/React.createElement("meshBasicMaterial", {
    premultipliedAlpha: false,
    toneMapped: false,
    side: THREE.DoubleSide,
    ref: matRef,
    map: spriteTexture,
    transparent: true,
    alphaTest: alphaTest !== null && alphaTest !== void 0 ? alphaTest : 0.0
  }), (instanceItems !== null && instanceItems !== void 0 ? instanceItems : [0]).map((item, index) => {
    return /*#__PURE__*/React.createElement(Instance, {
      key: index,
      ref: (instanceItems == null ? void 0 : instanceItems.length) === 1 ? spriteRef : null,
      position: item,
      scale: 1.0
    });
  }))), children));
});

export { SpriteAnimator, useSpriteAnimator };
