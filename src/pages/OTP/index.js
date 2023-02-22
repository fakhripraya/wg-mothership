import React from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import OverridingContainer from '../../components/OveriddingContainer';
import { ShowNavbar } from '../../components/Global';
import Footer from '../../components/Footer';
import XMark from '../../assets/svg/xmark-solid.svg';
import {
    NO_STRING,
    LOGIN,
    NEW_PASSWORD,
    OTP_PAGE
} from '../../variables/global';

export default function OTP(props) {

    // FUNCTIONS SPECIFIC //
    function handleOpenLogin() {
        props.handleOpen(LOGIN);
    }

    function handleSubmitOTP() {
        props.handleOpen(OTP_PAGE);
        props.handleOpen(NEW_PASSWORD);
    }

    return (
        <OverridingContainer toggle={props.toggle === OTP_PAGE}>
            <div className="sticky-top">
                <ShowNavbar>
                    <img onClick={() => { props.handleOpen(NO_STRING) }} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                </ShowNavbar>
                <div className="otp-container">
                    <div className="otp-wrapper">
                        <h2 className="margin-bottom-12-18">Just Input The OTP we sent</h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">We Just Sent An OTP Code To Your Email, Put It Here So We Can Make Sure It Is You !</h3>
                        <div className="otp-textinput-box">
                            <label className="otp-input-title">OTP</label>
                            <TextInput maxLength="6" type="password" className="otp-textinput text-align-center" />
                        </div>
                        <h3 onClick={() => handleOpenLogin()} className="otp-forgot-pass link-color cursor-pointer">Nevermind, I remember my password now</h3>
                        <Button onClick={() => handleSubmitOTP()} className="otp-button dark-bg-color">
                            <h3 className="otp-button-text">Submit</h3>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        </OverridingContainer>
    )
}
