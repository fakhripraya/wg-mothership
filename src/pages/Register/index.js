import React, { Fragment, useState } from "react";
import "./style.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import GoogleIcon from "../../assets/svg/google.svg";
import OverridingContainer from "../../components/OverridingContainer";
import { ShowNavbar } from "../../components/Global";
import Footer from "../../components/Footer";
import XMark from "../../assets/svg/xmark-solid.svg";
import {
  NO_STRING,
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  URL_POST_REGISTER,
  URL_POST_LOGIN,
  OTP_PAGE,
  CLIENT_USER_INFO,
} from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import { REGISTER_DATA_INITIAL_VALUE } from "../../variables/initial/register";
import { trackPromise } from "react-promise-tracker";
import Modal from "../../components/Modal";
import { ERROR_CONFIRM_PASSWORD } from "../../variables/errorMessages/register";
import {
  handleErrorMessage,
  handleOpenModal,
} from "../../utils/functions/global";
import { cookies } from "../../config/cookie";
import { handlePostGoogleAuth } from "../../utils/functions/credentials";

export default function Register(props) {
  // HOOKS //
  const credentialService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postRegisterData, setPostRegisterData] = useState(
    REGISTER_DATA_INITIAL_VALUE
  );
  const [errorMessage, setErrorMessage] = useState(null);

  // FUNCTIONS SPECIFIC //
  function handleTextChange(field, event) {
    const temp = { ...postRegisterData };
    temp[field] = event.target.value;
    setPostRegisterData(temp);
  }

  function handleLocalFilter() {
    let result = {
      error: false,
      cb: null,
    };
    if (
      postRegisterData.confirmPassword !==
      postRegisterData.password
    ) {
      result.error = true;
      result.cb = () =>
        handleErrorMessage(
          ERROR_CONFIRM_PASSWORD,
          setErrorMessage,
          setModalToggle,
          modalToggle
        );
      return result;
    }
    return result;
  }

  function handleAfterRegister(data, callback) {
    trackPromise(
      credentialService
        .postData({
          endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
          url: URL_POST_LOGIN,
          data: data,
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

  function handlePostRegister() {
    var result = handleLocalFilter();
    if (result.error) return result.cb();
    trackPromise(
      credentialService
        .postData({
          endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
          url: URL_POST_REGISTER,
          data: postRegisterData,
        })
        .then(() => {
          return handleAfterRegister(
            {
              username: postRegisterData.username,
              password: postRegisterData.password,
            },
            () => {
              props.handleOpen(OTP_PAGE);
            }
          );
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

  function handleOpenLogin() {
    props.handleOpen(LOGIN);
  }

  // COMPONENTS SPECIFIC //
  const ShowModal = () => (
    <div className="register-modal-container dark-bg-color">
      <div className="register-modal-wrapper">
        <Button
          onClick={() =>
            handleOpenModal(setModalToggle, modalToggle)
          }
          className="align-self-end register-button red-bg-color">
          <h4 className="register-button-text">X</h4>
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
      <OverridingContainer
        toggle={props.toggle === REGISTER}>
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
          <div className="register-container">
            <div className="register-wrapper">
              <h3 className="margin-bottom-12-18">
                <span className="main-color">
                  Bergabung
                </span>
                &nbsp;Bersama Kami Dan Jadi Member !
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Dapatkan keuntungan maksimum dengan
                bergabung bersama kami, biar kita bisa
                ngobrol bareng !
              </label>
              <div className="register-textinput-box">
                <label className="register-input-title">
                  ID
                </label>
                <TextInput
                  value={postRegisterData.username}
                  onChange={(e) =>
                    handleTextChange("username", e)
                  }
                  type="text"
                  className="register-textinput text-align-center"
                />
              </div>
              <div className="register-textinput-box">
                <label className="register-input-title">
                  Email
                </label>
                <TextInput
                  value={postRegisterData.email}
                  onChange={(e) =>
                    handleTextChange("email", e)
                  }
                  type="text"
                  className="register-textinput text-align-center"
                />
              </div>
              <div className="register-textinput-box">
                <label className="register-input-title">
                  Sandi
                </label>
                <TextInput
                  value={postRegisterData.password}
                  onChange={(e) =>
                    handleTextChange("password", e)
                  }
                  type="password"
                  className="register-textinput text-align-center"
                />
              </div>
              <div className="register-textinput-box">
                <label className="register-input-title">
                  Konfirmasi
                </label>
                <TextInput
                  value={postRegisterData.confirmPassword}
                  onChange={(e) =>
                    handleTextChange("confirmPassword", e)
                  }
                  type="password"
                  className="register-textinput text-align-center"
                />
              </div>
              <div className="breakline" />
              <label
                onClick={() => handleOpenForgotPassword()}
                className="register-forgot-pass main-color cursor-pointer">
                Lupa kata sandi ?
              </label>
              <Button
                onClick={() => handlePostRegister()}
                className="register-button">
                <p className="register-button-text">
                  Daftar
                </p>
              </Button>
              <div className="breakline" />
              <div className="breakline" />
              <label className="register-middle-text">
                atau lanjut dengan
              </label>
              <div className="register-open-auths">
                <Button
                  onClick={() =>
                    handlePostGoogleAuth(credentialService)
                  }
                  className="register-open-auths-button light-bg-color">
                  <img
                    src={GoogleIcon}
                    alt={"google-icon"}
                  />
                </Button>
              </div>
              <div className="breakline" />
              <div className="breakline" />
              <label className="register-middle-text">
                Sudah punya akun ?&nbsp;
                <span
                  onClick={() => handleOpenLogin()}
                  className="main-color cursor-pointer">
                  Login sekarang
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
