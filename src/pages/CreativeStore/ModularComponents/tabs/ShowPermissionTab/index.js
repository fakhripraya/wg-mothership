import { Fragment } from "react";
import Button from "../../../../../components/Button";
import "./style.scss";

export const ShowPermissionTab = (props) => {
  return (
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
            <div className="creative-store-access-header">
              <label className="font-bold main-color">
                Daftar Role
              </label>
            </div>
            <Fragment>
              <div className="breakline" />
              <div className="creative-store-role-element">
                <Button className="fit-width">
                  Seluruh Anggota
                </Button>
              </div>
              <div className="breakline" />
              <div className="creative-store-role-element">
                <Button className="fit-width">
                  Staff Level 1
                </Button>
              </div>
            </Fragment>
          </div>
          <div className="creative-store-access-container">
            <div className="creative-store-access-header">
              <label className="font-bold main-color">
                Daftar Akses
              </label>
              <label
                onClick={() => {}}
                className="red-color cursor-pointer">
                Reset default
              </label>
            </div>
            <div>color</div>
            <Fragment>
              <div className="creative-store-access-element">
                <p className="creative-store-access-element-item-title">
                  View Channel
                </p>
                <label className="creative-store-access-element-item-description">
                  Allows members to view channels by default
                  (excluding private channels).
                </label>
                <div className="creative-store-access-element-item-tools">
                  <Button>add</Button>
                </div>
              </div>
              <div className="creative-store-access-element">
                <p className="creative-store-access-element-item-title">
                  Send Message
                </p>
                <label className="creative-store-access-element-item-description">
                  Allows members to send messages in text
                  channels.
                </label>
                <div className="creative-store-access-element-item-tools">
                  <Button>add</Button>
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};
