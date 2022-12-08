import React from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useEffect } from 'react';

export default function RDP() {

    useEffect(() => {
        // Scroll window to top
        window.scrollTo(0, 0);
        // set the overflow to hidden specific for rdp page
        window.document.getElementsByTagName('html')[0].style.overflow = "hidden";

        // return the overflow to the default value
        return () => window.document.getElementsByTagName('html')[0].style.overflow = "auto";
    }, [])

    return (
        <div className="rdp-container">
            <div className="rdp-wrapper">
                <div className="rdp-textinput-box">
                    <h3 className="rdp-input-title">Rental Url</h3>
                    <h4 className="margin-top-0 margin-bottom-12-18">Input the invitation link from your rental host, if you haven't get the URL you can ask the host to <span className="main-color">re-generate</span> the link</h4>
                    <TextInput type="text" className="rdp-textinput text-align-center">

                    </TextInput>
                    <Button className="rdp-button-connect">
                        Connect
                    </Button>
                </div>
            </div>
        </div>
    )
}
