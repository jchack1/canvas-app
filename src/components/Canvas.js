import styled from "styled-components";
import React, {useState, useRef} from "react";
import {HexColorPicker} from "react-colorful";
import {CircleTools, RectangleTools, TriangleTools} from "./PaletteTools";

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
const ShapeSelectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
  margin-top: 10px;
`;
const SliderLabel = styled.label`
  font-size: 12;
  font-family: monospace;
`;

const Slider = styled.input`
  width: 100%;
  accent-color: ${(props) => props.color};
`;

const Canvas = () => {
  const [mousePositionX, updateMousePositionX] = useState(0);
  const [mousePositionY, updateMousePositionY] = useState(0);

  const [color, updateColor] = useState("#000");
  const [shapeSelection, updateShapeSelection] = useState("circle");
  const [rotate, updateRotate] = useState(0);

  //circle
  const [cursorSize, updateCursorSize] = useState(50);
  const [cursorOpacity, updateCursorOpacity] = useState("1");

  //rectangle
  const [rectangleWidth, updateRectangleWidth] = useState(50);
  const [rectangleHeight, updateRectangleHeight] = useState(70);

  const inputRef = useRef();

  const handleMouseMove = (event) => {
    const {clientX, clientY} = event;
    const displacementX = inputRef.current.getBoundingClientRect().x; //inputRef.current just gets the current element, you can then get information about that element like in vanilla javascript
    const displacementY = inputRef.current.getBoundingClientRect().y;

    updateMousePositionX(clientX - displacementX);
    updateMousePositionY(clientY - displacementY);
  };

  const handleClick = () => {
    if (shapeSelection === "circle") {
      d3.select(inputRef.current)
        .insert("circle", "#circle-cursor")
        .attr("r", cursorSize)
        .attr("cx", mousePositionX)
        .attr("cy", mousePositionY)
        .attr("fill", color)
        .attr("fill-opacity", cursorOpacity);
    }
    if (shapeSelection === "rectangle") {
      d3.select(inputRef.current)
        .insert("rect", "#rect-cursor")
        .style("transform-origin", "center")
        .style("transform-box", "fill-box")
        .attr("transform", `rotate(${rotate})`)
        .attr("width", rectangleWidth)
        .attr("height", rectangleHeight)
        .attr("x", mousePositionX)
        .attr("y", mousePositionY)
        .attr("fill", color)
        .attr("fill-opacity", cursorOpacity);
    }
    if (shapeSelection === "triangle") {
      d3.select(inputRef.current)
        // .append("svg")
        .insert("svg", "#triangle-cursor")
        .append("polygon")
        .attr("points", "50 15, 100 100, 0 100")
        .style("transform-origin", "center")
        .style("transform-box", "fill-box")
        .attr("transform", `translate(${mousePositionX} ${mousePositionY})`)
        .attr("transform", `rotate(${rotate})`)
        .attr("fill", color)
        .attr("fill-opacity", cursorOpacity);
    }
  };

  const handleShapeClick = (shape) => {
    updateShapeSelection(shape);
    console.log("handleshape: " + shape);
  };

  console.log(shapeSelection);

  return (
    <PageContainer>
      <CanvasContainer>
        <Palette>
          <HexColorPicker color={color} onChange={updateColor} />

          <ShapeSelectionContainer>
            {/* circle */}
            <svg width={40} height={40} style={{margin: "10px"}}>
              <circle
                r={20}
                cx={20}
                cy={20}
                fill={color}
                onClick={() => handleShapeClick("circle")}
              />
            </svg>

            {/* rectangle */}
            <svg width={40} height={30}>
              <rect
                x="0"
                y="0"
                width={40}
                height={30}
                fill={color}
                onClick={() => handleShapeClick("rectangle")}
              />
            </svg>

            {/* triangle */}
            <svg width={60} height={40} viewBox="0 0 100 100">
              <polygon
                points="50 15, 100 100, 0 100"
                onClick={() => handleShapeClick("triangle")}
                fill={color}
              />
            </svg>
          </ShapeSelectionContainer>

          <SliderContainer>
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
          </SliderContainer>

          {shapeSelection === "circle" && (
            <CircleTools
              color={color}
              cursorSize={cursorSize}
              updateCursorSize={updateCursorSize}
            />
          )}
          {shapeSelection === "rectangle" && (
            <RectangleTools
              color={color}
              rectangleWidth={rectangleWidth}
              rectangleHeight={rectangleHeight}
              updateRectangleWidth={updateRectangleWidth}
              updateRectangleHeight={updateRectangleHeight}
              rotate={rotate}
              updateRotate={updateRotate}
            />
          )}
          {shapeSelection === "triangle" && (
            <TriangleTools
              color={color}
              rotate={rotate}
              updateRotate={updateRotate}
            />
          )}
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
            className="parent-svg"
          >
            {shapeSelection === "circle" && (
              <circle
                r={cursorSize}
                cx={mousePositionX}
                cy={mousePositionY}
                fill={color}
                fillOpacity={cursorOpacity}
                id="circle-cursor"
              />
            )}

            {shapeSelection === "rectangle" && (
              <rect
                width={rectangleWidth}
                height={rectangleHeight}
                x={mousePositionX}
                y={mousePositionY}
                fill={color}
                fillOpacity={cursorOpacity}
                id="rect-cursor"
                transform={`rotate(${rotate})`}
                style={{transformOrigin: "center", transformBox: "fill-box"}}
              />
            )}

            {shapeSelection === "triangle" && (
              <polygon
                points="50 15, 100 100, 0 100"
                fill={color}
                fillOpacity={cursorOpacity}
                transform={`translate(${mousePositionX} ${mousePositionY}), rotate(${rotate})`}
                style={{transformOrigin: "center", transformBox: "fill-box"}}
                id="triangle-cursor"
              />
            )}
          </svg>
        </MainCanvas>
      </CanvasContainer>
    </PageContainer>
  );
};

export default Canvas;
