import React from "react";
import "./Display.css";

function Display(props) {
  return (
    <div className="containerDisplay">
      <p className="numbers">
        {props.number1} {props.operator} {props.number2}
      </p>
      <p className="result">{props.result}</p>
    </div>
  );
}

export default Display;
