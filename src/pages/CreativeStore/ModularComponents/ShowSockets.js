import React, { useCallback, useMemo } from "react";
import Avatar from "react-avatar";

const ShowSocket = (props) => {
  return useMemo(
    () => (
      <div className="creative-store-dynamic-accordion-socket-user">
        <Avatar
          style={{ cursor: "pointer" }}
          size={30}
          round={true}
          title={props.value[1].fullName}
          name={props.value[1].fullName}
        />
        <label className="light-color">
          {props.value[1].fullName}
        </label>
      </div>
    ),
    [props.value[1]]
  );
};

const ShowSockets = (props) => {
  const render = useCallback(() => {
    if (!props.value[1].roomSockets) return null;
    const entries = Object.entries(
      props.value[1].roomSockets
    );
    return (
      <div
        className={`creative-store-dynamic-accordion-socket-wrapper ${
          entries.length === 0 && "display-none"
        }`}>
        {entries.map((value, index) => {
          return (
            <ShowSocket
              key={`${value[0]}-dynamic-accordion-socket-user-${props.index}`}
              value={value}
              index={index}
            />
          );
        })}
      </div>
    );
  }, [props.value[1].roomSockets]);

  return render();
};

export default ShowSockets;
