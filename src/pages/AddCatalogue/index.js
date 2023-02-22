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
                        <h2 className="margin-bottom-12-18">Tell us about your <span className="main-color">product informations</span></h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">What is the <span className="main-color">name</span> of your product ?</h3>
                        <div className="add-catalogue-textinput-box">
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <h2 className="margin-bottom-12-18">Set the <span className="main-color">product details</span></h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">Next you need to tell us the <span className="main-color">detail</span> informations about your product</h3>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Description</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Category</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Etalase</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Hashtag</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <h3 className="margin-top-0 margin-bottom-12-18">What about the <span className="main-color">physical</span> information ?</h3>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Kondisi</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Berat</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <h2 className="margin-bottom-12-18">Set the rental <span className="main-color">pricing</span></h2>
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
                        <Button className="align-self-end add-catalogue-button main-bg-color">
                            <h3 className="add-catalogue-button-text">+</h3>
                        </Button>
                        <br />
                        <br />
                        <h3 className="margin-top-0 margin-bottom-12-18">What will be the <span className="main-color">default</span> rental price ?</h3>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Default price</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <h2 className="margin-bottom-12-18">Set the <span className="main-color">pickup plan</span></h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">You need to set the pickup plan so anyone that interested to rental your product would know the <span className="main-color">picking info</span></h3>
                        <h3 className="margin-top-0 margin-bottom-12-18">Your customer need to <span className="main-color">pick it at</span> ?</h3>
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
                        <h3 className="margin-top-0 margin-bottom-12-18">Maximum <span className="main-color">wait time</span> to pick up before <span className="red-color">cancel</span> ?</h3>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Max Wait time</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <br />
                        <h2 className="margin-bottom-12-18">Set the <span className="main-color">courier</span></h2>
                        <h3 className="margin-top-0 margin-bottom-12-18">You need to set the pickup plan so anyone that interested to rental your product would know the <span className="main-color">picking info</span></h3>
                        <h3 className="margin-top-0 margin-bottom-12-18">Your customer need to <span className="main-color">pick it at</span> ?</h3>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Pilih Kurir 1</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <div className="add-catalogue-textinput-box">
                            <h3 className="add-catalogue-input-title">Pilih Kurir 2</h3>
                            <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                        </div>
                        <Button className="align-self-end add-catalogue-button main-bg-color">
                            <h3 className="add-catalogue-button-text">+</h3>
                        </Button>
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