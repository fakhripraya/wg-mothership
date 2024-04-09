import React, { useCallback, useMemo } from "react";
import ShowSockets from "./ShowSockets";
import { TEXT } from "../../../variables/constants/creativeStore";

const ShowRoom = (props) =>
  useMemo(
    () => (
      <button
        key={`${props.uniqueKey}-dynamic-accordion-${props.value[1].roomTitle}-${props.index}`}
        className="dynamic-accordion-button creative-store-dynamic-accordion-button"
        onClick={() => {
          // if the room is chat room, it will process the middle panel render (chat body)
          // else the room is voice room, it will process the left panel render
          if (props.value[1].roomType === TEXT)
            return props.listenJoinChatRoom(
              props.parentValue[1],
              props.value[1]
            );
          return props.listenJoinRoom(
            props.parentValue[1],
            props.value[1],
            props.joinedRoom
          );
        }}>
        <p className="dynamic-accordion-subtitle light-color">
          {props.value[1].roomTitle}
        </p>
        <ShowSockets
          uniqueKey={props.uniqueKey}
          value={props.value}
        />
      </button>
    ),
    [props.value[1], props.listenJoinRoom]
  );

const ShowRooms = (props) => {
  const render = useCallback(
    () =>
      Object.entries(props.value[1].channelRooms).map(
        (obj, index) => (
          <ShowRoom
            key={`${props.uniqueKey}-dynamic-accordion-room-${props.value[1].channelId}-${index}`}
            uniqueKey={props.uniqueKey}
            value={obj}
            index={index}
            joinedRoom={props.joinedRoom}
            parentValue={props.value}
            listenJoinRoom={props.listenJoinRoom}
            listenJoinChatRoom={props.listenJoinChatRoom}
          />
        )
      ),
    [props.value[1].channelRooms, props.listenJoinRoom]
  );

  return render();
};

export default ShowRooms;
