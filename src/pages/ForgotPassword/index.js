import React, { useState, useEffect, useRef, Fragment } from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { LOGIN } from '../../variables/global';

export default function ForgotPassword(props) {

    const [step, setStep] = useState(0);

    // FUNCTIONS SPECIFIC //
    function handleOpenLogin() {
        props.functions[0](LOGIN);
    }

    function handleSubmitEmail() {
        setStep(1);
    }

    function handleSubmitOTP() {
        setStep(2);
    }

    // COMPONENTS SPECIFIC //
    const ShowField = () => {

        // SUB COMPONENTS //
        const EmailField = () => {
            return <Fragment>
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
            </Fragment>
        }

        const OTPField = () => {
            return <Fragment>
                <h2 className="margin-bottom-12-18">Just Input The OTP we sent</h2>
                <h3 className="margin-top-0 margin-bottom-12-18">We Just Sent An OTP Code To Your Email, Put It Here So We Can Make Sure It Is You !</h3>
                <div className="forgot-password-textinput-box">
                    <h3 className="forgot-password-input-title">OTP</h3>
                    <TextInput maxLength="6" type="password" className="forgot-password-textinput text-align-center">

                    </TextInput>
                </div>
                <h3 onClick={() => handleOpenLogin()} className="forgot-password-forgot-pass link-color cursor-pointer">Nevermind, I remember my password now</h3>
                <Button onClick={() => handleSubmitOTP()} className="forgot-password-button dark-bg-color">
                    <h2 className="forgot-password-button-text">Submit</h2>
                </Button>
            </Fragment>
        }

        const NewPassword = () => {
            return <Fragment>
                <h2 className="margin-bottom-12-18">It Is You ! Nice !!</h2>
                <h3 className="margin-top-0 margin-bottom-12-18">Alright, Nicely Done Pal, Now Just Input Your New Pass</h3>
                <div className="forgot-password-textinput-box">
                    <h3 className="forgot-password-input-title">New Pass</h3>
                    <TextInput type="password" className="forgot-password-textinput text-align-center">

                    </TextInput>
                </div>
                <div className="forgot-password-textinput-box">
                    <h3 className="forgot-password-input-title">Confirm</h3>
                    <TextInput type="password" className="forgot-password-textinput text-align-center">

                    </TextInput>
                </div>
                <h3 onClick={() => handleOpenLogin()} className="forgot-password-forgot-pass link-color cursor-pointer">Nevermind, I remember my password now</h3>
                <Button className="forgot-password-button dark-bg-color">
                    <h2 className="forgot-password-button-text">Submit</h2>
                </Button>
            </Fragment>
        }

        // SHOW TOGGLES //
        if (step === 0) return <EmailField />
        if (step === 1) return <OTPField />
        else return <NewPassword />
    }

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-wrapper">
                <ShowField />
            </div>
        </div>
    )
}
