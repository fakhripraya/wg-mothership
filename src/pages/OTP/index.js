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
    OTP_PAGE,
    URL_POST_OTP,
    CLIENT_USER_INFO
} from '../../variables/global';
import Cookies from 'universal-cookie';
import { useAxios } from '../../utils/hooks/useAxios';
import Modal from '../../components/Modal';
import { postOTPDataInitialValue } from '../../variables/dummy/otp';
import { trackPromise } from 'react-promise-tracker';

export default function OTP(props) {

    // OBJECT CLASSES
    const cookies = new Cookies();
    const userInfo = cookies.get(CLIENT_USER_INFO);
    if (userInfo) postOTPDataInitialValue.credentialToken = cookies.get(CLIENT_USER_INFO).credentialToken;

    // HOOKS //
    const postCredentialService = useAxios();
    const [modalToggle, setModalToggle] = useState(false);
    const [postOTPData, setPostOTPData] = useState(postOTPDataInitialValue);
    const [errorMessage, setErrorMessage] = useState(null);

    // FUNCTIONS SPECIFIC //
    function handleTextChange(field, event) {
        const temp = { ...postOTPData }
        temp[field] = event.target.value;
        setPostOTPData(temp);
    }

    function handleSubmitOTP() {
        if (!userInfo) return;
        if (!postOTPDataInitialValue.credentialToken) return;
        trackPromise(
            postCredentialService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                headers: { "authorization": `Bearer ${postOTPDataInitialValue.credentialToken.accessToken}` },
                url: URL_POST_OTP,
                data: postOTPData,
            }).then((result) => {
                cookies.set(CLIENT_USER_INFO, result.responseData, { path: '/' });
                props.handleOpen(NO_STRING);
            }).catch((error) => {
                return handleErrorMessage(error);
            })
        );
    }

    function handleOpenModal() {
        setModalToggle(!modalToggle);
    }

    function handleErrorMessage(error) {
        if (typeof error.errorContent !== 'string') setErrorMessage(JSON.stringify(error.errorContent));
        else setErrorMessage(error.errorContent);
        handleOpenModal();
    }

    // COMPONENTS SPECIFIC //
    const ShowUploadModal = () => {
        return <div className="otp-modal-container dark-bg-color">
            <div className="otp-modal-wrapper">
                <Button onClick={() => handleOpenModal()} className="align-self-end login-button red-bg-color">
                    <h4 className="login-button-text">X</h4>
                </Button>
                <br />
                <h3 className="margin-top-0 margin-bottom-12-18">
                    There is an <span className="red-color">ERROR</span>
                </h3>
                <br />
                <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
                    {errorMessage}
                </label>
            </div>
        </div>
    }

    return (
        <Fragment>
            <Modal className="dark-bg-color" toggle={modalToggle} >
                <ShowModal />
            </Modal>
            <OverridingContainer toggle={props.toggle === OTP_PAGE}>
                <div className="sticky-top">
                    <ShowNavbar>
                        <img onClick={() => props.handleOpen(NO_STRING)} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                    </ShowNavbar>
                    <div className="otp-container">
                        <div className="otp-wrapper">
                            <h2 className="margin-bottom-12-18">Input The OTP Code</h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">We've sent an OTP code to your email, put it here so we can make sure it is you !</h3>
                            <div className="otp-textinput-box">
                                <label className="otp-input-title">OTP</label>
                                <TextInput value={postOTPData.OTPInput} onChange={(e) => handleTextChange("OTPInput", e)} maxLength="6" type="password" className="otp-textinput text-align-center" />
                            </div>
                            <Button onClick={() => handleSubmitOTP()} className="otp-button dark-bg-color">
                                <h3 className="otp-button-text">Submit</h3>
                            </Button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </OverridingContainer>
        </Fragment>
    )
}
