import React from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import OverridingContainer from '../../components/OveriddingContainer';
import { ShowNavbar } from '../../components/Global';
import Footer from '../../components/Footer';
import XMark from '../../assets/svg/xmark-solid.svg';
import {
    EMPTY,
    FORGOT_PASSWORD,
    LOGIN,
    OTP_PAGE
} from '../../variables/global';

export default function ForgotPassword(props) {

    // FUNCTIONS SPECIFIC //
    function handleOpenLogin() {
        props.handleOpen(LOGIN);
    }

    function handleSubmitEmail() {
        props.handleOpen(FORGOT_PASSWORD);
        props.handleOpen(OTP_PAGE);
    }

    return (
        <OverridingContainer toggle={props.toggle === FORGOT_PASSWORD}>
            <div className="sticky-top">
                <ShowNavbar>
                    <img onClick={() => { props.handleOpen(EMPTY) }} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                </ShowNavbar>
                <div className="forgot-password-container">
                    <div className="forgot-password-wrapper">
                        <h2 className="margin-bottom-12-18">Lose Your Password ?</h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">Don't Worry We Got You, Just Send Us A Recovery Email</h3>
                        <div className="forgot-password-textinput-box">
                            <h3 className="forgot-password-input-title">Email</h3>
                            <TextInput type="text" className="forgot-password-textinput text-align-center">

                            </TextInput>
                        </div>
                        <h3 onClick={() => handleOpenLogin()} className="forgot-password-forgot-pass link-color cursor-pointer">Nevermind, I remember my password now</h3>
                        <Button onClick={() => handleSubmitEmail()} className="forgot-password-button dark-bg-color">
                            <h2 className="forgot-password-button-text">Send Email</h2>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        </OverridingContainer>
    )
}
