import React from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  margin: 5px 10px;
`;
const SliderLabel = styled.label`
  font-size: 12;
  font-family: monospace;
`;

const Slider = styled.input`
  width: 100%;
  accent-color: ${(props) => props.color};
`;

const CircleTools = (props) => {
  return (
    <div>
      <SliderContainer>
        <SliderLabel for="cursor-size">Radius</SliderLabel>
        <Slider
          type="range"
          color={props.color}
          min={5}
          max={500}
          value={props.cursorSize}
          onChange={(e) => props.updateCursorSize(e.target.value)}
          id="cursor-size"
        />
      </SliderContainer>
    </div>
  );
};

const RectangleTools = (props) => {
  return (
    <div>
      <SliderContainer>
        <SliderLabel for="rectangle-width">Width </SliderLabel>
        <Slider
          type="range"
          color={props.color}
          min={5}
          max={500}
          value={props.rectangleWidth}
          onChange={(e) => props.updateRectangleWidth(e.target.value)}
          id="rectangle-width"
        />
      </SliderContainer>
      <SliderContainer>
        <SliderLabel for="rectangle-height">Height </SliderLabel>
        <Slider
          type="range"
          color={props.color}
          min={5}
          max={500}
          value={props.rectangleHeight}
          onChange={(e) => props.updateRectangleHeight(e.target.value)}
          id="rectangle-height"
        />
      </SliderContainer>
      <SliderContainer>
        <SliderLabel for="rect-rotate">Rotate</SliderLabel>
        <Slider
          type="range"
          color={props.color}
          min={0}
          max={360}
          value={props.rotate}
          onChange={(e) => props.updateRotate(e.target.value)}
          id="rect-rotate"
        />
      </SliderContainer>
    </div>
  );
};

const TriangleTools = (props) => {
  return (
    <div>
      <SliderContainer>
        <SliderLabel for="triangle-rotate">Rotate</SliderLabel>
        <Slider
          type="range"
          color={props.color}
          min={0}
          max={360}
          value={props.rotate}
          onChange={(e) => props.updateRotate(e.target.value)}
          id="triangle-rotate"
        />
        <SliderLabel for="triangle-scale">Size</SliderLabel>
        <Slider
          type="range"
          color={props.color}
          min={0.1}
          max={6}
          step={0.1}
          value={props.triangleScale}
          onChange={(e) => props.updateTriangleScale(e.target.value)}
          id="triangle-scale"
        />
      </SliderContainer>
    </div>
  );
};

export {
  CircleTools,
  RectangleTools,
  TriangleTools,
  Slider,
  SliderLabel,
  SliderContainer,
};
