import React from "react";
import "./style.scss";

const TextInput = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    value={props.value}
    placeholder={props.placeholder}
    style={props.style}
    onKeyUp={(e) => {
      if (
        (e.key === "Enter" || e.keyCode === 13) &&
        typeof props.onEnter !== "undefined"
      )
        props.onEnter();
      if (typeof props.onKeyUp !== "undefined")
        props.onKeyUp(e);
    }}
    onInput={props.onInput}
    onFocus={props.onFocus}
    onChange={props.onChange}
    maxLength={props.maxLength}
    type={props.type}
    autoFocus={props.autoFocus}
    autoComplete={props.autoComplete}
    className={"input-text " + props.className}></input>
));

export default TextInput;
