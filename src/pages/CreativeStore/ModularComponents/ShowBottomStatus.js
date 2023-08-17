import { Fragment, useMemo } from "react"
import { CONNECTED } from "../../../variables/constants/creativeStore"

const ShowBottomStatus = (props) => {
    return useMemo(() => {
        return <Fragment>
            <div className="creative-store-user-avatar-side-container">
                <div className="creative-store-store-text-container">
                    <h4 className='creative-store-store-text text-ellipsis'>{props.login.user.fullName}</h4>
                </div>
                <div className="creative-store-store-text-container">
                    <small className='creative-store-store-text text-ellipsis'>{props.connectionStatus.webRTCStatus}</small>
                </div>
                <div className='creative-store-store-user-tools'>
                    <span className="creative-store-button-icon creative-store-button-icon-voice" />
                    <span className="creative-store-button-icon creative-store-button-icon-audio" />
                </div>
            </div>
            <div className="creative-store-user-avatar-end-container">
                <span
                    onClick={() => props.handleRoomSocketCleanUp(props.joinedRoom)}
                    className={`creative-store-button-icon creative-store-button-icon-leave ${props.joinedStatus === CONNECTED ? "visible" : "hidden"}`}
                />
                <span className="creative-store-button-icon creative-store-button-icon-setting" />
            </div>
        </Fragment>
    }, [props.connectionStatus])
}

export default ShowBottomStatus