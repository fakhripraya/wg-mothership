import React from "react";
import "./style.scss";

const TextInput = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    value={props.value}
    style={props.style}
    onChange={props.onChange}
    maxLength={props.maxLength}
    type={props.type}
    className={"input-text " + props.className}></input>
));

export default TextInput;
