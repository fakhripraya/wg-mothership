import React, { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import MultiUpload from '../../components/MultiUpload';
import TextInput from '../../components/TextInput';
import {
    courierValues,
    defaultCourier,
    defaultPrice,
    initialValue,
    periodValues,
    pricePeriodValues,
    typeValues
} from '../../variables/dummy/addCatalogue';
import { ADD_CATALOGUE_FORM } from '../../variables/global';
import AgreementIcon from "../../assets/svg/agreement-icon.svg";
import './style.scss';
import Checkbox from '../../components/Checkbox';

export default function AddCatalogue() {

    // HOOK
    const navigate = useNavigate();
    const [modalToggle, setModalToggle] = useState(false);
    const [data, setData] = useState(initialValue);
    const [files, setFiles] = useState([]);
    const [agreement, setAgreement] = useState([]);
    const [base64s, setBase64s] = useState([]);
    const [agreementBase64s, setAgreementBase64s] = useState([]);

    // FUNCTIONS SPECIFIC //
    function handleGoBackDashboard(navigate) {
        navigate(`/dashboard`);
    }

    function handleOpenModal() {
        setModalToggle(!modalToggle);
    }

    function handleAddComponent(field, defaultValue) {
        const temp = { ...data };
        temp[field].push(defaultValue);
        setData(temp);
    }

    function handleTextChange(field, event) {
        const temp = { ...data }
        temp[field] = event.target.value;
        setData(temp);
    }

    function handlePriceChange(index, event) {
        const temp = { ...data }
        temp.productPrices[index].price = event.target.value;
        setData(temp);
    }

    function handleTypeChange(value) {
        const temp = { ...data };
        temp.productType = value;
        setData(temp);
    }

    function handlePricesUnit(value, index) {
        const temp = { ...data };
        temp.productPrices[index].period = value;
        setData(temp);
    }

    function handleCourierChange(value, index) {
        const temp = { ...data };
        temp.courierChoosen[index] = value;
        setData(temp);
    }

    function handleSubmit() {
        console.log(data)
        console.log(files)
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
                <MultiUpload
                    formName={ADD_CATALOGUE_FORM}
                    base64s={base64s}
                    setBase64s={setBase64s}
                    setFiles={setFiles}
                    extensions="image/jpeg, image/png"
                    label="Geser file dan masukkan file ke box ini atau klik untuk pilih file"
                    subLabel="Mohon hanya upload extension .jpeg atau .png saja" />
            </div>
        </div>
    }

    useEffect(() => {
        async function init() {
        }
        init();
    }, []);

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
                                <TextInput value={data.productName} onChange={(e) => handleTextChange("productName", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <br />
                            <h3 className="margin-top-0 margin-bottom-12-18">What is the <span className="main-color">type</span> of your rental ?</h3>
                            <Dropdown onChange={(value) => handleTypeChange(value)} style={{ width: "150px", maxWidth: "150px" }} showTitle={false} toggle={true} values={typeValues} />
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
                                <TextInput value={data.productDescription} onChange={(e) => handleTextChange("productDescription", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Category</label>
                                <TextInput value={data.productCategory} onChange={(e) => handleTextChange("productCategory", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Etalase</label>
                                <TextInput value={data.productDisplayCategory} onChange={(e) => handleTextChange("productDisplayCategory", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Hashtag</label>
                                <TextInput value={data.productHashtag} onChange={(e) => handleTextChange("productHashtag", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <br />
                            <h3 className="margin-top-0 margin-bottom-12-18">What about the <span className="main-color">physical</span> information ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Kondisi</label>
                                <TextInput value={data.productCondition} onChange={(e) => handleTextChange("productCondition", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Berat</label>
                                <TextInput value={data.productWeight} onChange={(e) => handleTextChange("productWeight", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <br />
                            <h2 className="margin-bottom-12-18">Set the rental <span className="main-color">pricing</span></h2>
                            {
                                data.productPrices.map((val, index) => {
                                    return <div key={`add-catalogue-product-prices-${index}`} className="add-catalogue-textinput-box">
                                        <label className="add-catalogue-input-title">Price {index + 1}</label>
                                        <TextInput value={data.productPrices[index].price} onChange={(e) => handlePriceChange(index, e)} type="text" className="add-catalogue-textinput" />
                                        <Dropdown onChange={(value) => handlePricesUnit(value, index)} style={{ marginLeft: "8px", width: "75px", maxWidth: "75px" }} showTitle={false} toggle={true} values={pricePeriodValues} />
                                    </div>
                                })
                            }
                            <Button onClick={() => handleAddComponent("productPrices", { ...defaultPrice })} className="align-self-end add-catalogue-button main-bg-color">
                                <h4 className="add-catalogue-button-text">+</h4>
                            </Button>
                            <br />
                            <br />
                            <h2 className="margin-bottom-12-18">Set the <span className="main-color">pickup plan</span></h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">You need to set the pickup plan so anyone that interested to rental your product would know the <span className="main-color">picking info</span></h3>
                            <h3 className="margin-top-0 margin-bottom-12-18">Your customer need to <span className="main-color">pick it at</span> ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">City</label>
                                <TextInput value={data.pickupCity} onChange={(e) => handleTextChange("pickupCity", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Kecamatan</label>
                                <TextInput value={data.pickupSubdistrict} onChange={(e) => handleTextChange("pickupSubdistrict", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Kelurahan</label>
                                <TextInput value={data.pickupWard} onChange={(e) => handleTextChange("pickupWard", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Alamat</label>
                                <TextInput value={data.pickupAddress} onChange={(e) => handleTextChange("pickupAddress", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <div className="add-catalogue-textinput-box">
                                <label className="add-catalogue-input-title">Postal Code</label>
                                <TextInput value={data.pickupPostalCode} onChange={(e) => handleTextChange("pickupPostalCode", e)} type="text" className="add-catalogue-textinput" />
                            </div>
                            <br />
                            <br />
                            <h3 className="margin-top-0 margin-bottom-12-18">Maximum <span className="main-color">wait time</span> to pick up before <span className="red-color">cancel</span> ?</h3>
                            <div className="add-catalogue-textinput-box">
                                <TextInput value={data.productMaxWaitTime} onChange={(e) => handleTextChange("productMaxWaitTime", e)} type="text" className="add-catalogue-textinput" />
                                <Dropdown onChange={(value) => { }} style={{ marginLeft: "8px", width: "75px", maxWidth: "75px" }} showTitle={false} toggle={true} values={periodValues} />
                            </div>
                            <br />
                            <h2 className="margin-bottom-12-18">Set the <span className="main-color">courier</span></h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">You need to set the pickup plan so anyone that interested to rental your product would know the <span className="main-color">picking info</span></h3>
                            <h3 className="margin-top-0 margin-bottom-12-18">Your customer need to <span className="main-color">pick it at</span> ?</h3>
                            {
                                data.courierChoosen.map((val, index) => {
                                    return <div key={`add-catalogue-product-courier-${index}`} className="add-catalogue-textinput-box">
                                        <label className="add-catalogue-input-title">Pilih Kurir {index + 1}</label>
                                        <Dropdown onChange={(value) => handleCourierChange(value, index)} showTitle={false} toggle={true} values={courierValues} />
                                    </div>
                                })
                            }
                            <Button onClick={() => handleAddComponent("courierChoosen", defaultCourier)} className="align-self-end add-catalogue-button main-bg-color">
                                <h4 className="add-catalogue-button-text">+</h4>
                            </Button>
                            <br />
                            <br />
                            <h2 className="margin-bottom-12-18">Upload the <span className="main-color">rental agreements</span></h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">The most important thing is to upload the <span className="main-color">agreements</span> for the product rental process so you can make sure that everything is secure on your side</h3>
                            <MultiUpload
                                customIcon={AgreementIcon}
                                formName={`${ADD_CATALOGUE_FORM}_AGREEMENT`}
                                base64s={agreementBase64s}
                                setBase64s={setAgreementBase64s}
                                setFiles={setAgreement}
                                extensions="image/jpeg, image/png"
                                label="Geser file dan masukkan file ke box ini atau klik untuk pilih file"
                                subLabel="Mohon hanya upload extension .pdf saja" />
                            <br />
                            <br />
                            <div className="add-catalogue-textinput-box">
                                <Checkbox className="dashboard-chat-checkbox-item" title={"By ticking, you are confirming that you have read and agree to the terms & condition"} />
                            </div>
                            <Button onClick={() => handleSubmit()} className="align-self-start add-catalogue-button main-bg-color">
                                <h4 className="add-catalogue-button-text">Submit</h4>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
