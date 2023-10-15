import React, { Fragment, useState } from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import GoogleIcon from "../../assets/svg/google.svg";
import OverridingContainer from "../../components/OveriddingContainer";
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
import { postLoginDataInitialValue } from "../../variables/initial/login";
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
    postLoginDataInitialValue
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
  const ShowModal = () => {
    return (
      <div className="login-modal-container dark-bg-color">
        <div className="login-modal-wrapper">
          <Button
            onClick={() =>
              handleOpenModal(setModalToggle, modalToggle)
            }
            className="align-self-end login-button red-bg-color">
            <h4 className="login-button-text">X</h4>
          </Button>
          <br />
          <h3 className="margin-top-0 margin-bottom-12-18">
            There is an{" "}
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
      <OverridingContainer toggle={props.toggle === LOGIN}>
        <div className="sticky-top">
          <ShowNavbar>
            <img
              onClick={() => props.handleOpen(NO_STRING)}
              className="navbar-mobile-hamburger-image"
              src={XMark}
              alt="ic_hamburger"
            />
          </ShowNavbar>
          <div className="login-container">
            <div className="login-wrapper">
              <h2 className="margin-bottom-12-18">
                Login Untuk Mengakses
              </h2>
              <h3 className="margin-top-0 margin-bottom-12-18">
                Mulai bisnis dan komunitasmu sekarang,
                tunggu apa lagi?
              </h3>
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
                  Pass
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
              <h3
                onClick={() => handleOpenForgotPassword()}
                className="login-forgot-pass link-color cursor-pointer">
                Lupa password
              </h3>
              <Button
                onClick={() =>
                  handleLoginRequest(() => {
                    props.handleOpen(OTP_PAGE);
                  })
                }
                className="login-button dark-bg-color">
                <h3 className="login-button-text">Login</h3>
              </Button>
              <br></br>
              <h3 className="login-middle-text">
                atau lanjut dengan
              </h3>
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
              <br></br>
              <br></br>
              <br></br>
              <h3 className="login-middle-text">
                Belum jadi member ?{" "}
                <span
                  onClick={() => handleOpenRegister()}
                  className="link-color cursor-pointer">
                  Daftar akun Sekarang
                </span>
              </h3>
            </div>
          </div>
          <Footer />
        </div>
      </OverridingContainer>
    </Fragment>
  );
}
