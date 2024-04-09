import React from "react";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import "./style.scss";
import { DASHBOARD_CHAT_DATA_DUMMY } from "../../variables/initial/dashboardChat";
import { useEffect } from "react";
import { smoothScrollTop } from "../../utils/functions/global";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_REMINDERS } from "../../variables/global";
import Avatar from "react-avatar";
import FloatButton from "../../components/FloatButton";
import SearchIcon from "../../assets/svg/search-icon.svg";

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
          key={`dashboard-reminder-items-${index}`}
          className="dashboard-reminder-body margin-top-12-18 dark-bg-color">
          <div className="dashboard-reminder-body-items dashboard-reminder-body-identifier">
            <div className="dashboard-reminder-identifier-img-wrapper">
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
          <div className="dashboard-reminder-body-items dashboard-reminder-body-textarea">
            <h3 className="margin-top-0 margin-bottom-0">
              <span className="main-color">
                {item.displayName}
              </span>
            </h3>
            <p className="margin-bottom-0">
              {item.lastChat}
            </p>
          </div>
          <div className="dashboard-reminder-body-items dashboard-reminder-body-options">
            {/* <h5 onClick={() => handleOpenDetail(item, navigate)} className="margin-top-bottom-0 light-color main-bg-color dashboard-reminder-body-rent-button" >Pin</h5>
                    <h5 onClick={() => handleOpenDetail(item, navigate)} className="margin-bottom-0 light-color main-bg-color dashboard-reminder-body-rent-button" >Mute</h5> */}
            <FloatButton className="dashboard-menu-button dashboard-menu-button-pin" />
            <div className="breakline" />
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
        props.toggleOpen === DASHBOARD_REMINDERS
          ? "dashboard-reminder-container"
          : "display-none"
      }>
      <div className="dashboard-reminder-wrapper">
        <div className="dashboard-reminder-header dark-bg-color">
          <div className="dashboard-reminder-searchbar-container">
            <div className="dashboard-reminder-searchbar-wrapper">
              <Button className="dashboard-reminder-searchbar-button lighter-bg-color">
                <img
                  src={SearchIcon}
                  alt="search-icon-dashboard-reminder"
                />
              </Button>
              <TextInput className="dashboard-reminder-searchbar-input" />
            </div>
          </div>
          <div className="dashboard-reminder-tools-container">
            <div className="dashboard-reminder-tools-wrapper">
              <div className="dashboard-reminder-checkbox">
                <div className="dashboard-reminder-checkbox-wrapper"></div>
              </div>
              <div className="dashboard-reminder-dropdown-wrapper"></div>
            </div>
          </div>
        </div>
        <ShowBody />
        <div className="dashboard-reminder-paging margin-top-12-18 justify-center">
          <div className="dark-bg-color dashboard-reminder-paging-button">
            Prev
          </div>
          <div className="dark-bg-color dashboard-reminder-paging-button">
            1
          </div>
          <div className="dark-bg-color dashboard-reminder-paging-button">
            2
          </div>
          <div className="dark-bg-color dashboard-reminder-paging-button">
            3
          </div>
          <div className="dark-bg-color dashboard-reminder-paging-button">
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
