import React, { useCallback, useMemo } from "react";
import Avatar from "react-avatar";

const ShowChat = (props) => {
  return useMemo(() => {
    return <p>{props.value[1].chatContent}</p>;
  }, [props.value[1]]);
};

const ShowChats = (props) => {
  const render = useCallback(() => {
    return Object.entries(props.chats).map((obj, index) => {
      return (
        <ShowChat
          key={`${props.uniqueKey}-chat-${index}`}
          value={obj}
        />
      );
    });
  }, [props.chats]);
  // return the memoized render function
  return render();
};

const ShowChatWrapper = (props) => {
  return useMemo(() => {
    return (
      <div className="creative-store-chattext-container">
        <div className="creative-store-chattext-avatar">
          <Avatar
            style={{ cursor: "pointer" }}
            round={true}
            size={50}
            src={props.value[1].sender.profilePictureURI}
            title={props.value[1].sender.fullName}
            name={props.value[1].sender.fullName}
          />
        </div>
        <div className="creative-store-chattext-wrapper">
          <div>
            <h4 className="creative-store-chattext-username">
              {props.value[1].sender.fullName}
            </h4>
            <small>
              {
                Object.entries(props.value[1].chats)[
                  Object.entries(props.value[1].chats)
                    .length - 1
                ][1].createdAt
              }
            </small>
          </div>
          <ShowChats chats={props.value[1].chats} />
        </div>
      </div>
    );
  }, [props.value[1]]);
};

const ShowChatWrappers = (props) => {
  const render = useCallback(() => {
    return Object.entries(props.chats).map((obj, index) => {
      return (
        <ShowChatWrapper
          key={`${props.uniqueKey}-chat-wrapper-${index}`}
          value={obj}
          index={index}
        />
      );
    });
  }, [props.chats]);
  // return the memoized render function
  return render();
};

export default ShowChatWrappers;
