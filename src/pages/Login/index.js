import React, { Fragment, useState } from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import GoogleIcon from '../../assets/svg/google.svg';
import FacebookIcon from '../../assets/svg/facebook-f.svg';
import OverridingContainer from '../../components/OveriddingContainer';
import Footer from '../../components/Footer';
import { ShowNavbar } from '../../components/Global';
import XMark from '../../assets/svg/xmark-solid.svg';
import {
    NO_STRING,
    FORGOT_PASSWORD,
    LOGIN,
    REGISTER,
    URL_POST_LOGIN,
    OTP_PAGE,
    CLIENT_USER_INFO
} from '../../variables/global';
import Cookies from 'universal-cookie';
import { trackPromise } from 'react-promise-tracker';
import { useAxios } from '../../utils/hooks/useAxios';
import { postLoginDataInitialValue } from '../../variables/dummy/login';
import Modal from '../../components/Modal';

export default function Login(props) {

    // OBJECT CLASSES
    const cookies = new Cookies();

    // HOOKS //
    const postCredentialService = useAxios();
    const [modalToggle, setModalToggle] = useState(false);
    const [postLoginData, setPostLoginData] = useState(postLoginDataInitialValue);
    const [errorMessage, setErrorMessage] = useState(null);

    // FUNCTIONS SPECIFIC //
    function handleTextChange(field, event) {
        const temp = { ...postLoginData }
        temp[field] = event.target.value;
        setPostLoginData(temp);
    }

    function handleLoginRequest(callback) {
        trackPromise(
            postCredentialService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                url: URL_POST_LOGIN,
                data: postLoginData
            }).then((result) => {
                cookies.set(CLIENT_USER_INFO, result.responseData, { path: '/' });
                callback();
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

    function handleOpenForgotPassword() {
        props.handleOpen(FORGOT_PASSWORD);
    }

    function handleOpenRegister() {
        props.handleOpen(REGISTER);
    }

    // COMPONENTS SPECIFIC //
    const ShowUploadModal = () => {
        return <div className="login-modal-container dark-bg-color">
            <div className="login-modal-wrapper">
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
            <OverridingContainer toggle={props.toggle === LOGIN}>
                <div className="sticky-top">
                    <ShowNavbar>
                        <img onClick={() => props.handleOpen(NO_STRING)} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                    </ShowNavbar>
                    <div className="login-container">
                        <div className="login-wrapper">
                            <h2 className="margin-bottom-12-18">Sign In To Access</h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">Start rentaling your device now, what are you waiting for ?</h3>
                            <div className="login-textinput-box">
                                <label className="login-input-title">ID</label>
                                <TextInput value={postLoginData.username} onChange={(e) => handleTextChange("username", e)} type="text" className="login-textinput text-align-center" />
                            </div>
                            <div className="login-textinput-box">
                                <label className="login-input-title">Pass</label>
                                <TextInput value={postLoginData.password} onChange={(e) => handleTextChange("password", e)} type="password" className="login-textinput text-align-center" />
                            </div>
                            <h3 onClick={() => handleOpenForgotPassword()} className="login-forgot-pass link-color cursor-pointer">Forgot your password</h3>
                            <Button onClick={() => handleLoginRequest(() => {
                                props.handleOpen(OTP_PAGE);
                            })} className="login-button dark-bg-color">
                                <h3 className="login-button-text">Sign In</h3>
                            </Button>
                            <br></br>
                            <h3 className="login-middle-text">Or continue with</h3>
                            <div className="login-open-auths">
                                <Button className="login-open-auths-button light-bg-color">
                                    <img src={GoogleIcon} alt={"google-icon"} />
                                </Button>
                                <Button className="login-open-auths-button light-bg-color">
                                    <img src={FacebookIcon} alt={"facebook-icon"} />
                                </Button>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <h3 className="login-middle-text">Not a member ? <span onClick={() => handleOpenRegister()} className="link-color cursor-pointer">Sign up now</span></h3>
                        </div>
                    </div>
                    <Footer />
                </div>
            </OverridingContainer>
        </Fragment>
    )
}
