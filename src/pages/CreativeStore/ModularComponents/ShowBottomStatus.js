import { Fragment, useMemo } from "react";
import { CONNECTED } from "../../../variables/constants/creativeStore";

export const ShowFullName = (props) =>
  useMemo(
    () => (
      <div className="creative-store-store-text-container">
        <h4 className="creative-store-store-text text-ellipsis">
          {props.fullName}
        </h4>
        <div className="creative-store-store-text-container">
          <small className="creative-store-store-text text-ellipsis">
            {props.statusMessage}
          </small>
        </div>
      </div>
    ),
    [props.connectionStatus]
  );

export const ShowBottomStatus = (props) =>
  useMemo(
    () => (
      <Fragment>
        <div className="creative-store-user-avatar-side-container">
          <ShowFullName
            connectionStatus={props.connectionStatus}
            fullName={props.login.user.fullName}
          />
          <div className="creative-store-store-text-container">
            <small className="creative-store-store-text text-ellipsis">
              {props.connectionStatus.webRTCStatus}
            </small>
          </div>
          <div className="creative-store-store-user-tools">
            <span className="creative-store-button-icon creative-store-button-icon-voice" />
            <span className="creative-store-button-icon creative-store-button-icon-audio" />
          </div>
        </div>
        <div className="creative-store-user-avatar-end-container">
          <span
            onClick={() =>
              props.handleRoomSocketCleanUp(
                props.joinedRoom
              )
            }
            className={`creative-store-button-icon creative-store-button-icon-leave ${
              props.joinedStatus === CONNECTED
                ? "visible"
                : "hidden"
            }`}
          />
          <span className="creative-store-button-icon creative-store-button-icon-setting" />
        </div>
      </Fragment>
    ),
    [props.connectionStatus]
  );
