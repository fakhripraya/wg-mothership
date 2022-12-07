import React, { useState, Fragment } from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import OverridingContainer from '../../components/OveriddingContainer';
import { ShowNavbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import XMark from '../../assets/svg/xmark-solid.svg';
import {
    EMPTY,
    LOGIN,
    NEW_PASSWORD
} from '../../variables/global';

export default function NewPassword(props) {

    // FUNCTIONS SPECIFIC //
    function handleOpenLogin() {
        props.handleOpen(LOGIN);
    }

    function handleSubmitNewPassword() {
    }

    return (
        <OverridingContainer toggle={props.toggle === NEW_PASSWORD}>
            <div className="sticky-top">
                <ShowNavbar>
                    <img onClick={() => { props.handleOpen(EMPTY) }} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                </ShowNavbar>
                <div className="new-password-container">
                    <div className="new-password-wrapper">
                        <h2 className="margin-bottom-12-18">It Is You ! Nice !!</h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">Alright, Nicely Done Pal, Now Just Input Your New Pass</h3>
                        <div className="new-password-textinput-box">
                            <h3 className="new-password-input-title">New Pass</h3>
                            <TextInput type="password" className="new-password-textinput text-align-center">

                            </TextInput>
                        </div>
                        <div className="new-password-textinput-box">
                            <h3 className="new-password-input-title">Confirm</h3>
                            <TextInput type="password" className="new-password-textinput text-align-center">

                            </TextInput>
                        </div>
                        <h3 onClick={() => handleOpenLogin()} className="new-password-forgot-pass link-color cursor-pointer">Nevermind, I remember my password now</h3>
                        <Button className="new-password-button dark-bg-color">
                            <h2 className="new-password-button-text">Submit</h2>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        </OverridingContainer>
    )
}
