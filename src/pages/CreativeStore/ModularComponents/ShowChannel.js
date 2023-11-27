import React, {
  useCallback,
  useMemo,
  Fragment,
} from "react";
import DynamicAccordion from "../../../components/DynamicAccordion";
import ShowRooms from "./ShowRooms";

const ShowChannel = (props) => {
  return useMemo(
    () => (
      <Fragment>
        <DynamicAccordion
          toggle={true}
          isButton={false}
          title={props.value[1].channelTitle}>
          <ShowRooms
            uniqueKey={props.uniqueKey}
            value={props.value}
            joinedRoom={props.joinedRoom}
            listenJoinRoom={props.listenJoinRoom}
            listenJoinChatRoom={props.listenJoinChatRoom}
          />
        </DynamicAccordion>
        {props.channels.length - 1 !== props.index && (
          <hr className="creative-store-linebreak"></hr>
        )}
      </Fragment>
    ),
    [props.value[1], props.listenJoinRoom]
  );
};

const ShowChannels = (props) => {
  const render = useCallback(
    () =>
      Object.entries(props.channels).map((obj, index) => (
        <ShowChannel
          key={`${props.uniqueKey}-dynamic-accordion-${index}`}
          value={obj}
          index={index}
          channels={props.channels}
          joinedRoom={props.joinedRoom}
          listenJoinRoom={props.listenJoinRoom}
          listenJoinChatRoom={props.listenJoinChatRoom}
        />
      )),
    [props.channels, props.listenJoinRoom]
  );
  // return the memoized render function
  return render();
};

export default ShowChannels;
