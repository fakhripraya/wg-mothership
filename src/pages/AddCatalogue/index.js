import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Button from "../../components/Button";
import Dropdown from "../../components/DynamicDropdown";
import Modal from "../../components/Modal";
import MultiUpload, {
  AcceptedFileItems,
  FileRejectionItems,
} from "../../components/MultiUpload";
import TextInput from "../../components/TextInput";
import {
  defaultCourier,
  initialValue,
  initialFetchedDatas,
} from "../../variables/initial/catalogue";
import {
  ADD_CATALOGUE_FORM,
  AUTHORIZATION,
  CLIENT_USER_INFO,
  CONTENT_TYPE,
  GENERAL_MULTIUPLOAD_LABEL,
  GENERAL_MULTIUPLOAD_SUBLABEL,
  JPEG_PNG,
  LOGIN,
  NO_DATA,
  NO_STRING,
  PDF,
  URL_GET_ADD_CATALOGUE_DATA,
  URL_GET_CATEGORIES,
  URL_GET_COURIERS,
  URL_POST_ADD_STORE_CATALOGUE,
  X_SID,
} from "../../variables/global";
import AgreementIcon from "../../assets/svg/agreement-icon.svg";
import "./style.scss";
import Checkbox from "../../components/Checkbox";
import { useAxios } from "../../utils/hooks/useAxios";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import {
  b64toBlob,
  handleError500,
  handleErrorMessage,
  handleOpenModal,
  handleOpenOverridingHome,
} from "../../utils/functions/global";
import { trackPromise } from "react-promise-tracker";
import {
  AGREEMENT_CHECKBOX_UNCHECKED,
  INPUT_NEW_CATALOGUE_VALUE,
} from "../../variables/errorMessages/catalogue";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "../../config/cookie";
import TextArea from "../../components/TextArea";

// TODO: Fix input lag caused by uploaded file re rendered
export default function AddCatalogue() {
  // HOOK
  const navigate = useNavigate();
  const zeusService = useAxios();
  const [data, setData] = useState(initialValue);
  const [fetchedDatas, setFetchedDatas] = useState(
    initialFetchedDatas
  );
  const [agreementCheckbox, setAgreementCheckbox] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [modalCatalogueToggle, setModalCatalogueToggle] =
    useState(false);
  const [errorModalToggle, setErrorModalToggle] =
    useState(false);
  const [productPictures, setProductPictures] = useState(
    []
  );
  const [
    rejectedProductPictures,
    setRejectedProductPictures,
  ] = useState([]);
  const [additionalDocuments, setAdditionalDocuments] =
    useState([]);
  const [
    rejectedAdditionalDocuments,
    setRejectedAdditionalDocuments,
  ] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // VARIABLES
  const storeCode = searchParams.get("code");
  const headers = {
    [AUTHORIZATION]: `Bearer ${
      cookies.get(CLIENT_USER_INFO, {
        path: "/",
      }).credentialToken.accessToken
    }`,
    [X_SID]: cookies.get(CLIENT_USER_INFO, {
      path: "/",
    }).sid,
  };
  const endpoints = [
    {
      headers: headers,
      endpoint: process.env.REACT_APP_ZEUS_SERVICE,
      url: URL_GET_ADD_CATALOGUE_DATA(storeCode),
    },
    {
      headers: headers,
      endpoint: process.env.REACT_APP_ZEUS_SERVICE,
      url: URL_GET_CATEGORIES,
    },
    {
      headers: headers,
      endpoint: process.env.REACT_APP_ZEUS_SERVICE,
      url: URL_GET_COURIERS,
    },
  ];

  // FUNCTIONS SPECIFIC //
  function handleGoBackDashboard(navigate) {
    navigate(`/dashboard`);
  }

  function handleAddComponent(field, defaultValue) {
    const temp = { ...data };
    temp[field].push(defaultValue);
    setData(temp);
  }

  function handleTextChange(field, event) {
    const temp = { ...data };
    temp[field] = event.target.value;
    setData(temp);
  }

  function handleValueChange(field, value) {
    const temp = { ...data };
    temp[field] = value;
    setData(temp);
  }

  function handleCourierChange(value, index) {
    const temp = { ...data };
    temp.courierChoosen[index] = value;
    setData(temp);
  }

  function handleSetFetchedDatas(array) {
    let newFetchedDatas = { ...fetchedDatas };
    let fetchedCatalogues = array[0].responseData.map(
      (obj) => obj.catalogueName
    );
    let fetchedCategories = array[1].responseData.map(
      (obj) => obj.categoryName
    );
    let fetchedCouriers = array[2].responseData.map(
      (obj) => obj.courierName
    );

    newFetchedDatas = {
      datas: {
        catalogues: array[0],
        categories: array[1],
        couriers: array[2],
      },
      dropdowns: {
        catalogues:
          fetchedCatalogues.length === 0
            ? [NO_DATA]
            : fetchedCatalogues,
        categories:
          fetchedCategories.length === 0
            ? [NO_DATA]
            : fetchedCategories,
        couriers:
          fetchedCouriers.length === 0
            ? [NO_DATA]
            : fetchedCouriers,
      },
    };

    setFetchedDatas(newFetchedDatas);
  }

  function handleAgreementCheck() {
    setAgreementCheckbox(!agreementCheckbox);
  }

  function handleCreateFormData() {
    const formData = new FormData();
    const formProductCategory =
      fetchedDatas.datas.categories.responseData.filter(
        (val) => val.categoryName === data.productCategory
      )[0];
    const formProductCatalog =
      fetchedDatas.dropdowns.catalogues.filter(
        (val) => val === data.productCatalog
      )[0];

    formData.append("productName", data.productName);
    formData.append(
      "productCategory",
      JSON.stringify(formProductCategory)
    );
    formData.append("productCatalog", formProductCatalog);
    formData.append(
      "productDescription",
      data.productDescription
    );
    formData.append("productHashtag", data.productHashtag);
    formData.append(
      "productCondition",
      data.productCondition
    );
    formData.append("productWeight", data.productWeight);
    formData.append("productPrice", data.productPrice);
    formData.append("productStocks", data.productStocks);
    formData.append(
      "productSafetyStocks",
      data.productSafetyStocks
    );
    formData.append(
      "courierChoosen",
      JSON.stringify(data.courierChoosen)
    );
    formData.append(
      "newCatalogues",
      JSON.stringify(
        fetchedDatas.datas.catalogues.responseData
      )
    );

    const maxLengthUpload =
      productPictures.length >= additionalDocuments
        ? productPictures.length
        : additionalDocuments.length;

    for (var i = 0; maxLengthUpload > i; i++) {
      productPictures[i] &&
        formData.append(
          "uploadedImageFiles",
          b64toBlob(productPictures[i].base64),
          productPictures[i].name
        );
      additionalDocuments[i] &&
        formData.append(
          "uploadedAdditionalFiles",
          b64toBlob(additionalDocuments[i].base64),
          additionalDocuments[i].name
        );
    }

    return formData;
  }

  async function handleSubmit() {
    // Validate the form submission
    if (!agreementCheckbox)
      return handleErrorMessage(
        { errorContent: AGREEMENT_CHECKBOX_UNCHECKED },
        setErrorMessage,
        setErrorModalToggle,
        errorModalToggle
      );

    // Process raw data and base64s to be sent via POST request
    const formData = handleCreateFormData();

    // Post data
    trackPromise(
      zeusService
        .postDataWithOnRequestInterceptors(
          {
            endpoint: process.env.REACT_APP_ZEUS_SERVICE,
            url: URL_POST_ADD_STORE_CATALOGUE(storeCode),
            headers: {
              ...headers,
              [CONTENT_TYPE]: "multipart/form-data",
            },
            data: formData,
          },
          async () => {
            const result = await checkAuthAndRefresh(
              zeusService,
              cookies
            );

            return result;
          }
        )
        .then((res) => {
          if (res.responseStatus === 200) {
          }
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
              setErrorModalToggle,
              errorModalToggle
            );
        })
    );
  }

  // COMPONENTS SPECIFIC //
  const ShowSubmitNewModal = (props) => {
    // COMPONENT HOOKS
    const [tempCatalogue, setTempCatalogue] =
      useState(NO_STRING);

    // COMPONENT FUNCTIONS
    function handleCatalogueSubmit() {
      if (!tempCatalogue)
        return handleErrorMessage(
          { errorContent: INPUT_NEW_CATALOGUE_VALUE },
          setErrorMessage,
          setErrorModalToggle,
          errorModalToggle
        );

      let newFetchedDatas = { ...fetchedDatas };
      let newDropdowns =
        newFetchedDatas.dropdowns.catalogues.filter(
          (val) => val !== NO_DATA
        );
      newDropdowns.push(tempCatalogue);
      newFetchedDatas.dropdowns.catalogues = newDropdowns;
      newFetchedDatas.datas.catalogues.responseData.push({
        id: uuidv4(),
        catalogueName: tempCatalogue,
      });
      setFetchedDatas(newFetchedDatas);
      handleOpenModal(
        props.setModalToggle,
        props.modalToggle
      );
    }

    // RENDER
    return (
      <div className="add-catalogue-modal-container dark-bg-color">
        <div className="add-catalogue-modal-wrapper">
          <Button
            onClick={() =>
              handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end add-catalogue-button red-bg-color">
            <h4 className="add-catalogue-button-text">X</h4>
          </Button>
          <br />
          <h2 className="margin-top-0 margin-bottom-12-18">
            Tambah{" "}
            <span className="main-color">
              {props.title}
            </span>
          </h2>
          <h3 className="margin-top-0">
            Belum ada{" "}
            <span className="main-color">katalog</span> yang
            pas buat{" "}
            <span className="main-color">produk</span> di
            tokomu? <br />{" "}
            <span className="main-color">tambahin</span>{" "}
            dulu yuk !
          </h3>
          <div className="add-catalogue-textinput-box">
            <label className="add-catalogue-input-title margin-0">
              Nama Katalog
            </label>
            <TextInput
              value={tempCatalogue}
              onChange={(e) =>
                setTempCatalogue(e.target.value)
              }
              type="text"
              className="align-self-center add-catalogue-textinput darker-bg-color"
            />
          </div>
          <br />
          <Button
            onClick={() => handleCatalogueSubmit()}
            className="align-self-center add-catalogue-button main-bg-color">
            <h4 className="add-catalogue-button-text">
              Submit
            </h4>
          </Button>
        </div>
      </div>
    );
  };

  const ShowUploadModal = () => {
    return (
      <div className="add-catalogue-modal-container dark-bg-color">
        <div className="add-catalogue-modal-wrapper">
          <Button
            onClick={() =>
              handleOpenModal(setModalToggle, modalToggle)
            }
            className="align-self-end add-catalogue-button red-bg-color">
            <h4 className="add-catalogue-button-text">X</h4>
          </Button>
          <br />
          <h2 className="margin-top-0 margin-bottom-12-18">
            Upload <span className="main-color">foto</span>{" "}
            untuk produkmu disini
          </h2>
          <MultiUpload
            formName={ADD_CATALOGUE_FORM}
            base64s={productPictures}
            setBase64s={setProductPictures}
            rejected={rejectedProductPictures}
            setRejected={setRejectedProductPictures}
            maxLength={5}
            maxSize={5 * 1000 * 1000} //5mb
            extensions={JPEG_PNG}
            label={GENERAL_MULTIUPLOAD_LABEL}
            subLabel={GENERAL_MULTIUPLOAD_SUBLABEL(
              JPEG_PNG
            )}
            additionalElement={
              <span className="red-color">MAX 5 FILE</span>
            }
            onDrop={() => {
              handleOpenModal(setModalToggle, modalToggle);
            }}
          />
        </div>
      </div>
    );
  };

  const ShowErrorModal = () => {
    return (
      <div className="add-catalogue-modal-container dark-bg-color">
        <div className="add-catalogue-modal-wrapper">
          <Button
            onClick={() =>
              handleOpenModal(
                setErrorModalToggle,
                errorModalToggle
              )
            }
            className="align-self-end add-catalogue-modal-button red-bg-color">
            <h4 className="add-catalogue-modal-button-text">
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

  useEffect(() => {
    async function init() {
      trackPromise(
        zeusService
          .getAllDataWithOnRequestInterceptors(
            endpoints,
            async () => {
              const result = await checkAuthAndRefresh(
                zeusService,
                cookies
              );

              return result;
            }
          )
          .then((result) => {
            if (result.responseStatus === 200)
              handleSetFetchedDatas(result.responseData);
          })
          .catch((error) => {
            if (error.responseStatus === 500)
              handleError500();
            if (
              error.responseStatus === 401 ||
              error.responseStatus === 403
            ) {
              cookies.remove(CLIENT_USER_INFO, {
                path: "/",
              });
              handleOpenOverridingHome(LOGIN);
            } else
              handleErrorMessage(
                error,
                setErrorMessage,
                setErrorModalToggle,
                errorModalToggle
              );
          })
      );
    }
    trackPromise(init());
  }, []);

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(
            setModalCatalogueToggle,
            modalCatalogueToggle
          )
        }
        toggle={modalCatalogueToggle}>
        <ShowSubmitNewModal
          title="Katalog"
          setModalToggle={setModalCatalogueToggle}
          modalToggle={modalCatalogueToggle}
        />
      </Modal>
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(setModalToggle, modalToggle)
        }
        toggle={modalToggle}>
        <ShowUploadModal />
      </Modal>
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(
            setErrorModalToggle,
            errorModalToggle
          )
        }
        toggle={errorModalToggle}>
        <ShowErrorModal />
      </Modal>
      <div className="add-catalogue-container">
        <div className="add-catalogue-wrapper">
          <div className="add-catalogue-text-container">
            <div className="add-catalogue-text-wrapper">
              <br />
              <Button
                style={{ paddingLeft: "0px" }}
                onClick={() =>
                  handleGoBackDashboard(navigate)
                }
                className="align-self-start add-catalogue-button darker-bg-color">
                <h4 className="add-catalogue-button-back-text">
                  Go back
                </h4>
              </Button>
              <h2 className="margin-bottom-12-18">
                Ayo beri tahu kami{" "}
                <span className="main-color">
                  informasi produkmu
                </span>
              </h2>
              <h3 className="margin-top-0">
                Kita mulai dari{" "}
                <span className="main-color">nama</span>{" "}
                produkmu dulu yuk !
              </h3>
              <div className="add-catalogue-textinput-box">
                <TextInput
                  value={data.productName}
                  onChange={(e) =>
                    handleTextChange("productName", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <br />
              <h3 className="margin-top-0 margin-bottom-12-18">
                Produkmu masuk kedalam{" "}
                <span className="main-color">kategori</span>{" "}
                apa ?
              </h3>
              <div className="add-catalogue-textinput-box margin-top-0">
                <Dropdown
                  onChange={(value) =>
                    handleValueChange(
                      "productCategory",
                      value
                    )
                  }
                  style={{
                    marginRight: "8px",
                    width: "150px",
                    maxWidth: "150px",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.productCategory}
                  values={fetchedDatas.dropdowns.categories}
                />
              </div>
              <br />
              <br />
              <h3 className="margin-top-0 margin-bottom-12-18">
                Kamu harus memasukan{" "}
                <span className="main-color">produkmu</span>{" "}
                sesuai dengan{" "}
                <span className="main-color">katalog</span>{" "}
                yang kamu inginkan
              </h3>
              <div className="add-catalogue-textinput-box margin-top-0">
                <Dropdown
                  onChange={(value) =>
                    handleValueChange(
                      "productCatalog",
                      value
                    )
                  }
                  style={{
                    marginRight: "8px",
                    width: "150px",
                    maxWidth: "150px",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.productCatalog}
                  values={fetchedDatas.dropdowns.catalogues}
                />
                <Button
                  onClick={() =>
                    handleOpenModal(
                      setModalCatalogueToggle,
                      modalCatalogueToggle
                    )
                  }
                  className="margin-top-0 align-self-end add-catalogue-button main-bg-color">
                  <h4 className="add-catalogue-button-text">
                    +
                  </h4>
                </Button>
              </div>
              <br />
              <h3 className="margin-top-0 margin-bottom-0">
                Upload{" "}
                <span className="main-color">foto</span>{" "}
                produkmu{" "}
                <span className="main-color">disini</span>{" "}
                ya
              </h3>
              <AcceptedFileItems
                base64s={productPictures}
                setBase64s={setProductPictures}
              />
              <FileRejectionItems
                rejected={rejectedProductPictures}
              />
              <div className="add-catalogue-textinput-box margin-top-0">
                <Button
                  onClick={() =>
                    handleOpenModal(
                      setModalToggle,
                      modalToggle
                    )
                  }
                  className="align-self-end add-catalogue-button main-bg-color">
                  <h4 className="add-catalogue-button-text">
                    +
                  </h4>
                </Button>
              </div>
              <br />
              <h2 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">
                  detail produk
                </span>
              </h2>
              <h3 className="margin-top-0 margin-bottom-12-18">
                Selanjutnya kasih tau kita dulu yuk{" "}
                <span className="main-color">detail</span>{" "}
                informasi produkmu
              </h3>
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Deskripsi
                </label>
                <TextArea
                  className="add-catalogue-longtext-area"
                  value={data.productDescription}
                  onChange={(e) =>
                    handleTextChange(
                      "productDescription",
                      e
                    )
                  }
                  type="text"
                />
              </div>
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Hashtag
                </label>
                <TextInput
                  value={data.productHashtag}
                  onChange={(e) =>
                    handleTextChange("productHashtag", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <h3 className="margin-top-0 margin-bottom-12-18">
                Kondisi{" "}
                <span className="main-color">fisik</span>{" "}
                produkmu gimana nih sekarang ?
              </h3>
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Kondisi
                </label>
                <TextInput
                  value={data.productCondition}
                  onChange={(e) =>
                    handleTextChange("productCondition", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Berat
                </label>
                <TextInput
                  value={data.productWeight}
                  onChange={(e) =>
                    handleTextChange("productWeight", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <br />
              <h2 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">harga</span>
              </h2>
              <h3 className="margin-top-0 margin-bottom-12-18">
                Kira-kira{" "}
                <span className="main-color">harga</span>{" "}
                produkmu berapa nih ?
              </h3>
              <div className="add-catalogue-textinput-box">
                <TextInput
                  value={data.productPrice}
                  onChange={(e) =>
                    handleTextChange("productPrice", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <h2 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">stok</span>{" "}
                produk
              </h2>
              <h3 className="margin-top-0 margin-bottom-12-18">
                Sekarang kita atur{" "}
                <span className="main-color">stok</span>{" "}
                barang yang kamu lelang
              </h3>
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Stok
                </label>
                <TextInput
                  value={data.productStocks}
                  onChange={(e) =>
                    handleTextChange("productStocks", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Safety Stok
                </label>
                <TextInput
                  value={data.productSafetyStocks}
                  onChange={(e) =>
                    handleTextChange(
                      "productSafetyStocks",
                      e
                    )
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <br />
              <h2 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">kurir</span>{" "}
                pengantaran
              </h2>
              <h3 className="margin-top-0 margin-bottom-12-18">
                Kira-kira kurir mana nih yang boleh{" "}
                <span className="main-color">
                  nganterin
                </span>{" "}
                produkmu ke pemenang lelang ?
              </h3>
              {data.courierChoosen.map((val, index) => {
                return (
                  <div
                    key={`add-catalogue-product-courier-${index}`}
                    className="add-catalogue-textinput-box">
                    <label className="add-catalogue-input-title">
                      Pilih Kurir {index + 1}
                    </label>
                    <Dropdown
                      style={{
                        width: "75px",
                        maxWidth: "75px",
                      }}
                      onChange={(value) =>
                        handleCourierChange(value, index)
                      }
                      showTitle={false}
                      toggle={true}
                      value={val}
                      values={
                        fetchedDatas.dropdowns.couriers
                      }
                    />
                  </div>
                );
              })}
              <Button
                onClick={() =>
                  handleAddComponent(
                    "courierChoosen",
                    defaultCourier
                  )
                }
                className="align-self-end add-catalogue-button main-bg-color">
                <h4 className="add-catalogue-button-text">
                  +
                </h4>
              </Button>
              <br />
              <br />
              <h2 className="margin-bottom-12-18">
                Upload{" "}
                <span className="main-color">
                  file tambahan
                </span>
              </h2>
              <h3 className="margin-top-0 margin-bottom-12-18">
                Ini juga gak kalah penting nih, kamu bisa
                upload{" "}
                <span className="main-color">
                  file tambahan
                </span>{" "}
                untuk mendukung data informasi produkmu{" "}
                <span className="main-color">
                  (opsional)
                </span>
              </h3>
              <MultiUpload
                formName={ADD_CATALOGUE_FORM}
                customIcon={AgreementIcon}
                base64s={additionalDocuments}
                setBase64s={setAdditionalDocuments}
                rejected={rejectedAdditionalDocuments}
                setRejected={setRejectedAdditionalDocuments}
                maxLength={5}
                maxSize={5 * 1000 * 1000} //5mb
                extensions={PDF}
                label={GENERAL_MULTIUPLOAD_LABEL}
                subLabel={GENERAL_MULTIUPLOAD_SUBLABEL(PDF)}
                additionalElement={
                  <span className="red-color">
                    MAX 5 FILE
                  </span>
                }
              />
              <br />
              <br />
              <div className="add-catalogue-textinput-box">
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
                className="align-self-start add-catalogue-button main-bg-color">
                <h4 className="add-catalogue-button-text">
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
