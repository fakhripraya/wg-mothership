import React from 'react';
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
    EMPTY,
    FORGOT_PASSWORD,
    LOGIN,
    REGISTER
} from '../../variables/global';

export default function Login(props) {

    // FUNCTIONS SPECIFIC //
    function handleOpenForgotPassword() {
        props.handleOpen(FORGOT_PASSWORD);
    }

    function handleOpenRegister() {
        props.handleOpen(REGISTER);
    }

    return (
        <OverridingContainer toggle={props.toggle === LOGIN}>
            <div className="sticky-top">
                <ShowNavbar>
                    <img onClick={() => { props.handleOpen(EMPTY) }} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                </ShowNavbar>
                <div className="login-container">
                    <div className="login-wrapper">
                        <h2 className="margin-bottom-12-18">Sign in to access</h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">Start Rentaling Your Device Now, What Are You Waiting For ?</h3>
                        <div className="login-textinput-box">
                            <h3 className="login-input-title">ID</h3>
                            <TextInput type="text" className="login-textinput text-align-center">

                            </TextInput>
                        </div>
                        <div className="login-textinput-box">
                            <h3 className="login-input-title">Pass</h3>
                            <TextInput type="password" className="login-textinput text-align-center">

                            </TextInput>
                        </div>
                        <h3 onClick={() => handleOpenForgotPassword()} className="login-forgot-pass link-color cursor-pointer">Forgot your password</h3>
                        <Button className="login-button dark-bg-color">
                            <h2 className="login-button-text">Sign In</h2>
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
    )
}
