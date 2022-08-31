import styled from "styled-components";
import React, {useState, useEffect, useRef, useDebugValue} from "react";
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

//canvas background, off from center, not bright white
//background shadow maybe
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

const SelectedColorSize = 50;

const SelectedColor = styled.div`
  width: ${SelectedColorSize}px;
  height: ${SelectedColorSize}px;
  border-radius: ${SelectedColorSize}px;
  background: ${(props) => props.color};
  box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 15px 0px;
  margin: 10px;
`;

const Canvas = () => {
  const [mousePositionX, updateMousePositionX] = useState(0);
  const [mousePositionY, updateMousePositionY] = useState(0);

  const [color, updateColor] = useState("#000");
  const [showColorPicker, updateShowColorPicker] = useState(false);
  const [clickCount, updateClickCount] = useState(0);

  const [cursorSize, updateCursorSize] = useState(50);

  const inputRef = useRef();

  const handleMouseMove = (event) => {
    const {clientX, clientY} = event;
    const displacementX = inputRef.current.getBoundingClientRect().x; //inputRef.current just gets the current element, you can then get information about that element like in vanilla javascript
    const displacementY = inputRef.current.getBoundingClientRect().y;

    updateMousePositionX(clientX - displacementX);
    updateMousePositionY(clientY - displacementY);

    // console.log(inputRef.current.getBoundingClientRect());
    // console.log(mousePositionX, mousePositionY);
  };
  // console.log(inputRef.current.getBoundingClientRect());

  // console.log(color);

  const handleClick = () => {
    console.log("click");
    console.log(mousePositionX, mousePositionY, cursorSize, color);

    // inputRef.current.style.background = "red"; //this works and shows we can get the correct element, now to add to it
    // const canvas = d3.select(inputRef);
    // console.log("canvas: " + canvas);

    const mydiv = document.querySelector("[data-canvas]");
    console.log(mydiv);
    mydiv.style.setProperty("color", "red");

    // mydiv.append(
    //   <svg width={700} height={500}>
    //     <circle
    //       r={cursorSize}
    //       cx={mousePositionX}
    //       cy={mousePositionY}
    //       fill={color}
    //     />
    //   </svg>
    // );

    updateClickCount(clickCount + 1);
    // canvas.append(
    //   <Circle
    //     width="700px"
    //     height="500px"
    //     handleMouseMove={handleMouseMove}
    //     circleRadius={cursorSize}
    //     circlePositionX={mousePositionX}
    //     circlePositionY={mousePositionY}
    //     color={color}
    //   />
    // );
    // .attr("circleRadius", cursorSize)
    // .attr("circlePositionX", mousePositionX)
    // .attr("circlePositionY", mousePositionY)
    // .attr("color", color)
    // .attr("width", "700px")
    // .attr("height", "500px");

    d3.select(inputRef.current)
      .append("circle")
      .attr("r", cursorSize)
      .attr("cx", mousePositionX)
      .attr("cy", mousePositionY)
      .attr("stroke", color)
      .attr("fill", color);
    // d3.select(inputRef.current)
    //   .append("circle")
    //   .attr("r", "100")
    //   .attr("cx", 300)
    //   .attr("cy", 300)
    //   .attr("stroke", "black")
    //   .attr("fill", "black");
    // return (
    //   <svg>
    //     <circle
    //       cx={mousePositionX}
    //       cy={mousePositionY}
    //       r={cursorSize}
    //       fill={color}
    //     />
    //     {/* <svg width={700} height={500}>
    //       <circle cx="150" cy="77" r="40" fill="#000" />
    //     </svg> */}
    //   </svg>
    // );
  };

  // https://wattenberger.com/blog/react-and-d3

  // useEffect(() => {
  //   const svg = d3.select(inputRef.current);

  //   svg
  //     .enter()
  //     .append("circle")
  //     .attr("r", cursorSize)
  //     .attr("cx", mousePositionX)
  //     .attr("cy", mousePositionY)
  //     .attr("stroke", color)
  //     .attr("fill", color);

  //   console.log("click count; " + clickCount);
  // }, [clickCount]);

  return (
    <PageContainer>
      <CanvasContainer>
        <Palette>
          <SelectedColor
            color={color}
            onClick={() => updateShowColorPicker(!showColorPicker)}
          />
          {showColorPicker && (
            <HexColorPicker color={color} onChange={updateColor} />
          )}
        </Palette>

        {/* on click, deposit colour and shape somehow - only on main canvasy */}
        <MainCanvas
          onMouseMove={handleMouseMove}
          // ref={inputRef}
          onClick={handleClick}
          data-canvas
        >
          {/* we want a shape here as a cursor */}
          {/* can change this shape depending on what someone chooses */}
          {/* <Circle
            width="700px"
            height="500px"
            handleMouseMove={handleMouseMove}
            circleRadius={cursorSize}
            circlePositionX={mousePositionX}
            circlePositionY={mousePositionY}
            color={color}
            style={{background: "none"}}
            myRef={inputRef}
          /> */}

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
            />
          </svg>
        </MainCanvas>
      </CanvasContainer>
    </PageContainer>
  );
};

export default Canvas;
