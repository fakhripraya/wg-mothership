import { Fragment, useMemo, useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { handleOpenModal } from "../../../utils/functions/global";
import {
  setErrorModal,
  setFeatureModal,
} from "../../../utils/redux/reducers/creativeStore/creativeStoreReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CATEGORY,
  ADD_CHANNEL,
  ANNOUNCEMENT_CHANNEL,
  INVITE_PEOPLE,
  SETTING_CATEGORY,
  SETTING_CHANNEL,
  SETTING_SOCKET,
  TEXT_CHANNEL,
  VOICE_CHANNEL,
} from "../../../variables/constants/creativeStore";
import TextInput from "../../../components/TextInput";
import Checkbox from "../../../components/Checkbox";
import { NO_STRING } from "../../../variables/global";

export const ShowErrorModal = (props) =>
  useMemo(
    () => (
      <div className="creative-store-modal-container dark-bg-color">
        <div className="creative-store-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end creative-store-modal-button red-bg-color">
            <h4 className="creative-store-modal-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            There is an{" "}
            <span className="red-color">ERROR</span>
          </h3>
          <div className="breakline" />
          <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
            {props.errorMessage}
          </label>
        </div>
      </div>
    ),
    [props.modalToggle, props.errorMessage]
  );

export const ShowAddChannelModal = (props) => {
  const [checked, setChecked] = useState(NO_STRING);
  return useMemo(
    () => (
      <div className="creative-store-modal-container dark-bg-color">
        <div className="creative-store-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end creative-store-modal-button red-bg-color">
            <h4 className="creative-store-modal-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-0">
            Tambah channel
          </h3>
          <p>
            Text atau voice channel untuk komunikasi antar
            member
          </p>
          <div className="breakline" />
          <Checkbox
            onChange={() =>
              setChecked(ANNOUNCEMENT_CHANNEL)
            }
            checked={
              checked === ANNOUNCEMENT_CHANNEL && true
            }
            className="margin-bottom-8"
            title="Announcement Channel"
          />
          <Checkbox
            onChange={() => setChecked(TEXT_CHANNEL)}
            checked={checked === TEXT_CHANNEL && true}
            className="margin-bottom-8"
            title="Text Channel"
          />
          <Checkbox
            onChange={() => setChecked(VOICE_CHANNEL)}
            checked={checked === VOICE_CHANNEL && true}
            title="Voice Channel"
          />
          <TextInput
            type="text"
            className="creative-store-textinput darker-bg-color margin-top-bottom-12-18"
          />
          <Button
            onClick={() => {}}
            className="align-self-start creative-store-button main-bg-color">
            <p className="creative-store-button-text">
              Tambah
            </p>
          </Button>
        </div>
      </div>
    ),
    [props.modalToggle, checked]
  );
};

export const ShowAddCategoryModal = (props) =>
  useMemo(
    () => (
      <div className="creative-store-modal-container dark-bg-color">
        <div className="creative-store-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end creative-store-modal-button red-bg-color">
            <h4 className="creative-store-modal-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            Tambah kategori
          </h3>
          <label>
            Kategorikan text atau voice channel di creative
            store ini
          </label>
          <div className="breakline" />
          <TextInput
            type="text"
            className="creative-store-textinput darker-bg-color margin-top-bottom-12-18"
          />
          <Button
            onClick={() => {}}
            className="align-self-start creative-store-button main-bg-color">
            <p className="creative-store-button-text">
              Tambah
            </p>
          </Button>
        </div>
      </div>
    ),
    [props.modalToggle]
  );

export const ShowSocketSettingModal = (props) =>
  useMemo(
    () => (
      <div className="creative-store-modal-container dark-bg-color">
        <div className="creative-store-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end creative-store-modal-button red-bg-color">
            <h4 className="creative-store-modal-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            -Nama socket-
          </h3>
          <label>-Desc socket-</label>
          <div className="breakline" />
          <div>
            <label className="font-bold">Roles</label>
            <div className="breakline" />
            <div>
              <ul>
                <li>Role 1</li>
                <li>Role 2</li>
                <li>Role 3</li>
                <li>Role 4</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    [props.modalToggle]
  );

export const ShowChannelSettingModal = (props) =>
  useMemo(
    () => (
      <div className="creative-store-modal-container dark-bg-color">
        <div className="creative-store-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end creative-store-modal-button red-bg-color">
            <h4 className="creative-store-modal-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            Setting channel
          </h3>
          <label>
            Kamu bisa atur setting khusus untuk channel ini
          </label>
          <div className="breakline" />
          <Button
            onClick={() => {}}
            className="align-self-start creative-store-button main-bg-color full-width margin-bottom-8">
            <p className="creative-store-button-text">
              Setting akses
            </p>
          </Button>
          <Button
            onClick={() => {}}
            className="align-self-start creative-store-button main-bg-color full-width">
            <p className="creative-store-button-text">
              Hapus channel
            </p>
          </Button>
        </div>
      </div>
    ),
    [props.modalToggle]
  );

export const ShowCategorySettingModal = (props) =>
  useMemo(
    () => (
      <div className="creative-store-modal-container dark-bg-color">
        <div className="creative-store-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end creative-store-modal-button red-bg-color">
            <h4 className="creative-store-modal-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            Setting kategori
          </h3>
          <label>
            Kamu bisa atur setting khusus untuk kategori ini
          </label>
          <div className="breakline" />
          <Button
            onClick={() => {}}
            className="align-self-start creative-store-button main-bg-color full-width margin-bottom-8">
            <p className="creative-store-button-text">
              Tambah channel
            </p>
          </Button>
          <Button
            onClick={() => {}}
            className="align-self-start creative-store-button main-bg-color full-width margin-bottom-8">
            <p className="creative-store-button-text">
              Setting akses
            </p>
          </Button>
          <Button
            onClick={() => {}}
            className="align-self-start creative-store-button main-bg-color full-width">
            <p className="creative-store-button-text">
              Hapus kategori
            </p>
          </Button>
        </div>
      </div>
    ),
    [props.modalToggle]
  );

export const ShowInviteModal = (props) =>
  useMemo(
    () => (
      <div className="creative-store-modal-container dark-bg-color">
        <div className="creative-store-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end creative-store-modal-button red-bg-color">
            <h4 className="creative-store-modal-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            Invite member
          </h3>
          <label>
            <span className="main-color">Copy</span> link
            dibawah ini dan berikan ke orang yang ingin kamu
            undang kesini
          </label>
          <div className="breakline" />
          <div className="breakline" />
          <div className="creative-store-row-button-wrapper full-width">
            <TextInput
              type="text"
              className="align-self-center creative-store-textinput margin-right-8 darker-bg-color"
              placeholder={window.location.href}
            />
            <Button
              onClick={() => {}}
              className="align-self-start creative-store-button main-bg-color">
              <p className="creative-store-button-text">
                Copy
              </p>
            </Button>
          </div>
        </div>
      </div>
    ),
    [props.modalToggle]
  );

export const ShowModals = (props) => {
  // Hooks
  const dispatch = useDispatch();

  // Selectors
  const errorModal = useSelector(
    (state) => state.creativeStore.errorModal
  );
  const featureModal = useSelector(
    (state) => state.creativeStore.featureModal
  );

  // Functions
  const setFeatureModalToggle = (toggle) =>
    dispatch(setFeatureModal(toggle));

  const setErrorModalToggle = (toggle) =>
    dispatch(setErrorModal(toggle));

  const ModalComponents = () => {
    if (featureModal.modal === ADD_CHANNEL)
      return (
        <ShowAddChannelModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setFeatureModalToggle}
          modalToggle={featureModal.toggle}
        />
      );
    else if (featureModal.modal === ADD_CATEGORY)
      return (
        <ShowAddCategoryModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setFeatureModalToggle}
          modalToggle={featureModal.toggle}
        />
      );
    else if (featureModal.modal === INVITE_PEOPLE)
      return (
        <ShowInviteModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setFeatureModalToggle}
          modalToggle={featureModal.toggle}
        />
      );
    else if (featureModal.modal === SETTING_SOCKET)
      return (
        <ShowSocketSettingModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setFeatureModalToggle}
          modalToggle={featureModal.toggle}
        />
      );
    else if (featureModal.modal === SETTING_CHANNEL)
      return (
        <ShowChannelSettingModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setFeatureModalToggle}
          modalToggle={featureModal.toggle}
        />
      );
    else if (featureModal.modal === SETTING_CATEGORY)
      return (
        <ShowCategorySettingModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setFeatureModalToggle}
          modalToggle={featureModal.toggle}
        />
      );
    else return <Fragment />;
  };

  return useMemo(
    () => (
      <Fragment>
        <Modal
          className="dark-bg-color"
          clicked={() =>
            handleOpenModal(setErrorModalToggle, errorModal)
          }
          toggle={errorModal}>
          <ShowErrorModal
            handleOpenModal={handleOpenModal}
            setModalToggle={setErrorModalToggle}
            modalToggle={errorModal}
            errorMessage={props.errorMessage}
          />
        </Modal>
        <Modal
          className="dark-bg-color"
          clicked={() =>
            handleOpenModal(
              setFeatureModalToggle,
              featureModal.toggle
            )
          }
          toggle={featureModal.toggle}>
          <ModalComponents />
        </Modal>
      </Fragment>
    ),
    [errorModal, featureModal]
  );
};
