import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: black;
    font-family: monospace;
  }
`;
const ToggleContainer = styled.div`
  //* background: ${(props) =>
    props.active === "and" ? "#9ef0bc" : "#ffe085"}; *//
  background: #aaa;
  height: 25px;
  width: 57px;
  border-radius: 20px;
  position: relative;
  transition: 0.3s;
  margin: 10px;
`;

const ToggleInner = styled.div`
  background: ${(props) => props.color};
  transform: ${(props) =>
    props.active === "click" ? "translateX(0px)" : "translateX(33px)"};
  height: 25px;
  width: 25px;
  top: 0;
  left: 0;
  border-radius: 20px;
  transition: 0.3s;
`;

const Toggle = (props) => {
  return (
    <Container>
      <p>Click</p>
      <ToggleContainer onClick={props.onClick} active={props.active}>
        <ToggleInner active={props.active} color={props.color} />
      </ToggleContainer>
      <p>Continuous</p>
    </Container>
  );
};

export default Toggle;
