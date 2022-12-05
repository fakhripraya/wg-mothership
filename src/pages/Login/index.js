import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import {
    useNavigate
} from 'react-router-dom';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import GoogleIcon from '../../assets/svg/google.svg';
import FacebookIcon from '../../assets/svg/facebook-f.svg';

export default function Login() {

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h2 className="margin-bottom-12-18">Join to become a member,</h2>
                <h3 className="margin-top-0 margin-bottom-12-18">gain maximum profitability by rentaling your device to others virtually or physically</h3>
                <div className="login-textinput-box">
                    <h2 className="login-input-title">ID</h2>
                    <TextInput type="text" className="login-textinput text-align-center">

                    </TextInput>
                </div>
                <div className="login-textinput-box">
                    <h2 className="login-input-title">Pass</h2>
                    <TextInput type="password" className="login-textinput text-align-center">

                    </TextInput>
                </div>
                <h3 className="login-forgot-pass link-color cursor-pointer">Forgot your password</h3>
                <Button className="login-button dark-bg-color">
                    <h2 className="login-button-text">Sign in</h2>
                </Button>
                <br></br>
                <h3 className="login-middle-text">or continue with</h3>
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
                <h3 className="login-middle-text">not a member ? <span className="link-color cursor-pointer">Register now</span></h3>
            </div>
        </div>
    )
}
