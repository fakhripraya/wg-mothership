import React from 'react';
import './style.scss';
import Button from '../Button';
import WGLogo from '../../assets/images/ic_new_wg_logo.png';
import { getSocialMedia } from '../../variables/styles/footer';

export default function TextInput(props) {

    const StyledButton = (props) => {
        const { children, className } = props;
        return <div className="footer-button-container">
            <Button className={"footer-button " + className}>
                {children}
            </Button>
        </div>
    }

    return (
        <div className="footer-container main-bg-color">
            <div className="footer-grid-wrapper grid-false">
                <div className="footer-column-1">
                    <div className="footer-column-1-wrapper">
                        <div className="footer-column-1-media-social">
                            {getSocialMedia().map((social, index) => {
                                return <StyledButton key={`footer-styled-button-${index}`} className="footer-button-outlined">{social.name}</StyledButton>
                            })}
                        </div>
                        <h3> We are based in </h3>
                        <h3 >Jakarta,  </h3>
                        <h1 style={{ fontSize: "2.5em" }} className="break-word">Indonesia</h1>
                        <h2 className="footer-column-1-email">Drop us a line</h2>
                        <h1 className="break-word"><a className="footer-column-1-email-text" href="mailto:letmeask@wg.com">letmeask@wg.com</a></h1>
                        <div className="footer-column-1-help">
                            <StyledButton className="max-width footer-button-block">Privacy and Policy</StyledButton>
                            <StyledButton className="max-width footer-button-block">Terms and Condition</StyledButton>
                            <StyledButton className="max-width footer-button-block">Customer Service</StyledButton>
                        </div>
                    </div>
                </div>
                <div className="footer-column-2">
                    <div className="footer-column-2-wrapper">
                        <img className="footer-logo-img" src={WGLogo} alt="WG_LOGO"></img>
                        <p>© {'2022'} All Rights Reserved, WARGEM.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
