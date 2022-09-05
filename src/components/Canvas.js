import styled from "styled-components";
import React, {useState, useEffect, useRef} from "react";
import {HexColorPicker} from "react-colorful";
import Circle from "./shapes/Circle";
import * as d3 from "d3";

const PageContainer = styled.div`
  background-color: #222;
  overflow: hidden;
  display: flex;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
`;

const CanvasContainer = styled.div`
  display: flex;
  justify-items: space-around;
  align-items: center;
  margin: 0 auto;
`;

const MainCanvas = styled.div`
  background: #ccc;
  width: 700px;
  height: 500px;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 15px 0px;
  cursor: none;
`;

const Palette = styled.div`
  background: #ccc;
  width: 200px;
  height: 500px;
  margin-right: 50px;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 15px 0px;
`;

const SliderLabel = styled.label`
  font-size: 12;
  font-family: monospace;
`;

const Slider = styled.input`
  width: 100%;
  color: ${(props) => props.color};
`;

const Canvas = () => {
  const [mousePositionX, updateMousePositionX] = useState(0);
  const [mousePositionY, updateMousePositionY] = useState(0);

  const [color, updateColor] = useState("#000");

  const [cursorSize, updateCursorSize] = useState(50);
  const [cursorOpacity, updateCursorOpacity] = useState("1");

  const inputRef = useRef();

  const handleMouseMove = (event) => {
    const {clientX, clientY} = event;
    const displacementX = inputRef.current.getBoundingClientRect().x; //inputRef.current just gets the current element, you can then get information about that element like in vanilla javascript
    const displacementY = inputRef.current.getBoundingClientRect().y;

    updateMousePositionX(clientX - displacementX);
    updateMousePositionY(clientY - displacementY);
  };

  const handleClick = () => {
    console.log("click");
    console.log(mousePositionX, mousePositionY, cursorSize, color);

    d3.select(inputRef.current)
      .append("circle")
      .attr("r", cursorSize)
      .attr("cx", mousePositionX)
      .attr("cy", mousePositionY)
      .attr("fill", color)
      .attr("fill-opacity", cursorOpacity);
  };

  return (
    <PageContainer>
      <CanvasContainer>
        <Palette>
          <HexColorPicker color={color} onChange={updateColor} />

          <SliderLabel for="cursor-size">Size (px)</SliderLabel>
          <Slider
            type="range"
            color={color}
            min={5}
            max={500}
            value={cursorSize}
            onChange={(e) => updateCursorSize(e.target.value)}
            id="cursor-size"
          />

          <SliderLabel for="cursor-opacity">Opacity</SliderLabel>
          <Slider
            type="range"
            color={color}
            min={0}
            max={1}
            step="0.01"
            value={cursorOpacity}
            onChange={(e) => updateCursorOpacity(e.target.value)}
            id="cursor-opacity"
          />
        </Palette>

        {/* on click, deposit colour and shape somehow - only on main canvasy */}
        <MainCanvas
          onMouseMove={handleMouseMove}
          // ref={inputRef}
          onClick={handleClick}
          data-canvas
        >
          {/* important!!! we must add shapes to the svg, so ref must be on svg */}
          <svg
            width="700px"
            height="500px"
            onMouseMove={handleMouseMove}
            ref={inputRef}
          >
            <circle
              r={cursorSize}
              cx={mousePositionX}
              cy={mousePositionY}
              fill={color}
              fillOpacity={cursorOpacity}
            />
          </svg>
        </MainCanvas>
      </CanvasContainer>
    </PageContainer>
  );
};

export default Canvas;
