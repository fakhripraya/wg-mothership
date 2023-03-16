import React, { Fragment, useState } from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import GoogleIcon from '../../assets/svg/google.svg';
import FacebookIcon from '../../assets/svg/facebook-f.svg';
import OverridingContainer from '../../components/OveriddingContainer';
import { ShowNavbar } from '../../components/Global';
import Footer from '../../components/Footer';
import XMark from '../../assets/svg/xmark-solid.svg';
import {
    NO_STRING,
    FORGOT_PASSWORD,
    LOGIN,
    REGISTER,
    URL_POST_REGISTER
} from '../../variables/global';
import { useAxios } from '../../utils/hooks/useAxios';
import { postRegisterDataInitialValue } from '../../variables/dummy/register';
import { trackPromise } from 'react-promise-tracker';
import Modal from '../../components/Modal';
import { ERROR_CONFIRM_PASSWORD } from '../../variables/errorMessages/register';

export default function Register(props) {

    // HOOKS //
    const postRegisterService = useAxios();
    const [modalToggle, setModalToggle] = useState(false);
    const [postRegisterData, setPostRegisterData] = useState(postRegisterDataInitialValue);
    const [errorMessage, setErrorMessage] = useState(null);

    // FUNCTIONS SPECIFIC //
    function handleTextChange(field, event) {
        const temp = { ...postRegisterData }
        temp[field] = event.target.value;
        setPostRegisterData(temp);
    }

    function handleLocalFilter() {
        let result = {
            error: false,
            cb: null
        }
        if (postRegisterData.confirmPassword !== postRegisterData.password) {
            result.error = true;
            result.cb = () => handleErrorMessage(ERROR_CONFIRM_PASSWORD);
            return result;
        }
        return result;
    }

    function handlePostRegister() {
        var result = handleLocalFilter();
        if (result.error) return result.cb();

        trackPromise(
            postRegisterService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                url: URL_POST_REGISTER,
                data: postRegisterData
            }).then((result) => {
                console.log(result)
            }).catch((error) => {
                return handleErrorMessage(error);
            })
        );
    }

    function handleOpenModal() {
        setModalToggle(!modalToggle);
    }

    function handleErrorMessage(error) {
        setErrorMessage(error.errorContent)
        handleOpenModal();
    }

    function handleOpenForgotPassword() {
        props.handleOpen(FORGOT_PASSWORD);
    }

    function handleOpenLogin() {
        props.handleOpen(LOGIN);
    }

    // COMPONENTS SPECIFIC //
    const ShowUploadModal = () => {
        return <div className="register-upload-container dark-bg-color">
            <div className="register-upload-wrapper">
                <Button onClick={() => handleOpenModal()} className="align-self-end register-button red-bg-color">
                    <h4 className="register-button-text">X</h4>
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
                <ShowUploadModal />
            </Modal>
            <OverridingContainer toggle={props.toggle === REGISTER}>
                <div className="sticky-top">
                    <ShowNavbar>
                        <img onClick={() => { props.handleOpen(NO_STRING) }} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                    </ShowNavbar>
                    <div className="register-container">
                        <div className="register-wrapper">
                            <h2 className="margin-bottom-12-18">Join To Become A Member</h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">Gain maximum profitability by rentaling your device to others virtually or physically</h3>
                            <div className="register-textinput-box">
                                <label className="register-input-title">ID</label>
                                <TextInput value={postRegisterData.username} onChange={(e) => handleTextChange("username", e)} type="text" className="register-textinput text-align-center" />
                            </div>
                            <div className="register-textinput-box">
                                <label className="register-input-title">Email</label>
                                <TextInput value={postRegisterData.email} onChange={(e) => handleTextChange("email", e)} type="text" className="register-textinput text-align-center" />
                            </div>
                            <div className="register-textinput-box">
                                <label className="register-input-title">Pass</label>
                                <TextInput value={postRegisterData.password} onChange={(e) => handleTextChange("password", e)} type="password" className="register-textinput text-align-center" />
                            </div>
                            <div className="register-textinput-box">
                                <label className="register-input-title">Confirm</label>
                                <TextInput value={postRegisterData.confirmPassword} onChange={(e) => handleTextChange("confirmPassword", e)} type="password" className="register-textinput text-align-center" />
                            </div>
                            <h3 onClick={() => handleOpenForgotPassword()} className="register-forgot-pass link-color cursor-pointer">Forgot your password</h3>
                            <Button onClick={() => handlePostRegister()} className="register-button dark-bg-color">
                                <h3 className="register-button-text">Sign Up</h3>
                            </Button>
                            <br></br>
                            <h3 className="register-middle-text">Or continue with</h3>
                            <div className="register-open-auths">
                                <Button className="register-open-auths-button light-bg-color">
                                    <img src={GoogleIcon} alt={"google-icon"} />
                                </Button>
                                <Button className="register-open-auths-button light-bg-color">
                                    <img src={FacebookIcon} alt={"facebook-icon"} />
                                </Button>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <h3 className="register-middle-text">Already have an account ? <span onClick={() => handleOpenLogin()} className="link-color cursor-pointer">Sign in now</span></h3>
                        </div>
                    </div>
                    <Footer />
                </div>
            </OverridingContainer>
        </Fragment>
    )
}
