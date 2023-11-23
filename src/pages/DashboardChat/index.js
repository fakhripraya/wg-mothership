import React from "react";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import "./style.scss";
import { DASHBOARD_CHAT_DATA_DUMMY } from "../../variables/initial/dashboardChat";
import { useEffect } from "react";
import { smoothScrollTop } from "../../utils/functions/global";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_CHATS } from "../../variables/global";
import Avatar from "react-avatar";
import FloatButton from "../../components/FloatButton";

export default function DashboardChat(props) {
  // FUNCTIONS SPECIFIC //
  function handleOpenChat() {
    window.location.href = "/dashboard/chat";
  }

  // COMPONENTS SPECIFIC //
  const ShowBody = () => {
    // HOOK
    const navigate = useNavigate();
    // Render list
    return DASHBOARD_CHAT_DATA_DUMMY.map((item, index) => {
      return (
        <div
          onClick={() => handleOpenChat(navigate)}
          key={`dashboard-chat-items-${index}`}
          className="dashboard-chat-body margin-top-12-18 dark-bg-color">
          <div className="dashboard-chat-body-items dashboard-chat-body-identifier">
            <div className="dashboard-chat-identifier-img-wrapper">
              <Avatar
                style={{ cursor: "pointer" }}
                src={item.displayImg.src}
                round={true}
                title={
                  item.displayImg.alt
                    ? item.displayImg.alt
                    : item.displayName
                }
                name={
                  item.displayImg.alt
                    ? item.displayImg.alt
                    : item.displayName
                }
              />
            </div>
          </div>
          <div className="dashboard-chat-body-items dashboard-chat-body-textarea">
            <h3 className="margin-top-0 margin-bottom-0">
              <span className="main-color">
                {item.displayName}
              </span>
            </h3>
            <p className="margin-bottom-0">
              {item.lastChat}
            </p>
          </div>
          <div className="dashboard-chat-body-items dashboard-chat-body-options">
            {/* <h5 onClick={() => handleOpenDetail(item, navigate)} className="margin-top-bottom-0 light-color main-bg-color dashboard-chat-body-rent-button" >Pin</h5>
                    <h5 onClick={() => handleOpenDetail(item, navigate)} className="margin-bottom-0 light-color main-bg-color dashboard-chat-body-rent-button" >Mute</h5> */}
            <FloatButton className="dashboard-menu-button dashboard-menu-button-pin" />
            <br />
            <FloatButton className="dashboard-menu-button dashboard-menu-button-archive" />
          </div>
        </div>
      );
    });
  };

  // INITIAL RENDER
  useEffect(() => {
    smoothScrollTop();
  }, []);

  return (
    <div
      className={
        props.toggleOpen === DASHBOARD_CHATS
          ? "dashboard-chat-container"
          : "display-none"
      }>
      <div className="dashboard-chat-wrapper">
        <div className="dashboard-chat-header dark-bg-color">
          <div className="dashboard-chat-searchbar-container">
            <div className="dashboard-chat-searchbar-wrapper">
              <TextInput className="dashboard-chat-searchbar-input" />
              <Button>Search</Button>
            </div>
          </div>
          <div className="dashboard-chat-tools-container">
            <div className="dashboard-chat-tools-wrapper">
              <div className="dashboard-chat-checkbox">
                <div className="dashboard-chat-checkbox-wrapper"></div>
              </div>
              <div className="dashboard-chat-dropdown-wrapper"></div>
            </div>
          </div>
        </div>
        <ShowBody />
        <div className="dashboard-chat-paging margin-top-12-18 justify-center">
          <div className="dark-bg-color dashboard-chat-paging-button">
            Prev
          </div>
          <div className="dark-bg-color dashboard-chat-paging-button">
            1
          </div>
          <div className="dark-bg-color dashboard-chat-paging-button">
            2
          </div>
          <div className="dark-bg-color dashboard-chat-paging-button">
            3
          </div>
          <div className="dark-bg-color dashboard-chat-paging-button">
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
