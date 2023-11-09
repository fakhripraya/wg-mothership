import React, { Fragment, useState } from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import OverridingContainer from "../../components/OveriddingContainer";
import { ShowNavbar } from "../../components/Global";
import Footer from "../../components/Footer";
import XMark from "../../assets/svg/xmark-solid.svg";
import {
  NO_STRING,
  OTP_PAGE,
  URL_POST_OTP,
  CLIENT_USER_INFO,
  X_SID,
  AUTHORIZATION,
  IS_INPUT_OTP_ELIGIBLE,
} from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import Modal from "../../components/Modal";
import { postOTPDataInitialValue } from "../../variables/initial/otp";
import { trackPromise } from "react-promise-tracker";
import {
  acceptNumericOnly,
  handleErrorMessage,
  handleOpenModal,
} from "../../utils/functions/global";
import { cookies } from "../../config/cookie";

export default function OTP(props) {
  // VARIABLES
  const userInfo = cookies.get(CLIENT_USER_INFO);
  if (IS_INPUT_OTP_ELIGIBLE(userInfo)) {
    postOTPDataInitialValue.credentialToken =
      userInfo.credentialToken;
    postOTPDataInitialValue.sid = userInfo.sid;
  }

  // HOOKS //
  const credentialService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postOTPData, setPostOTPData] = useState(
    postOTPDataInitialValue
  );
  const [errorMessage, setErrorMessage] = useState(null);

  // FUNCTIONS SPECIFIC //
  function handleNumericChange(field, event) {
    const temp = { ...postOTPData };
    temp[field] = acceptNumericOnly(event.target.value);
    setPostOTPData(temp);
  }

  function handleSubmitOTP() {
    if (!IS_INPUT_OTP_ELIGIBLE(userInfo)) return;
    trackPromise(
      credentialService
        .postData({
          endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
          headers: {
            [X_SID]: cookies.get(CLIENT_USER_INFO, {
              path: "/",
            }).sid,
            [AUTHORIZATION]: `Bearer ${
              cookies.get(CLIENT_USER_INFO, {
                path: "/",
              }).credentialToken.accessToken
            }`,
          },
          url: URL_POST_OTP,
          data: postOTPData,
        })
        .then((result) => {
          cookies.set(
            CLIENT_USER_INFO,
            result.responseData,
            { path: "/" }
          );
          props.handleOpen(NO_STRING);
          window.location.href = "/";
        })
        .catch((error) => {
          return handleErrorMessage(
            error,
            setErrorMessage,
            setModalToggle,
            modalToggle
          );
        })
    );
  }

  // COMPONENTS SPECIFIC //
  const ShowModal = () => {
    return (
      <div className="otp-modal-container dark-bg-color">
        <div className="otp-modal-wrapper">
          <Button
            onClick={() =>
              handleOpenModal(setModalToggle, modalToggle)
            }
            className="align-self-end otp-button red-bg-color">
            <h4 className="otp-button-text">X</h4>
          </Button>
          <br />
          <h3 className="margin-top-0 margin-bottom-12-18">
            There is an&nbsp;
            <span className="red-color">ERROR</span>
          </h3>
          <br />
          <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
            {errorMessage}
          </label>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(setModalToggle, modalToggle)
        }
        toggle={modalToggle}>
        <ShowModal />
      </Modal>
      <OverridingContainer
        toggle={props.toggle === OTP_PAGE}>
        <div className="sticky-top">
          <ShowNavbar>
            <img
              onClick={() => props.handleOpen(NO_STRING)}
              className="navbar-mobile-hamburger-image"
              src={XMark}
              alt="ic_hamburger"
            />
          </ShowNavbar>
          <div className="otp-container">
            <div className="otp-wrapper">
              <h3 className="margin-bottom-12-18">
                Input Kode&nbsp;
                <span className="main-color">OTP</span>
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Kami telah mengirimi kode&nbsp;
                <span className="main-color">
                  OTP (One Time Password)
                </span>
                &nbsp;melalui email anda, input disini agar
                kami bisa memverifikasi data anda
              </label>
              <div className="otp-textinput-box">
                <label className="otp-input-title">
                  OTP
                </label>
                <TextInput
                  value={postOTPData.OTPInput}
                  onChange={(e) =>
                    handleNumericChange("OTPInput", e)
                  }
                  maxLength="6"
                  type="password"
                  className="otp-textinput text-align-center"
                />
              </div>
              <br />
              <Button
                onClick={() => handleSubmitOTP()}
                className="otp-button">
                <h3 className="otp-button-text">Submit</h3>
              </Button>
            </div>
          </div>
          <Footer isOverriding={true} />
        </div>
      </OverridingContainer>
    </Fragment>
  );
}
