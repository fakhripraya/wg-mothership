import React, { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import MultiUpload from '../../components/MultiUpload';
import TextInput from '../../components/TextInput';
import db from '../../config/indexeddb';
import { getFirstTableValue } from '../../utils/functions/global';
import { initialValue } from '../../variables/dummy/addCatalogue';
import { ADD_CATALOGUE_FORM } from '../../variables/global';
import './style.scss';

export default function AddCatalogue() {

    // HOOK
    const navigate = useNavigate();
    const [modalToggle, setModalToggle] = useState(false);
    const [data, setData] = useState(null);

    // FUNCTIONS SPECIFIC //
    function handleGoBackDashboard(navigate) {
        navigate(`/dashboard`);
    }

    function handleOpenModal() {
        setModalToggle(!modalToggle);
    }

    // COMPONENTS SPECIFIC //
    const ShowUploadModal = () => {
        return <div className="add-catalogue-upload-container dark-bg-color">
            <div className="add-catalogue-upload-wrapper">
                <Button onClick={() => handleOpenModal()} className="align-self-end add-catalogue-button red-bg-color">
                    <h4 className="add-catalogue-button-text">X</h4>
                </Button>
                <br />
                <h2 className="margin-top-0 margin-bottom-12-18">Upload the <span className="main-color">pictures</span> for the product here</h2>
                <br />
                <MultiUpload 
                    objectId={data ? data.id : 1} 
                    storageKey={ADD_CATALOGUE_FORM} 
                    fieldKey="images" 
                    extensions="image/jpeg, image/png" 
                    label="Geser file dan masukkan file ke box ini atau klik untuk pilih file" 
                    subLabel="Mohon hanya upload extension .jpeg atau .png saja" />
            </div>
        </div>
    }

    useEffect(()=>{
        async function init(){
            const existing = await getFirstTableValue(ADD_CATALOGUE_FORM);
            if(existing) setData(existing);
            else await db[ADD_CATALOGUE_FORM].add(initialValue).then(async (data) => {
                setData(data);
            })
        }
        init();
    },[]);

    return (
        <Fragment>
            <Modal clicked={() => handleOpenModal()} toggle={modalToggle} >
                <ShowUploadModal />
            </Modal>
            <div className="add-catalogue-container">
                <div className="add-catalogue-wrapper">
                    <div className="add-catalogue-text-container">
                        <div className="add-catalogue-text-wrapper">
                            <br />
                            <Button style={{ paddingLeft: "0px" }} onClick={() => handleGoBackDashboard(navigate)} className="align-self-start add-catalogue-button darker-bg-color">
                                <h4 className="add-catalogue-button-back-text">Go back</h4>
                            </Button>
                            <h2 className="margin-bottom-12-18">Tell us about your <span className="main-color">product informations</span></h2>
                            <h3 className="margin-top-0">What is the <span className="main-color">name</span> of your product ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <br />
                            <h3 className="margin-top-0 margin-bottom-12-18">What is the <span className="main-color">type</span> of your rental ?</h3>
                            <Dropdown style={{ width: "150px", maxWidth: "150px" }} showTitle={false} toggle={true} values={["Digital Rental", "Physical Rental"]} />
                            <br />
                            <h3 className="margin-top-0 margin-bottom-0">Upload the <span className="main-color">pictures</span> of your product <span className="main-color">here</span></h3>
                            <div className="add-catalogue-textinput-box margin-top-0">
                                <Button onClick={() => handleOpenModal()} className="align-self-end add-catalogue-button main-bg-color">
                                    <h4 className="add-catalogue-button-text">+</h4>
                                </Button>
                            </div>
                            <br />
                            <h2 className="margin-bottom-12-18">Set the <span className="main-color">product details</span></h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">Next you need to tell us the <span className="main-color">detail</span> informations about your product</h3>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Description</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Category</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Etalase</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Hashtag</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <br />
                            <h3 className="margin-top-0 margin-bottom-12-18">What about the <span className="main-color">physical</span> information ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Kondisi</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Berat</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <br />
                            <h2 className="margin-bottom-12-18">Set the rental <span className="main-color">pricing</span></h2>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Price 1</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                                <Dropdown style={{ marginLeft: "8px", width: "75px", maxWidth: "75px" }} showTitle={false} toggle={true} values={["/ Day", "/ 3 Day", "/ 7 Day", "/ 15 Day", "/ 30 Day", "/ Month", "/ 3 Month", "/ 6 Day", "/ 12 Month", "/ Year"]} />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Price 2</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                                <Dropdown style={{ marginLeft: "8px", width: "75px", maxWidth: "75px" }} showTitle={false} toggle={true} values={["/ Day", "/ 3 Day", "/ 7 Day", "/ 15 Day", "/ 30 Day", "/ Month", "/ 3 Month", "/ 6 Day", "/ 12 Month", "/ Year"]} />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Price 3</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                                <Dropdown style={{ marginLeft: "8px", width: "75px", maxWidth: "75px" }} showTitle={false} toggle={true} values={["/ Day", "/ 3 Day", "/ 7 Day", "/ 15 Day", "/ 30 Day", "/ Month", "/ 3 Month", "/ 6 Day", "/ 12 Month", "/ Year"]} />
                            </div>
                            <Button className="align-self-end add-catalogue-button main-bg-color">
                                <h4 className="add-catalogue-button-text">+</h4>
                            </Button>
                            <br />
                            <br />
                            <h3 className="margin-top-0 margin-bottom-12-18">What will be the <span className="main-color">default</span> rental price ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Default price</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <br />
                            <h2 className="margin-bottom-12-18">Set the <span className="main-color">pickup plan</span></h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">You need to set the pickup plan so anyone that interested to rental your product would know the <span className="main-color">picking info</span></h3>
                            <h3 className="margin-top-0 margin-bottom-12-18">Your customer need to <span className="main-color">pick it at</span> ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">City</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Kecamatan</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Kelurahan</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Alamat</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Postal Code</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <br />
                            <br />
                            <h3 className="margin-top-0 margin-bottom-12-18">Maximum <span className="main-color">wait time</span> to pick up before <span className="red-color">cancel</span> ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Max Wait time</label>
                                <TextInput type="text" className="add-catalogue-textinput text-align-center" />
                            </div>
                            <br />
                            <h2 className="margin-bottom-12-18">Set the <span className="main-color">courier</span></h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">You need to set the pickup plan so anyone that interested to rental your product would know the <span className="main-color">picking info</span></h3>
                            <h3 className="margin-top-0 margin-bottom-12-18">Your customer need to <span className="main-color">pick it at</span> ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Pilih Kurir 1</label>
                                <Dropdown showTitle={false} toggle={true} values={["JNE", "SiCepat"]} />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Pilih Kurir 2</label>
                                <Dropdown showTitle={false} toggle={true} values={["JNE", "SiCepat"]} />
                            </div>
                            <Button className="align-self-end add-catalogue-button main-bg-color">
                                <h4 className="add-catalogue-button-text">+</h4>
                            </Button>
                            <br />
                            <Button className="add-catalogue-button main-bg-color">
                                <h4 className="add-catalogue-button-text">Submit</h4>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
