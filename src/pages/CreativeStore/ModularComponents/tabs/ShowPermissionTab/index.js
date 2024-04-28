import "./style.scss";
import { Fragment } from "react";
import Button from "../../../../../components/Button";
import { ROLE_PRESET_COLORS } from "../../../../../variables/constants/creativeStore";
import TextInput from "../../../../../components/TextInput";

export const ShowListOfColors = () => (
  <div className="creative-store-list-of-color-wrapped-container">
    {ROLE_PRESET_COLORS.map((val) => {
      return (
        <div
          className="creative-store-list-of-color-item cursor-pointer"
          style={{ backgroundColor: val }}
        />
      );
    })}
  </div>
);

export const ShowListOfPermissions = () => (
  <Fragment>
    <div className="creative-store-edit-element">
      <p className="creative-store-edit-element-item-title font-bold">
        View Channel
      </p>
      <label className="creative-store-edit-element-item-description">
        Allows members to view channels by default
        (excluding private channels).
      </label>
      <div className="creative-store-edit-element-item-tools">
        <Button>add</Button>
      </div>
    </div>
    <div className="creative-store-edit-element">
      <p className="creative-store-edit-element-item-title font-bold">
        Send Message
      </p>
      <label className="creative-store-edit-element-item-description">
        Allows members to send messages in text channels.
      </label>
      <div className="creative-store-edit-element-item-tools">
        <Button>add</Button>
      </div>
    </div>
  </Fragment>
);

export const ShowListOfRoles = () => (
  <Fragment>
    <div className="breakline" />
    <div className="creative-store-role-element">
      <span>Seluruh Anggota</span>
    </div>
    <div className="breakline" />
    <div className="creative-store-role-element">
      <span>Staff Level 1</span>
    </div>
  </Fragment>
);

export const ShowPermissionTab = (props) => (
  <div className="creative-store-body-container">
    <div className="creative-store-body-header-container">
      <div className="creative-store-body-header-left">
        <h4>{"🔑︱Setting Akses"}</h4>
      </div>
    </div>
    <p className="font-bold main-color">Akses umum</p>
    <label className="margin-top-0">
      Atur <span className="main-color">akses toko</span>{" "}
      untuk member di tokomu
    </label>
    <div className="breakline" />
    <Button className="fit-width">Tambah Role</Button>
    <div
      style={{
        borderBottomLeftRadius: "1em",
        borderBottomRightRadius: "1em",
      }}
      className="creative-store-mainbody-container dark-bg-color">
      <div className="creative-store-permission">
        <div className="creative-store-role-container">
          <div className="creative-store-edit-header">
            <label className="font-bold main-color">
              Daftar Role
            </label>
          </div>
          <ShowListOfRoles />
        </div>
        <div className="creative-store-edit-container">
          <div className="creative-store-edit-header">
            <label className="font-bold main-color">
              Edit Akses
            </label>
            <label
              onClick={() => {}}
              className="red-color cursor-pointer">
              Reset default
            </label>
          </div>
          <div className="creative-store-edit-color-picker">
            <label className="font-bold margin-bottom-16">
              Nama Role
            </label>
            <TextInput
              type="text"
              className="margin-bottom-16 align-self-center creative-store-textinput darker-bg-color"
            />
            <label className="font-bold">Warna Role</label>
            <p>
              Members use the color of the highest role they
              have on the roles list.
            </p>
            <label>Choose a color:</label>
            <input
              className="margin-top-bottom-8 cursor-pointer"
              type="color"
            />
            <ShowListOfColors />
            <ShowListOfPermissions />
          </div>
        </div>
      </div>
    </div>
  </div>
);
