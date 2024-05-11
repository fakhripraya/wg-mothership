import React, {
  useCallback,
  useMemo,
  Fragment,
} from "react";
import DynamicAccordion from "../../../components/DynamicAccordion";
import ShowRooms from "./ShowRooms";
import { SETTING_CATEGORY } from "../../../variables/constants/creativeStore";
import { setFeatureModal } from "../../../utils/redux/reducers/creativeStore/creativeStoreReducer";
import { useDispatch } from "react-redux";

const ShowChannel = (props) =>
  useMemo(
    () => (
      <Fragment>
        <DynamicAccordion
          toggle={true}
          isButton={false}
          title={props.value[1].channelTitle}
          prefixes={
            <span
              onClick={(e) => {
                e.stopPropagation();
                props.dispatch(
                  setFeatureModal({
                    modal: SETTING_CATEGORY,
                    toggle: true,
                    title: props.value[1].channelTitle,
                  })
                );
              }}
              className="creative-store-dynamic-accordion-button-wrench"
            />
          }>
          <ShowRooms
            uniqueKey={props.uniqueKey}
            value={props.value}
            joinedRoom={props.joinedRoom}
            listenJoinRoom={props.listenJoinRoom}
            listenJoinChatRoom={props.listenJoinChatRoom}
          />
        </DynamicAccordion>
        {props.channels.length - 1 !== props.index && (
          <hr className="creative-store-linebreak" />
        )}
      </Fragment>
    ),
    [props.value[1], props.listenJoinRoom]
  );

const ShowChannels = (props) => {
  const dispatch = useDispatch();
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
          dispatch={dispatch}
        />
      )),
    [props.channels, props.listenJoinRoom]
  );

  // return the memoized render function
  return render();
};

export default ShowChannels;
