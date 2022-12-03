import React from 'react'
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import TextInput from '../../components/TextInput';
import './style.scss';

export default function Remote() {

    // COMPONENTS SPECIFIC //

    return (
        <div className="remote-container">
            <div className="remote-wrapper">
                <div className="remote-title">
                    <h2>MY REMOTE DEVICE LIST</h2>
                </div>
                <div className="remote-header dark-bg-color">
                    <div className="remote-searchbar-container">
                        <div className="remote-searchbar-wrapper">
                            <TextInput/>
                            <Button>Search</Button>
                        </div>
                    </div>
                    <div className="remote-tools-container">
                        <div className="remote-tools-wrapper">
                            <Dropdown style={{ width: "100px", maxWidth: "100px" }} showTitle={true} toggle={true} values={["Fittest", "Jancokest"]} />
                            <Dropdown style={{ width: "100px", maxWidth: "100px" }} showTitle={false} toggle={true} values={["Fittest", "Jancokest"]} />
                            <Dropdown style={{ width: "100px", maxWidth: "100px" }} showTitle={false} toggle={true} values={["Fittest", "Jancokest"]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
