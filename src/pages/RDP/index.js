import React, { useState, useEffect } from 'react';
import './style.scss';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export default function RDP() {

    // HOOKS //
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    // FUNCTIONS SPECIFIC //
    function answerRDPInvitation() {
        navigate(`/rdp/room?code=${code}`);
    }

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
                    <h3 className="rdp-input-title">Rental Code</h3>
                    <h4 className="margin-top-0 margin-bottom-12-18">Input the invitation <span className="main-color">code</span> from your rental host, if you haven't get the code you can ask the host to <span className="main-color">re-generate</span> the code</h4>
                    <TextInput onChange={(e) => setCode(e.target.value)} type="text" className="rdp-textinput text-align-center" />
                    <Button onClick={() => answerRDPInvitation()} className="rdp-button-connect">
                        Connect
                    </Button>
                </div>
            </div>
        </div>
    )
}
