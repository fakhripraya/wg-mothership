import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import "./style.scss";
import Checkbox from "../../components/Checkbox";
import Modal from "../../components/Modal";
import { trackPromise } from "react-promise-tracker";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  LOGIN,
  URL_POST_ADD_USER_STORE,
  X_SID,
} from "../../variables/global";
import {
  handleError500,
  handleErrorMessage,
  handleOpenOverridingHome,
} from "../../utils/functions/global";
import { handleOpenModal } from "../../utils/functions/global";
import { initialValue } from "../../variables/initial/store";
import {
  provinces as initialProvinces,
  regencies as initialRegencies,
  districts as initialDistricts,
  villages as initialVillages,
} from "../../variables/initial/global";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { AGREEMENT_CHECKBOX_UNCHECKED } from "../../variables/errorMessages/store";
import Dropdown from "../../components/DynamicDropdown";
import { cookies } from "../../config/cookie";
import {
  handleShowDistrict,
  handleShowProvinces,
  handleShowRegencies,
  handleShowVillages,
} from "../../utils/functions/asynchronous";
import Avatar from "react-avatar";

export default function AddStore() {
  // HOOK
  const navigate = useNavigate();
  const zeusService = useAxios();

  // VARIABLES
  let login = cookies.get(CLIENT_USER_INFO, { path: "/" });

  // STATES
  const [data, setData] = useState(initialValue);
  const [agreementCheckbox, setAgreementCheckbox] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [provinces, setProvinces] = useState(
    initialProvinces
  );
  const [regencies, setRegencies] = useState(
    initialRegencies
  );
  const [districts, setDistricts] = useState(
    initialDistricts
  );
  const [villages, setVillages] = useState(initialVillages);
  const [success, setSuccess] = useState(false);

  // FUNCTIONS SPECIFIC //
  const dataHandler = () => {
    return {
      data,
      initialValue,
    };
  };

  const errorHandler = () => {
    return {
      setErrorMessage,
      setModalToggle,
      modalToggle,
    };
  };

  function handleGoBackDashboard(navigate) {
    navigate(`/dashboard`);
  }

  function handleTextChange(field, event) {
    const temp = { ...data };
    temp[field] = event.target.value;
    setData(temp);
  }

  function handleTextChangeByValue(field, value) {
    const temp = { ...data };
    temp[field] = value;
    setData(temp);
  }

  function handleAgreementCheck() {
    setAgreementCheckbox(!agreementCheckbox);
  }

  function handleSubmit() {
    if (!agreementCheckbox)
      return handleErrorMessage(
        { errorContent: AGREEMENT_CHECKBOX_UNCHECKED },
        setErrorMessage,
        setModalToggle,
        modalToggle
      );
    trackPromise(
      zeusService
        .postDataWithOnRequestInterceptors(
          {
            endpoint: process.env.REACT_APP_ZEUS_SERVICE,
            url: URL_POST_ADD_USER_STORE(login.user.userId),
            headers: {
              [AUTHORIZATION]: `Bearer ${
                cookies.get(CLIENT_USER_INFO, {
                  path: "/",
                }).credentialToken.accessToken
              }`,
              [X_SID]: cookies.get(CLIENT_USER_INFO, {
                path: "/",
              }).sid,
            },
            data: data,
          },
          async () => {
            const result = await checkAuthAndRefresh(
              zeusService,
              cookies
            );
            if (result.responseStatus === 200)
              login = cookies.get(CLIENT_USER_INFO);
            return result;
          }
        )
        .then((res) => {
          if (res.responseStatus === 200) setSuccess(true);
        })
        .catch((error) => {
          if (error.responseStatus === 500)
            handleError500();
          if (
            error.responseStatus === 401 ||
            error.responseStatus === 403
          ) {
            cookies.remove(CLIENT_USER_INFO, { path: "/" });
            handleOpenOverridingHome(LOGIN);
          } else
            return handleErrorMessage(
              error,
              setErrorMessage,
              setModalToggle,
              modalToggle
            );
        })
    );
  }

  // COMPONENT SPECIFIC
  const ShowErrorModal = () => {
    return (
      <div className="add-store-modal-container dark-bg-color">
        <div className="add-store-modal-wrapper">
          <Button
            onClick={() =>
              handleOpenModal(setModalToggle, modalToggle)
            }
            className="align-self-end add-store-modal-button red-bg-color">
            <h4 className="add-store-modal-button-text">
              X
            </h4>
          </Button>
          <br />
          <h3 className="margin-top-0 margin-bottom-12-18">
            There is an{" "}
            <span className="red-color">ERROR</span>
          </h3>
          <br />
          <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
            {errorMessage}
          </label>
        </div>
      </div>
    );
  };

  const ShowSuccessModal = () => {
    return (
      <div className="add-store-modal-container dark-bg-color">
        <div className="add-store-modal-wrapper">
          <h3 className="margin-top-0 margin-bottom-12-18">
            <span className="main-color">SUKSES</span>
          </h3>
          <br />
          <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
            Wah selamat, kamu berhasil membuat toko lelangmu
            !
          </label>
          <br />
          <div
            style={{ padding: "0px", width: "30%" }}
            className="align-self-center add-store-modal-button">
            <Button
              onClick={() =>
                handleGoBackDashboard(navigate)
              }>
              OK
            </Button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    trackPromise(
      (async () => {
        const result = await checkAuthAndRefresh(
          zeusService,
          cookies
        );
        if (result.responseStatus === 200)
          login = cookies.get(CLIENT_USER_INFO);
        if (result.responseStatus === 500) handleError500();
        if (
          result.responseStatus === 401 ||
          result.responseStatus === 403
        ) {
          cookies.remove(CLIENT_USER_INFO, { path: "/" });
          handleOpenOverridingHome(LOGIN);
        } else if (result.responseStatus >= 400)
          handleErrorMessage(
            result,
            setErrorMessage,
            setModalToggle,
            modalToggle
          );
        await handleShowProvinces(
          setProvinces,
          errorHandler()
        );
      })()
    );
  }, []);

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(setModalToggle, modalToggle)
        }
        toggle={modalToggle}>
        <ShowErrorModal />
      </Modal>
      <Modal
        className="dark-bg-color"
        toggle={success}>
        <ShowSuccessModal />
      </Modal>
      <div className="add-store-container">
        <div className="add-store-wrapper">
          <div className="add-store-text-container">
            <div className="add-store-text-wrapper">
              <br />
              <Button
                style={{ paddingLeft: "0px" }}
                onClick={() =>
                  handleGoBackDashboard(navigate)
                }
                className="align-self-start add-store-button darker-bg-color">
                <h4 className="add-store-button-back-text">
                  Go back
                </h4>
              </Button>
              <h2 className="margin-bottom-12-18">
                Ayo kita mulai buat toko, kamu isi{" "}
                <span className="main-color">
                  informasi toko
                </span>{" "}
                mu dulu ya
              </h2>
              <h3 className="margin-top-0">
                Boleh tau{" "}
                <span className="main-color">nama</span>{" "}
                tokomu dulu gak ?
              </h3>
              <div className="add-store-textinput-box">
                <TextInput
                  value={data.productName}
                  onChange={(e) =>
                    handleTextChange("storeName", e)
                  }
                  type="text"
                  className="add-store-textinput"
                />
              </div>
              <br />
              <h2 className="margin-bottom-12-18">
                Set{" "}
                <span className="main-color">
                  informasi
                </span>{" "}
                toko
              </h2>
              <h3 className="margin-top-0">
                Kamu juga harus masukin{" "}
                <span className="main-color">
                  profile picture
                </span>{" "}
                toko ya !
              </h3>
              <div className="add-store-avatar-container align-self-start">
                <div className="add-store-identifier-img-wrapper">
                  <Avatar
                    style={{ cursor: "pointer" }}
                    round={true}
                    size={150}
                    title={data.storeName}
                    name={data.storeName}
                  />
                  <br />
                  <br />
                  <Button>Ubah</Button>
                </div>
              </div>
              <br />
              <br />
              <h3 className="margin-top-0 margin-bottom-12-18">
                Silahkan input{" "}
                <span className="main-color">
                  informasi
                </span>{" "}
                tokomu
              </h3>
              <div className="add-store-textinput-box">
                <label className="add-store-input-title">
                  Deskripsi
                </label>
                <TextInput
                  value={data.pickupSubdistrict}
                  onChange={(e) =>
                    handleTextChange("storePhone", e)
                  }
                  type="text"
                  className="add-store-textinput"
                />
              </div>
              <div className="add-store-textinput-box">
                <label className="add-store-input-title">
                  No HP
                </label>
                <TextInput
                  value={data.pickupSubdistrict}
                  onChange={(e) =>
                    handleTextChange("storePhone", e)
                  }
                  type="text"
                  className="add-store-textinput"
                />
              </div>
              <div className="add-store-textinput-box">
                <label className="add-store-input-title">
                  No Whatsapp
                </label>
                <TextInput
                  value={data.pickupWard}
                  onChange={(e) =>
                    handleTextChange("storeWhatsapp", e)
                  }
                  type="text"
                  className="add-store-textinput"
                />
              </div>
              <div className="add-store-textinput-box">
                <label className="add-store-input-title">
                  Email
                </label>
                <TextInput
                  value={data.pickupAddress}
                  onChange={(e) =>
                    handleTextChange("storeEmail", e)
                  }
                  type="text"
                  className="add-store-textinput"
                />
              </div>
              <br />
              <h2 className="margin-bottom-12-18">
                Set{" "}
                <span className="main-color">alamat</span>{" "}
                toko
              </h2>
              <h3 className="margin-top-0 margin-bottom-12-18">
                Abis itu kita set{" "}
                <span className="main-color">
                  alamat tokomu
                </span>{" "}
                yuk biar orang-orang tau tempatnya
              </h3>
              <br />
              <h3 className="margin-top-0 margin-bottom-12-18">
                Pilih{" "}
                <span className="main-color">provinsi</span>
              </h3>
              <Dropdown
                onChange={(value) =>
                  handleShowRegencies(
                    value,
                    dataHandler(),
                    {
                      setVillages,
                      setDistricts,
                      setRegencies,
                      setData,
                    },
                    errorHandler()
                  )
                }
                style={{
                  width: "150px",
                  maxWidth: "150px",
                }}
                showTitle={false}
                toggle={true}
                value={data.storeProvince}
                values={provinces}
              />
              <div
                className={
                  regencies.length === 0
                    ? "display-none hidden"
                    : ""
                }>
                <br />
                <h3 className="margin-top-0 margin-bottom-12-18">
                  Pilih{" "}
                  <span className="main-color">kota</span>
                </h3>
                <Dropdown
                  onChange={(value) =>
                    handleShowDistrict(
                      value,
                      dataHandler(),
                      {
                        setVillages,
                        setDistricts,
                        setData,
                      },
                      errorHandler()
                    )
                  }
                  style={{
                    width: "150px",
                    maxWidth: "150px",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.storeRegency}
                  values={regencies}
                />
              </div>
              <div
                className={
                  districts.length === 0
                    ? "display-none hidden"
                    : ""
                }>
                <br />
                <h3 className="margin-top-0 margin-bottom-12-18">
                  Pilih{" "}
                  <span className="main-color">
                    kecamatan
                  </span>
                </h3>
                <Dropdown
                  onChange={(value) =>
                    handleShowVillages(
                      value,
                      dataHandler(),
                      { setVillages, setData },
                      errorHandler()
                    )
                  }
                  style={{
                    width: "150px",
                    maxWidth: "150px",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.storeDistrict}
                  values={districts}
                />
              </div>
              <div
                className={
                  villages.length === 0
                    ? "display-none hidden"
                    : ""
                }>
                <br />
                <h3 className="margin-top-0 margin-bottom-12-18">
                  Pilih{" "}
                  <span className="main-color">
                    kelurahan
                  </span>
                </h3>
                <Dropdown
                  onChange={(value) =>
                    handleTextChangeByValue(
                      "storeVillage",
                      value
                    )
                  }
                  style={{
                    width: "150px",
                    maxWidth: "150px",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.storeVillage}
                  values={villages}
                />
              </div>
              <br />
              <div className="add-store-textinput-box">
                <label className="add-store-input-title">
                  Alamat
                </label>
                <TextInput
                  value={data.pickupAddress}
                  onChange={(e) =>
                    handleTextChange("storeAddress", e)
                  }
                  type="text"
                  className="add-store-textinput"
                />
              </div>
              <div className="add-store-textinput-box">
                <label className="add-store-input-title">
                  Kode Pos
                </label>
                <TextInput
                  value={data.pickupPostalCode}
                  onChange={(e) =>
                    handleTextChange("storePostalCode", e)
                  }
                  type="text"
                  className="add-store-textinput"
                />
              </div>
              <br />
              <br />
              <div className="add-store-textinput-box">
                <Checkbox
                  checked={agreementCheckbox}
                  onChange={() => handleAgreementCheck()}
                  className="dashboard-chat-checkbox-item"
                  title={
                    "Dengan menyontreng ini, kamu telah membaca dan menyetujui syarat dan ketentuan yang berlaku"
                  }
                />
              </div>
              <Button
                onClick={() => handleSubmit()}
                className="align-self-start add-store-button main-bg-color">
                <h4 className="add-store-button-text">
                  Submit
                </h4>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
