import React from 'react';
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
    REGISTER
} from '../../variables/global';

export default function Register(props) {

    // FUNCTIONS SPECIFIC //
    function handleOpenForgotPassword() {
        props.handleOpen(FORGOT_PASSWORD);
    }

    function handleOpenLogin() {
        props.handleOpen(LOGIN);
    }

    return (
        <OverridingContainer toggle={props.toggle === REGISTER}>
            <div className="sticky-top">
                <ShowNavbar>
                    <img onClick={() => { props.handleOpen(NO_STRING) }} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                </ShowNavbar>
                <div className="register-container">
                    <div className="register-wrapper">
                        <h2 className="margin-bottom-12-18">Join To Become A Member</h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">Gain Maximum Profitability By Rentaling Your Device To Others Virtually Or Physically</h3>
                        <div className="register-textinput-box">
                            <h3 className="register-input-title">ID</h3>
                            <TextInput type="text" className="register-textinput text-align-center" />
                        </div>
                        <div className="register-textinput-box">
                            <h3 className="register-input-title">Email</h3>
                            <TextInput type="text" className="register-textinput text-align-center" />
                        </div>
                        <div className="register-textinput-box">
                            <h3 className="register-input-title">Pass</h3>
                            <TextInput type="password" className="register-textinput text-align-center" />
                        </div>
                        <div className="register-textinput-box">
                            <h3 className="register-input-title">Confirm</h3>
                            <TextInput type="password" className="register-textinput text-align-center" />
                        </div>
                        <h3 onClick={() => handleOpenForgotPassword()} className="register-forgot-pass link-color cursor-pointer">Forgot your password</h3>
                        <Button className="register-button dark-bg-color">
                            <h2 className="register-button-text">Sign Up</h2>
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
    )
}
