import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Fragment } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  CONTENT_TYPE,
  IS_OTP_VERIFIED,
  LOGIN,
  UPLOADED_STORE_PROFILE_PICTURE,
  URL_POST_ADD_USER_STORE,
  X_SID,
} from "../../variables/global";
import {
  handleError500,
  handleErrorMessage,
  handleOpenOverridingHome,
} from "../../utils/functions/global";
import { handleOpenModal } from "../../utils/functions/global";
import { STORE_INITIAL_VALUE } from "../../variables/initial/store";
import {
  INITIAL_PROVINCES,
  INITIAL_REGENCIES,
  INITIAL_DISTRICTS,
  INITIAL_VILLAGES,
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
import {
  ShowErrorModal,
  ShowSuccessModal,
} from "./ModularComponents/ShowModals";
import TextArea from "../../components/TextArea";
import { LOGIN_PAGE_REDIRECTING_MESSAGE } from "../../variables/errorMessages/dashboard";
import PageLoading from "../PageLoading";

export default function AddStore() {
  // HOOK
  const navigate = useNavigate();
  const zeusService = useAxios();
  const [searchParams] = useSearchParams();
  const hiddenFileInput = useRef(null);

  // VARIABLES
  let login = cookies.get(CLIENT_USER_INFO, { path: "/" });
  const prevStore = searchParams.get("prevStore");
  const prevTab = searchParams.get("prevTab");

  // STATES
  const [data, setData] = useState(STORE_INITIAL_VALUE);
  const [profilePicture, setProfilePicture] =
    useState(null);
  const [agreementCheckbox, setAgreementCheckbox] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorModalToggle, setErrorModalToggle] =
    useState(false);
  const [provinces, setProvinces] = useState(
    INITIAL_PROVINCES
  );
  const [regencies, setRegencies] = useState(
    INITIAL_REGENCIES
  );
  const [districts, setDistricts] = useState(
    INITIAL_DISTRICTS
  );
  const [villages, setVillages] = useState(
    INITIAL_VILLAGES
  );
  const [submitResponse, setSubmitResponse] = useState({
    completed: false,
    storeId: undefined,
  });

  // FUNCTIONS SPECIFIC //
  // return the current state, and the initial state
  const dataHandler = () => {
    return {
      data,
      initialValue: STORE_INITIAL_VALUE,
    };
  };

  const errorHandler = () => {
    return {
      setErrorMessage,
      setErrorModalToggle,
      errorModalToggle,
    };
  };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  async function handleUploadChange(event) {
    const fileUploaded = event.target.files[0];
    setProfilePicture({
      name: fileUploaded.name,
      size: fileUploaded.size,
      blob: fileUploaded,
    });
  }

  // Programatically click the hidden file input element
  // when the Button component is clicked
  function handleUploadClick() {
    hiddenFileInput.current.click();
  }

  function handleErrorModal() {
    return handleOpenModal(
      setErrorModalToggle,
      errorModalToggle
    );
  }

  function handleGoBackDashboard(storeId) {
    navigate(
      `/dashboard?${
        storeId ? `storeId=${storeId}` : ""
      }&tab=${prevTab}`
    );
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

  function handleCreateFormData() {
    const formData = new FormData();
    formData.append("storeName", data.storeName);
    formData.append("storeCode", data.storeCode);
    formData.append(
      "storeDescription",
      data.storeDescription
    );
    formData.append("storePhone", data.storePhone);
    formData.append("storeWhatsapp", data.storeWhatsapp);
    formData.append("storeEmail", data.storeEmail);
    formData.append("storeProvince", data.storeProvince);
    formData.append("storeRegency", data.storeRegency);
    formData.append("storeDistrict", data.storeDistrict);
    formData.append("storeVillage", data.storeVillage);
    formData.append("storeAddress", data.storeAddress);
    formData.append(
      "storePostalCode",
      data.storePostalCode
    );
    profilePicture &&
      formData.append(
        UPLOADED_STORE_PROFILE_PICTURE,
        profilePicture.blob,
        profilePicture.name
      );

    return formData;
  }

  function handleSubmit() {
    // do some validation before the request
    if (!agreementCheckbox)
      return handleErrorMessage(
        { errorContent: AGREEMENT_CHECKBOX_UNCHECKED },
        setErrorMessage,
        setErrorModalToggle,
        errorModalToggle
      );

    // create multipart/form-data object for the request body
    const formData = handleCreateFormData();

    // track promise and do the axios request
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
              [CONTENT_TYPE]: "multipart/form-data",
            },
            data: formData,
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
          if (res.responseStatus === 200)
            setSubmitResponse({
              completed: true,
              storeId: res.responseData,
            });
        })
        .catch((error) => {
          if (error.responseStatus === 500)
            console.error(error);
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
              setErrorModalToggle,
              errorModalToggle
            );
        })
    );
  }

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
            setErrorModalToggle,
            errorModalToggle
          );
        await handleShowProvinces(
          setProvinces,
          errorHandler()
        );
      })()
    );
  }, []);

  if (!IS_OTP_VERIFIED(login))
    (() => {
      // Executing asynchronous call for redirecting to home page
      handleOpenOverridingHome(LOGIN);
      // Placeholder message while redirecting to home page
      return (
        <PageLoading
          loadingMessage={LOGIN_PAGE_REDIRECTING_MESSAGE}
        />
      );
    })();

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        toggle={submitResponse.completed}>
        <ShowSuccessModal
          goBackStoreId={submitResponse.storeId}
          handleGoBackDashboard={handleGoBackDashboard}
        />
      </Modal>
      <Modal
        className="dark-bg-color"
        clicked={handleErrorModal}
        toggle={errorModalToggle}>
        <ShowErrorModal
          handleOpenModal={handleErrorModal}
          errorMessage={errorMessage}
        />
      </Modal>
      <div className="add-store-container">
        <div className="add-store-wrapper">
          <div className="add-store-text-container">
            <div className="add-store-text-wrapper">
              <div className="breakline" />
              <Button
                style={{ paddingLeft: "0px" }}
                onClick={() =>
                  handleGoBackDashboard(prevStore)
                }
                className="align-self-start add-store-button darker-bg-color">
                <h4 className="add-store-button-back-text">
                  Go back
                </h4>
              </Button>
              <h3 className="margin-bottom-12-18">
                Ayo kita mulai buat toko, kamu isi{" "}
                <span className="main-color">
                  informasi toko
                </span>{" "}
                mu dulu ya
              </h3>
              <label className="margin-top-0">
                Boleh tau{" "}
                <span className="main-color">nama</span>{" "}
                tokomu dulu gak ?
              </label>
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
              <div className="breakline" />
              <h3 className="margin-bottom-12-18">
                Set{" "}
                <span className="main-color">
                  informasi
                </span>{" "}
                toko
              </h3>
              <label className="margin-top-0">
                Kamu juga harus masukin{" "}
                <span className="main-color">
                  profile picture
                </span>{" "}
                toko ya !
              </label>
              <div className="add-store-avatar-container align-self-start">
                <div className="add-store-identifier-img-wrapper">
                  <Avatar
                    onClick={handleUploadClick}
                    style={{
                      cursor: "pointer",
                      margin: "12px 0px",
                    }}
                    round={true}
                    src={
                      profilePicture &&
                      URL.createObjectURL(
                        profilePicture.blob
                      )
                    }
                    size={150}
                    title={data.storeName}
                    name={data.storeName}
                  />
                  <Button onClick={handleUploadClick}>
                    Ganti ah !
                  </Button>
                  <input
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    onChange={handleUploadChange}
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="breakline" />
              <div className="breakline" />
              <label className="margin-top-0 margin-bottom-12-18">
                Silahkan input{" "}
                <span className="main-color">
                  informasi
                </span>{" "}
                tokomu
              </label>
              <div className="add-store-textinput-box">
                <label className="add-store-input-title">
                  Deskripsi
                </label>
                <TextArea
                  value={data.pickupSubdistrict}
                  onChange={(e) =>
                    handleTextChange("storeDescription", e)
                  }
                  type="text"
                  className="add-store-longtext-area"
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
              <div className="breakline" />
              <h3 className="margin-bottom-12-18">
                Set{" "}
                <span className="main-color">alamat</span>{" "}
                toko
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Abis itu kita set{" "}
                <span className="main-color">
                  alamat tokomu
                </span>{" "}
                yuk biar orang-orang tau tempatnya
              </label>
              <div className="breakline" />
              <label className="margin-top-0 margin-bottom-12-18">
                Pilih{" "}
                <span className="main-color">provinsi</span>
              </label>
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
                <div className="breakline" />
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
                <div className="breakline" />
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
                <div className="breakline" />
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
              <div className="breakline" />
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
              <div className="breakline" />
              <div className="breakline" />
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
                <p className="add-store-button-text">
                  Submit
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
