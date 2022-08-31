const Circle = (props) => {
  // console.log("circle props: " + JSON.stringify(props));
  return (
    <svg
      width={props.width}
      height={props.height}
      onMouseMove={props.handleMouseMove}
      ref={props.inputRef}
    >
      <circle
        r={props.circleRadius}
        cx={props.circlePositionX}
        cy={props.circlePositionY}
        fill={props.color}
      />
    </svg>
  );
};

export default Circle;
