import React, { useCallback, useMemo } from "react";
import ShowSockets from "./ShowSockets";

const ShowRoom = (props) => {
    return useMemo(() => {
        return <button
            key={`${props.uniqueKey}-dynamic-accordion-${props.value[1].roomTitle}-${props.index}`}
            className="dynamic-accordion-button creative-store-dynamic-accordion-button"
            onClick={() => props.listenJoinRoom(props.parentValue[1], props.value[1], props.joinedRoom)}
        >
            <h6 className="dynamic-accordion-subtitle light-color">{props.value[1].roomTitle}</h6>
            <ShowSockets uniqueKey={props.uniqueKey} value={props.value} />
        </button>
    }, [props.value[1], props.listenJoinRoom]);
}

const ShowRooms = (props) => {
    const render = useCallback(() => {
        return Object.entries(props.value[1].channelRooms).map((obj, index) => {
            return <ShowRoom
                key={`${props.uniqueKey}-dynamic-accordion-room-${props.value[1].channelId}-${index}`}
                uniqueKey={props.uniqueKey}
                value={obj} index={index}
                joinedRoom={props.joinedRoom}
                parentValue={props.value}
                listenJoinRoom={props.listenJoinRoom} />
        })
    }, [props.value[1].channelRooms, props.listenJoinRoom]);

    return render();
}

export default ShowRooms;