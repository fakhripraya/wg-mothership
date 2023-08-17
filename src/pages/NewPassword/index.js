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
  LOGIN,
  NEW_PASSWORD,
  URL_POST_NEW_PW,
} from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import { trackPromise } from "react-promise-tracker";
import { postNewPWInitialValue } from "../../variables/initial/newpassword";
import Modal from "../../components/Modal";
import {
  handleErrorMessage,
  handleOpenModal,
} from "../../utils/functions/global";
import { useSearchParams } from "react-router-dom";

export default function NewPassword(props) {
  // HOOKS //
  const credentialService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [postNewPWData, setPostNewPWData] = useState(
    postNewPWInitialValue
  );
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  // FUNCTIONS SPECIFIC //
  function handleTextChange(field, event) {
    const temp = { ...postNewPWData };
    temp[field] = event.target.value;
    setPostNewPWData(temp);
  }

  function handleNewPWRequest(callback) {
    const recoveryToken = searchParams.get("recoveryToken");
    if (recoveryToken) {
      trackPromise(
        credentialService
          .postData({
            endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
            url: URL_POST_NEW_PW,
            data: {
              recoveryToken: recoveryToken,
              ...postNewPWData,
            },
          })
          .then(() => {
            callback();
          })
          .catch((error) => {
            handleErrorMessage(
              error,
              setErrorMessage,
              setModalToggle,
              modalToggle
            );
          })
      );
    }
  }

  function handleOpenLogin() {
    props.handleOpen(LOGIN);
  }

  // COMPONENTS SPECIFIC //
  const ShowModal = () => {
    return (
      <div className="new-password-modal-container dark-bg-color">
        <div className="new-password-modal-wrapper">
          <Button
            onClick={() =>
              handleOpenModal(setModalToggle, modalToggle)
            }
            className="align-self-end new-password-button red-bg-color">
            <h4 className="new-password-button-text">X</h4>
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
      <OverridingContainer
        toggle={props.toggle === NEW_PASSWORD}>
        <div className="sticky-top">
          <ShowNavbar>
            <img
              onClick={() => {
                props.handleOpen(NO_STRING);
              }}
              className="navbar-mobile-hamburger-image"
              src={XMark}
              alt="ic_hamburger"
            />
          </ShowNavbar>
          <div className="new-password-container">
            <div className="new-password-wrapper">
              <h2 className="margin-bottom-12-18">
                Ternyata beneran kamu ! Nice !!
              </h2>
              <h3 className="margin-top-0 margin-bottom-12-18">
                Nicely done bro, sekarang tinggal input
                password barumu aja
              </h3>
              <div className="new-password-textinput-box">
                <label className="new-password-input-title">
                  New Pass
                </label>
                <TextInput
                  value={postNewPWData.newPassword}
                  onChange={(e) =>
                    handleTextChange("newPassword", e)
                  }
                  type="password"
                  className="new-password-textinput text-align-center"
                />
              </div>
              <div className="new-password-textinput-box">
                <label className="new-password-input-title">
                  Confirm
                </label>
                <TextInput
                  value={postNewPWData.confirmPassword}
                  onChange={(e) =>
                    handleTextChange("confirmPassword", e)
                  }
                  type="password"
                  className="new-password-textinput text-align-center"
                />
              </div>
              <h3
                onClick={() => handleOpenLogin()}
                className="new-password-forgot-pass link-color cursor-pointer">
                Gak jadi deh, aku ingat passwordku
              </h3>
              <Button
                onClick={() =>
                  handleNewPWRequest(() =>
                    handleOpenLogin()
                  )
                }
                className="new-password-button dark-bg-color">
                <h3 className="new-password-button-text">
                  Submit
                </h3>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </OverridingContainer>
    </Fragment>
  );
}
