import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import './style.scss';

export default function AddCatalogue() {

    // HOOK
    const navigate = useNavigate();

    // FUNCTIONS SPECIFIC //
    function handleGoBackDashboard(navigate) {
        navigate(`/dashboard`);
    }

    return (
        <div className="add-catalogue-container">
            <div className="add-catalogue-wrapper">
                <div className="add-catalogue-text-container">
                    <div className="add-catalogue-text-wrapper">
                        <Button onClick={() => handleGoBackDashboard(navigate)} className="align-self-start add-catalogue-button red-bg-color">
                            <h3 className="add-catalogue-button-text">Go Back</h3>
                        </Button>
                        <h2 className="margin-bottom-12-18">Tell us about your product information</h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">What is the name of your product ?</h3>
                        <div className="add-catalogue-textinput-box margin-bottom-12-18">
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <h2 className="margin-bottom-12-18">Set Product Details</h2>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Description</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Category</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Hashtag</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <h2 className="margin-bottom-12-18">Set Rental Pricing</h2>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Price 1</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Price 2</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Price 3</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <Button className="align-self-end add-catalogue-button main-bg-color">
                            <h3 className="add-catalogue-button-text">+</h3>
                        </Button>
                        <br />
                        <br />
                        <h3 className="margin-top-0 margin-bottom-12-18">What will be the default rental price ?</h3>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Default price</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <h2 className="margin-bottom-12-18">Set Pickup Plan</h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">You need to set the pickup plan so anyone that interested to rental your product would know the picking info</h3>
                        <h3 className="margin-top-0 margin-bottom-12-18">Your customer need to pick it at ?</h3>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">City</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Kecamatan</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Kelurahan</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Alamat</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Postal Code</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <br />
                        <h3 className="margin-top-0 margin-bottom-12-18">Maximum wait time to pick up before cancel ?</h3>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Max Wait time</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <Button className="add-catalogue-button main-bg-color">
                            <h3 className="add-catalogue-button-text">Next</h3>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
