import Avatar from "react-avatar";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../../components/DynamicDropdown";
import {
  INITIAL_PROVINCES,
  INITIAL_REGENCIES,
  INITIAL_DISTRICTS,
  INITIAL_VILLAGES,
} from "../../../variables/initial/global";
import { STORE_INITIAL_VALUE } from "../../../variables/initial/store";
import {
  handleShowDistrict,
  handleShowProvinces,
  handleShowRegencies,
  handleShowVillages,
} from "../../../utils/functions/asynchronous";
import { useEffect, useState } from "react";

export const ShowSettingTab = (props) => {
  // STATES
  const [data, setData] = useState(STORE_INITIAL_VALUE);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
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
  const [success, setSuccess] = useState(false);

  function handleTextChangeByValue(field, value) {
    const temp = { ...data };
    temp[field] = value;
    setData(temp);
  }

  // FUNCTIONS
  const errorHandler = () => {
    return {
      setErrorMessage,
      setModalToggle,
      modalToggle,
    };
  };

  useEffect(() => {
    (async () => {
      await handleShowProvinces(
        setProvinces,
        errorHandler()
      );
    })();
  }, []);

  return (
    <div className="creative-store-body-container">
      <div className="creative-store-body-header-container">
        <div className="creative-store-body-header-left">
          <h4>
            {props.isOpenSettingTab && "🔧︱Setting toko"}
          </h4>
        </div>
      </div>
      <div className="creative-store-setting-container">
        <Button
          onClick={props.functions.openSettingTab}
          className="align-self-end creative-store-setting-button red-bg-color">
          <h4 className="creative-store-setting-button-text">
            X
          </h4>
        </Button>
        <br />
        <h3 className="margin-top-0 margin-bottom-12-18">
          Setting Umum
          <span className="main-color">{props.title}</span>
        </h3>
        <label className="margin-top-0">
          Disini kalian bisa mengatur{" "}
          <span className="main-color">settingan umum</span>{" "}
          pada{" "}
          <span className="main-color">toko kalian</span>
          <br />
          monggo coba di{" "}
          <span className="main-color">
            utak-atik
          </span> dulu{" "}
        </label>
        <br />
        <label className="font-bold margin-top-0">
          Mau ubah <span className="main-color">nama</span>{" "}
          toko ?
        </label>
        <br />
        <div className="creative-store-setting-textinput-box margin-top-0">
          <TextInput
            type="text"
            className="align-self-center creative-store-setting-textinput dark-bg-color"
          />
        </div>
        <br />
        <br />
        <label className="font-bold margin-top-0">
          Mau ubah{" "}
          <span className="main-color">
            profile picture
          </span>{" "}
          toko ?
        </label>
        <br />
        <div className="creative-store-user-avatar-container align-self-start">
          <div className="creative-store-user-identifier-img-wrapper">
            <Avatar
              style={{ cursor: "pointer" }}
              round={true}
              size={150}
              title={"asdasd"}
              name={"asdasda"}
            />
            <br />
            <br />
            <Button>Ubah</Button>
          </div>
        </div>
        <br />
        <br />
        <label className="margin-top-0 font-bold">
          Mau ubah{" "}
          <span className="main-color">identitas</span> toko
          ?
        </label>
        <br />
        <div className="creative-store-setting-textinput-box">
          <label className="creative-store-setting-input-title margin-0">
            Deskripsi Toko
          </label>
          <TextInput
            type="text"
            className="align-self-center creative-store-setting-textinput dark-bg-color"
          />
        </div>
        <div className="creative-store-setting-textinput-box">
          <label className="creative-store-setting-input-title margin-0">
            No HP
          </label>
          <TextInput
            type="text"
            className="align-self-center creative-store-setting-textinput dark-bg-color"
          />
        </div>
        <div className="creative-store-setting-textinput-box">
          <label className="creative-store-setting-input-title margin-0">
            No Whatsapp
          </label>
          <TextInput
            type="text"
            className="align-self-center creative-store-setting-textinput dark-bg-color"
          />
        </div>
        <div className="creative-store-setting-textinput-box">
          <label className="creative-store-setting-input-title margin-0">
            Email
          </label>
          <TextInput
            type="text"
            className="align-self-center creative-store-setting-textinput dark-bg-color"
          />
        </div>
        <br />
        <br />
        <label className="margin-top-0 font-bold">
          Mau ubah{" "}
          <span className="main-color">alamat</span> toko ?
        </label>
        <br />
        <label className="margin-top-0">
          Pilih <span className="main-color">provinsi</span>
        </label>
        <br />
        <Dropdown
          onChange={(value) =>
            handleShowRegencies(
              value,
              {
                data,
                STORE_INITIAL_VALUE,
              },
              {
                setVillages,
                setDistricts,
                setRegencies,
                setData,
              },
              {
                setErrorMessage,
                setModalToggle,
                modalToggle,
              }
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
          <label className="margin-top-0">
            Pilih <span className="main-color">kota</span>
          </label>
          <br />
          <br />
          <Dropdown
            onChange={(value) =>
              handleShowDistrict(
                value,
                {
                  data,
                  STORE_INITIAL_VALUE,
                },
                {
                  setVillages,
                  setDistricts,
                  setData,
                },
                {
                  setErrorMessage,
                  setModalToggle,
                  modalToggle,
                }
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
          <label className="margin-top-0">
            Pilih{" "}
            <span className="main-color">kecamatan</span>
          </label>
          <br />
          <br />
          <Dropdown
            onChange={(value) =>
              handleShowVillages(
                value,
                {
                  data,
                  STORE_INITIAL_VALUE,
                },
                { setVillages, setData },
                {
                  setErrorMessage,
                  setModalToggle,
                  modalToggle,
                }
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
          <label className="margin-top-0">
            Pilih{" "}
            <span className="main-color">kelurahan</span>
          </label>
          <br />
          <br />
          <Dropdown
            onChange={(value) =>
              handleTextChangeByValue("storeVillage", value)
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
        <br />
        <div className="creative-store-setting-textinput-box margin-top-0">
          <label className="creative-store-setting-input-title margin-0">
            Alamat
          </label>
          <TextInput
            type="text"
            className="align-self-center creative-store-setting-textinput dark-bg-color"
          />
        </div>
        <div className="creative-store-setting-textinput-box">
          <label className="creative-store-setting-input-title margin-0">
            Kode Pos
          </label>
          <TextInput
            type="text"
            className="align-self-center creative-store-setting-textinput dark-bg-color"
          />
        </div>
        <br />
        <br />
        <Button
          onClick={() => {}}
          className="align-self-start add-store-button main-bg-color">
          <p className="add-store-button-text">Submit</p>
        </Button>
        <br />
      </div>
    </div>
  );
};
