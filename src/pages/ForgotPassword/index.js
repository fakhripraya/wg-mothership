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
    OTP_PAGE,
    URL_POST_FORGOT_PW
} from '../../variables/global';
import { trackPromise } from 'react-promise-tracker';
import { useAxios } from '../../utils/hooks/useAxios';
import { postForgotPWInitialValue } from '../../variables/dummy/forgotpassword';
import Modal from '../../components/Modal';

export default function ForgotPassword(props) {

    // HOOKS //
    const postLoginService = useAxios();
    const [modalToggle, setModalToggle] = useState(false);
    const [postForgotPWData, setPostForgotPWData] = useState(postForgotPWInitialValue);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // FUNCTIONS SPECIFIC //
    function handleTextChange(field, event) {
        const temp = { ...postForgotPWData }
        temp[field] = event.target.value;
        setPostForgotPWData(temp);
    }

    function handleForgotPWRequest(callback) {
        trackPromise(
            postLoginService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                url: URL_POST_FORGOT_PW,
                data: postForgotPWData
            }).then((result) => {
                callback(result);
            }).catch((error) => {
                return handleErrorMessage(error);
            })
        );
    }

    function handleOpenModal() {
        setModalToggle(!modalToggle);
    }

    function handleErrorMessage(error) {
        setErrorMessage(JSON.stringify(error.errorContent));
        setSuccess(false);
        handleOpenModal();
    }

    function handleOpenLogin() {
        props.handleOpen(LOGIN);
    }

    function handleAfterSubmitEmail(result) {
        setSuccessMessage(JSON.stringify(result.responseData));
        setSuccess(true);
        handleOpenModal();
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
        return <div className="login-upload-container dark-bg-color">
            <div className="login-upload-wrapper">
                <Button onClick={() => handleOpenModal()} className="align-self-end login-button red-bg-color">
                    <h4 className="login-button-text">X</h4>
                </Button>
                <br />
                {success ? <ShowSuccessTitle/> : <ShowErrorTitle/>}
                <br />
                <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
                {success ? successMessage : errorMessage}
                </label>
            </div>
        </div>
    }

    return (
        <Fragment>
            <Modal className="dark-bg-color" toggle={modalToggle} >
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
                            <h3 className="margin-top-0 margin-bottom-12-18">Don't Worry We Got You, Just Send Us A Recovery Email</h3>
                            <div className="forgot-password-textinput-box">
                                <label className="forgot-password-input-title">Email</label>
                                <TextInput value={postForgotPWData.email} onChange={(e) => handleTextChange("email", e)}  type="text" className="forgot-password-textinput text-align-center" />
                            </div>
                            <h3 onClick={() => handleOpenLogin()} className="forgot-password-forgot-pass link-color cursor-pointer">Nevermind, I remember my password now</h3>
                            <Button onClick={() => handleForgotPWRequest((result)=> handleAfterSubmitEmail(result))} className="forgot-password-button dark-bg-color">
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
