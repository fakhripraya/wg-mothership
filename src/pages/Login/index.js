import React, { Fragment, useState } from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import GoogleIcon from "../../assets/svg/google.svg";
import OverridingContainer from "../../components/OverridingContainer";
import Footer from "../../components/Footer";
import { ShowNavbar } from "../../components/Global";
import XMark from "../../assets/svg/xmark-solid.svg";
import {
  NO_STRING,
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  URL_POST_LOGIN,
  OTP_PAGE,
  CLIENT_USER_INFO,
} from "../../variables/global";
import { trackPromise } from "react-promise-tracker";
import { useAxios } from "../../utils/hooks/useAxios";
import { LOGIN_DATA_INITIAL_VALUE } from "../../variables/initial/login";
import Modal from "../../components/Modal";
import {
  handleErrorMessage,
  handleOpenModal,
} from "../../utils/functions/global";
import { handlePostGoogleAuth } from "../../utils/functions/credentials";
import { cookies } from "../../config/cookie";

export default function Login(props) {
  // HOOKS //
  const credentialService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postLoginData, setPostLoginData] = useState(
    LOGIN_DATA_INITIAL_VALUE
  );
  const [errorMessage, setErrorMessage] = useState(null);

  // FUNCTIONS SPECIFIC //
  function handleTextChange(field, event) {
    const temp = { ...postLoginData };
    temp[field] = event.target.value;
    setPostLoginData(temp);
  }

  function handleLoginRequest(callback) {
    trackPromise(
      credentialService
        .postData({
          endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
          url: URL_POST_LOGIN,
          data: postLoginData,
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
          return handleErrorMessage(
            error,
            setErrorMessage,
            setModalToggle,
            modalToggle
          );
        })
    );
  }

  function handleOpenForgotPassword() {
    props.handleOpen(FORGOT_PASSWORD);
  }

  function handleOpenRegister() {
    props.handleOpen(REGISTER);
  }

  // COMPONENTS SPECIFIC //
  const ShowModal = () => (
    <div className="login-modal-container dark-bg-color">
      <div className="login-modal-wrapper">
        <Button
          onClick={() =>
            handleOpenModal(setModalToggle, modalToggle)
          }
          className="align-self-end login-button red-bg-color">
          <h4 className="login-button-text">X</h4>
        </Button>
        <div className="breakline" />
        <h3 className="margin-top-0 margin-bottom-12-18">
          There is an{" "}
          <span className="red-color">ERROR</span>
        </h3>
        <div className="breakline" />
        <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
          {errorMessage}
        </label>
      </div>
    </div>
  );

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
      <OverridingContainer toggle={props.toggle === LOGIN}>
        <div className="sticky-top">
          <ShowNavbar>
            <img
              onClick={() => props.handleOpen(NO_STRING)}
              className="navbar-mobile-hamburger-image navbar-mobile-hamburger-image-xmark"
              src={XMark}
              alt="ic_hamburger"
            />
          </ShowNavbar>
          <div className="login-container">
            <div className="login-wrapper">
              <h3 className="margin-bottom-12-18">
                <span className="main-color">Login</span>{" "}
                Untuk Mengakses
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Mulai bisnis dan komunitasmu sekarang,
                tunggu apa lagi?
              </label>
              <div className="login-textinput-box">
                <label className="login-input-title">
                  ID
                </label>
                <TextInput
                  value={postLoginData.username}
                  onChange={(e) =>
                    handleTextChange("username", e)
                  }
                  type="text"
                  className="login-textinput text-align-center"
                />
              </div>
              <div className="login-textinput-box">
                <label className="login-input-title">
                  Sandi
                </label>
                <TextInput
                  value={postLoginData.password}
                  onChange={(e) =>
                    handleTextChange("password", e)
                  }
                  type="password"
                  className="login-textinput text-align-center"
                />
              </div>
              <div className="breakline" />
              <label
                onClick={() => handleOpenForgotPassword()}
                className="login-forgot-pass main-color cursor-pointer">
                Lupa kata sandi ?
              </label>
              <Button
                onClick={() =>
                  handleLoginRequest(() => {
                    props.handleOpen(OTP_PAGE);
                  })
                }
                className="login-button">
                <p className="login-button-text">Login</p>
              </Button>
              <div className="breakline" />
              <div className="breakline" />
              <label className="login-middle-text">
                Atau lanjut dengan
              </label>
              <div className="login-open-auths">
                <Button
                  onClick={() =>
                    handlePostGoogleAuth(credentialService)
                  }
                  className="login-open-auths-button light-bg-color">
                  <img
                    src={GoogleIcon}
                    alt={"google-icon"}
                  />
                </Button>
              </div>
              <div className="breakline" />
              <div className="breakline" />
              <label className="login-middle-text">
                Belum jadi member ?{" "}
                <span
                  onClick={() => handleOpenRegister()}
                  className="main-color cursor-pointer">
                  Daftar akun Sekarang
                </span>
              </label>
            </div>
          </div>
          <Footer isOverriding={true} />
        </div>
      </OverridingContainer>
    </Fragment>
  );
}
