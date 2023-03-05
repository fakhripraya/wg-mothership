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
    waitTimeValues,
    pricePeriodValues,
    typeValues
} from '../../variables/dummy/addCatalogue';
import { ADD_CATALOGUE_FORM } from '../../variables/global';
import AgreementIcon from "../../assets/svg/agreement-icon.svg";
import './style.scss';
import Checkbox from '../../components/Checkbox';

export default function AddToko() {

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
        return <div className="add-toko-upload-container dark-bg-color">
            <div className="add-toko-upload-wrapper">
                <Button onClick={() => handleOpenModal()} className="align-self-end add-toko-button red-bg-color">
                    <h4 className="add-toko-button-text">X</h4>
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
            <div className="add-toko-container">
                <div className="add-toko-wrapper">
                    <div className="add-toko-text-container">
                        <div className="add-toko-text-wrapper">
                            <br />
                            <Button style={{ paddingLeft: "0px" }} onClick={() => handleGoBackDashboard(navigate)} className="align-self-start add-toko-button darker-bg-color">
                                <h4 className="add-toko-button-back-text">Go back</h4>
                            </Button>
                            <h2 className="margin-bottom-12-18">Ayo kita mulai buat toko, kamu isi <span className="main-color">informasi toko</span> mu dulu ya</h2>
                            <h3 className="margin-top-0">Boleh tau <span className="main-color">nama</span> tokomu dulu gak ?</h3>
                            <div className="add-toko-textinput-box">
                                <TextInput value={data.productName} onChange={(e) => handleTextChange("productName", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <br />
                            <h2 className="margin-bottom-12-18">Set <span className="main-color">informasi</span> toko</h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">Silahkan input <span className="main-color">informasi</span> tokomu</h3>
                            <div className="add-toko-textinput-box">
                                <label className="add-toko-input-title">No HP</label>
                                <TextInput value={data.pickupSubdistrict} onChange={(e) => handleTextChange("pickupSubdistrict", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <div className="add-toko-textinput-box">
                                <label className="add-toko-input-title">No Whatsapp</label>
                                <TextInput value={data.pickupWard} onChange={(e) => handleTextChange("pickupWard", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <div className="add-toko-textinput-box">
                                <label className="add-toko-input-title">Email</label>
                                <TextInput value={data.pickupAddress} onChange={(e) => handleTextChange("pickupAddress", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <br />
                            <h2 className="margin-bottom-12-18">Set <span className="main-color">alamat</span> toko</h2>
                            <h3 className="margin-top-0 margin-bottom-12-18">Abis itu kita set <span className="main-color">alamat tokomu</span> yuk biar orang-orang tau tempatnya</h3>
                            <div className="add-toko-textinput-box">
                                <label className="add-toko-input-title">City</label>
                                <TextInput value={data.pickupCity} onChange={(e) => handleTextChange("pickupCity", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <div className="add-toko-textinput-box">
                                <label className="add-toko-input-title">Kecamatan</label>
                                <TextInput value={data.pickupSubdistrict} onChange={(e) => handleTextChange("pickupSubdistrict", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <div className="add-toko-textinput-box">
                                <label className="add-toko-input-title">Kelurahan</label>
                                <TextInput value={data.pickupWard} onChange={(e) => handleTextChange("pickupWard", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <div className="add-toko-textinput-box">
                                <label className="add-toko-input-title">Alamat</label>
                                <TextInput value={data.pickupAddress} onChange={(e) => handleTextChange("pickupAddress", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <div className="add-toko-textinput-box">
                                <label className="add-toko-input-title">Postal Code</label>
                                <TextInput value={data.pickupPostalCode} onChange={(e) => handleTextChange("pickupPostalCode", e)} type="text" className="add-toko-textinput" />
                            </div>
                            <br />
                            <br />
                            <div className="add-toko-textinput-box">
                                <Checkbox className="dashboard-chat-checkbox-item" title={"Dengan menyontreng ini, kamu telah membaca dan menyetujui syarat dan ketentuan yang berlaku"} />
                            </div>
                            <Button onClick={() => handleSubmit()} className="align-self-start add-toko-button main-bg-color">
                                <h4 className="add-toko-button-text">Submit</h4>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
