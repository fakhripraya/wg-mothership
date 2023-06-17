import React, { Fragment, useState } from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import OverridingContainer from '../../components/OveriddingContainer';
import { ShowNavbar } from '../../components/Global';
import Footer from '../../components/Footer';
import XMark from '../../assets/svg/xmark-solid.svg';
import {
    NO_STRING,
    FORGOT_PASSWORD,
    LOGIN,
    URL_POST_FORGOT_PW
} from '../../variables/global';
import { trackPromise } from 'react-promise-tracker';
import { useAxios } from '../../utils/hooks/useAxios';
import { postForgotPWInitialValue } from '../../variables/dummy/forgotpassword';
import Modal from '../../components/Modal';
import { handleErrorMessage, handleOpenModal } from '../../utils/functions/global';

export default function ForgotPassword(props) {

    // HOOKS //
    const loginService = useAxios();
    const [modalToggle, setModalToggle] = useState(false);
    const [postForgotPWData, setPostForgotPWData] = useState(postForgotPWInitialValue);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // FUNCTIONS SPECIFIC //
    function handleTextChange(field, event) {
        const temp = { ...postForgotPWData }
        temp[field] = event.target.value;
        setPostForgotPWData(temp);
    }

    function handleForgotPWRequest(callback) {
        trackPromise(
            loginService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                url: URL_POST_FORGOT_PW,
                data: postForgotPWData
            }).then((result) => {
                callback(result);
            }).catch((error) => {
                setSuccess(false);
                return handleErrorMessage(error, setErrorMessage, setModalToggle, modalToggle);
            })
        );
    }

    function handleOpenLogin() {
        props.handleOpen(LOGIN);
    }

    function handleAfterSubmitEmail(result) {
        setSuccess(true);
        handleOpenModal(setModalToggle, modalToggle);
    }

    // COMPONENTS SPECIFIC //

    const ShowErrorTitle = () => {
        return <h3 className="margin-top-0 margin-bottom-12-18">
            There is an <span className="red-color">ERROR</span>
        </h3>
    }

    const ShowSuccessTitle = () => {
        return <h3 className="margin-top-0 margin-bottom-12-18">
            <span className="main-color">Successfully</span> sent a mail to your email
        </h3>
    }

    const ShowModal = () => {

        const ShowTitle = () => {
            if (success) return <ShowSuccessTitle />
            else return <ShowErrorTitle />
        }

        return <div className="forgot-password-modal-container dark-bg-color">
            <div className="forgot-password-modal-wrapper">
                <Button onClick={() => handleOpenModal(setModalToggle, modalToggle)} className="align-self-end forgot-password-button red-bg-color">
                    <h4 className="forgot-password-button-text">X</h4>
                </Button>
                <br />
                <ShowTitle />
                <br />
                <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
                    {success ? "Password recovery email has been sent" : errorMessage}
                </label>
            </div>
        </div>
    }

    return (
        <Fragment>
            <Modal className="dark-bg-color" clicked={() => handleOpenModal(setModalToggle, modalToggle)} toggle={modalToggle} >
                <ShowModal />
            </Modal>
            <OverridingContainer toggle={props.toggle === FORGOT_PASSWORD}>
                <div className="sticky-top">
                    <ShowNavbar>
                        <img onClick={() => { props.handleOpen(NO_STRING) }} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                    </ShowNavbar>
                    <div className="forgot-password-container">
                        <div className="forgot-password-wrapper">
                            <h2 className="margin-bottom-12-18">Lose Your Password ?</h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">Don't worry we got you, we will send you a password recovery email</h3>
                            <div className="forgot-password-textinput-box">
                                <label className="forgot-password-input-title">Email</label>
                                <TextInput value={postForgotPWData.email} onChange={(e) => handleTextChange("email", e)} type="text" className="forgot-password-textinput text-align-center" />
                            </div>
                            <h3 onClick={() => handleOpenLogin()} className="forgot-password-forgot-pass link-color cursor-pointer">Nevermind, I remember my password now</h3>
                            <Button onClick={() => handleForgotPWRequest((result) => handleAfterSubmitEmail(result))} className="forgot-password-button dark-bg-color">
                                <h3 className="forgot-password-button-text">Send Email</h3>
                            </Button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </OverridingContainer>
        </Fragment>
    )
}
