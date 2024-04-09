import React, { Fragment, useState } from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import OverridingContainer from "../../components/OverridingContainer";
import { ShowNavbar } from "../../components/Global";
import Footer from "../../components/Footer";
import XMark from "../../assets/svg/xmark-solid.svg";
import {
  NO_STRING,
  FORGOT_PASSWORD,
  LOGIN,
  URL_POST_FORGOT_PW,
  CLIENT_USER_INFO,
} from "../../variables/global";
import { trackPromise } from "react-promise-tracker";
import { useAxios } from "../../utils/hooks/useAxios";
import { FORGOT_PASSWORD_INITIAL_VALUE } from "../../variables/initial/forgotpassword";
import Modal from "../../components/Modal";
import {
  handleErrorMessage,
  handleOpenModal,
} from "../../utils/functions/global";
import { cookies } from "../../config/cookie";

export default function ForgotPassword(props) {
  // HOOKS //
  const loginService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postForgotPWData, setPostForgotPWData] = useState(
    FORGOT_PASSWORD_INITIAL_VALUE
  );
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // FUNCTIONS SPECIFIC //
  function handleTextChange(field, event) {
    const temp = { ...postForgotPWData };
    temp[field] = event.target.value;
    setPostForgotPWData(temp);
  }

  function handleForgotPWRequest(callback) {
    trackPromise(
      loginService
        .postData({
          endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
          url: URL_POST_FORGOT_PW,
          data: postForgotPWData,
        })
        .then((result) => {
          cookies.set(
            CLIENT_USER_INFO,
            result.responseData,
            { path: "/" }
          );
          callback();
        })
        .catch((error) => {
          setSuccess(false);
          return handleErrorMessage(
            error,
            setErrorMessage,
            setModalToggle,
            modalToggle
          );
        })
    );
  }

  function handleOpenLogin() {
    props.handleOpen(LOGIN);
  }

  function handleAfterSubmitEmail() {
    setSuccess(true);
    handleOpenModal(setModalToggle, modalToggle);
  }

  // COMPONENTS SPECIFIC //

  const ShowErrorTitle = () => {
    return (
      <h3 className="margin-top-0 margin-bottom-12-18">
        There is an <span className="red-color">ERROR</span>
      </h3>
    );
  };

  const ShowSuccessTitle = () => {
    return (
      <h3 className="margin-top-0 margin-bottom-12-18">
        <span className="main-color">Berhasil</span>
        &nbsp;mengirim recovery email
      </h3>
    );
  };

  const ShowModal = () => {
    const ShowTitle = () => {
      if (success) return <ShowSuccessTitle />;
      else return <ShowErrorTitle />;
    };

    return (
      <div className="forgot-password-modal-container dark-bg-color">
        <div className="forgot-password-modal-wrapper">
          <Button
            onClick={() =>
              handleOpenModal(setModalToggle, modalToggle)
            }
            className="align-self-end forgot-password-button red-bg-color">
            <h4 className="forgot-password-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <ShowTitle />
          <div className="breakline" />
          <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
            {success
              ? "Kami sudah berhasil kirimin kamu recovery email ke kamu, tolong dicek ya"
              : errorMessage}
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
        toggle={props.toggle === FORGOT_PASSWORD}>
        <div className="sticky-top">
          <ShowNavbar>
            <img
              onClick={() => {
                props.handleOpen(NO_STRING);
              }}
              className="navbar-mobile-hamburger-image navbar-mobile-hamburger-image-xmark"
              src={XMark}
              alt="ic_hamburger"
            />
          </ShowNavbar>
          <div className="forgot-password-container">
            <div className="forgot-password-wrapper">
              <h3 className="margin-bottom-12-18">
                <span className="main-color">Lupa</span>{" "}
                Kata Sandi Kamu ?
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Jangan khawatir, kita bakal kirimin kamu
                email recovery
              </label>
              <div className="forgot-password-textinput-box">
                <label className="forgot-password-input-title">
                  Email
                </label>
                <TextInput
                  value={postForgotPWData.email}
                  onChange={(e) =>
                    handleTextChange("email", e)
                  }
                  type="text"
                  className="forgot-password-textinput text-align-center"
                />
              </div>
              <div className="breakline" />
              <label
                onClick={() => handleOpenLogin()}
                className="forgot-password-forgot-pass main-color cursor-pointer">
                Gak jadi deh, aku ingat kata sandiku
              </label>
              <Button
                onClick={() =>
                  handleForgotPWRequest(() =>
                    handleAfterSubmitEmail()
                  )
                }
                className="forgot-password-button">
                <p className="forgot-password-button-text">
                  Kirim Email
                </p>
              </Button>
            </div>
          </div>
          <Footer isOverriding={true} />
        </div>
      </OverridingContainer>
    </Fragment>
  );
}
