import { Fragment, useMemo, useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import {
  handleError500,
  handleErrorMessage,
  handleOpenModal,
  handleOpenOverridingHome,
} from "../../../utils/functions/global";
import {
  setErrorModal,
  setFeatureModal,
} from "../../../utils/redux/reducers/creativeStore/creativeStoreReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CATEGORY,
  ADD_CHANNEL,
  ANNOUNCEMENT_CHANNEL,
  DELETE_CONFIRMATION,
  INVITE_PEOPLE,
  SETTING_CATEGORY,
  SETTING_CHANNEL,
  SETTING_SOCKET,
  TEXT_CHANNEL,
  VOICE_CHANNEL,
} from "../../../variables/constants/creativeStore";
import TextInput from "../../../components/TextInput";
import Checkbox from "../../../components/Checkbox";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  IS_OTP_VERIFIED,
  LOGIN,
  NO_STRING,
  URL_POST_CREATE_STORE_ROLE,
  X_SID,
} from "../../../variables/global";
import TrashIcon from "../../../assets/svg/trash-solid.svg";
import { trackPromise } from "react-promise-tracker";
import { useAxios } from "../../../utils/hooks/useAxios";
import { cookies } from "../../../config/cookie";
import { useSearchParams } from "react-router-dom";

function handleErrorNoAuthCheck({
  error,
  setErrorMessage,
  dispatch,
  errorModal,
}) {
  if (error.responseStatus === 500) handleError500();
  else
    handleErrorMessage(
      error,
      setErrorMessage,
      (toggle) => dispatch(setErrorModal(toggle)),
      errorModal
    );
}

function handleError({
  error,
  setErrorMessage,
  dispatch,
  errorModal,
}) {
  if (error.responseStatus === 500) handleError500();
  if (IS_NOT_AUTHENTICATE(error)) {
    cookies.remove(CLIENT_USER_INFO, { path: "/" });
    handleOpenOverridingHome(LOGIN);
  } else
    handleErrorMessage(
      error,
      setErrorMessage,
      (toggle) => dispatch(setErrorModal(toggle)),
      errorModal
    );
}

const ShowTrashIcon = (props) => (
  <Button
    onClick={props.onClick}
    className="align-self-start creative-store-button transparent-bg-color">
    <img
      style={{ width: 18, height: 18 }}
      src={TrashIcon}
      alt={"creative-store-trash-category"}
    />
  </Button>
);

export const ShowDeleteConfirmation = (props) => (
  <Fragment>
    <label>
      Dengan ini{" "}
      <span className="font-bold">{props.modalTitle}</span>{" "}
      ini akan kamu hapus, yakin mau hapus ?
    </label>
    <div className="breakline" />
    <Button
      onClick={() => {}}
      className="align-self-start creative-store-button red-bg-color">
      <p className="creative-store-button-text">Hapus</p>
    </Button>
  </Fragment>
);

export const ShowAddChannel = (props) => {
  const [checked, setChecked] = useState(NO_STRING);
  return (
    <Fragment>
      {props.children}
      <Checkbox
        onChange={() => setChecked(ANNOUNCEMENT_CHANNEL)}
        checked={checked === ANNOUNCEMENT_CHANNEL && true}
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
      <div className="breakline" />
      <div className="creative-store-row-button-wrapper full-width">
        <TextInput
          type="text"
          className="align-self-center creative-store-textinput darker-bg-color margin-right-8"
        />
        <Button
          onClick={() => {}}
          className="align-self-start creative-store-button main-bg-color">
          <p className="creative-store-button-text">
            Tambah
          </p>
        </Button>
      </div>
    </Fragment>
  );
};

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

export const ShowAddChannelModal = (props) =>
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
          <ShowAddChannel>
            <div className="breakline" />
            <h3 className="margin-top-0 margin-bottom-0">
              Tambah channel
            </h3>
            <p>
              Text atau voice channel untuk komunikasi antar
              member
            </p>
          </ShowAddChannel>
        </div>
      </div>
    ),
    [props.modalToggle]
  );

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
          <h3 className="margin-top-0 margin-bottom-0">
            Tambah kategori
          </h3>
          <p>
            Kategorikan text atau voice channel di creative
            store ini
          </p>
          <div className="creative-store-row-button-wrapper full-width">
            <TextInput
              type="text"
              className="align-self-center creative-store-textinput darker-bg-color margin-right-8"
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
          <h3 className="margin-top-0 margin-bottom-0">
            -Nama socket-
          </h3>
          <p>-Desc socket-</p>
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

export const ShowCategorySettingModal = (props) => {
  const modalTitle = props.title ?? "Kategori";
  const [selectedChannel, setSelectedChannel] =
    useState(ADD_CHANNEL);

  const ShowContent = () => {
    if (selectedChannel === ADD_CHANNEL)
      return <ShowAddChannel />;
    else if (selectedChannel === DELETE_CONFIRMATION)
      return (
        <ShowDeleteConfirmation modalTitle={modalTitle} />
      );
  };

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
          <div
            style={{ alignItems: "center" }}
            className="creative-store-row-button-wrapper full-width">
            <h3 className="margin-top-0 margin-bottom-0">
              {modalTitle}
            </h3>
            <ShowTrashIcon
              onClick={() =>
                setSelectedChannel(DELETE_CONFIRMATION)
              }
            />
          </div>
          <div className="breakline" />
          <label>
            Kamu bisa atur setting khusus untuk kategori ini
          </label>
          <div className="breakline" />
          <div className="creative-store-category-settings-container">
            <div className="creative-store-category-settings-wrapper">
              <Button
                onClick={() =>
                  setSelectedChannel(ADD_CHANNEL)
                }
                className="align-self-start creative-store-button main-bg-color margin-bottom-12 margin-right-8">
                <p className="creative-store-button-text">
                  Tambah channel
                </p>
              </Button>
              <Button
                onClick={() =>
                  setSelectedChannel(ADD_CHANNEL)
                }
                className="align-self-start creative-store-button main-bg-color margin-bottom-12 margin-right-8">
                <p className="creative-store-button-text">
                  Setting akses
                </p>
              </Button>
            </div>
            <hr
              className="creative-store-linebreak"
              style={{ width: "99%" }}
            />
            <div className="creative-store-category-settings-body margin-top-12">
              <ShowContent />
            </div>
          </div>
        </div>
      </div>
    ),
    [props.modalToggle, selectedChannel]
  );
};

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
          <h3 className="margin-top-0 margin-bottom-0">
            Invite member
          </h3>
          <p>
            <span className="main-color">Copy</span> link
            dibawah ini dan berikan ke orang yang ingin kamu
            undang kesini
          </p>
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

export const ShowAddRoleModal = (props) => {
  // HOOKS
  const axiosService = useAxios();
  const [searchParams] = useSearchParams();

  // VARIABLE
  const storeId = searchParams.get("id");
  const login = cookies.get(CLIENT_USER_INFO);
  const defaultHeader = {
    [AUTHORIZATION]: `Bearer ${login?.credentialToken?.accessToken}`,
    [X_SID]: login?.sid,
  };

  async function handleAddRole() {
    if (IS_OTP_VERIFIED(login)) {
      await axiosService
        .postData({
          headers: defaultHeader,
          endpoint: process.env.REACT_APP_ZEUS_SERVICE,
          url: URL_POST_CREATE_STORE_ROLE(storeId),
        })
        .then(() =>
          props.handleOpenModal(
            props.setModalToggle,
            props.modalToggle
          )
        )
        .catch((error) => handleError(error));
    }
  }

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
            Invite member
          </h3>
          <p>
            <span className="main-color">Copy</span> link
            dibawah ini dan berikan ke orang yang ingin kamu
            undang kesini
          </p>
          <div className="creative-store-row-button-wrapper full-width">
            <TextInput
              type="text"
              className="align-self-center creative-store-textinput margin-right-8 darker-bg-color"
              placeholder={window.location.href}
            />
            <Button
              onClick={() => trackPromise(handleAddRole())}
              className="align-self-start creative-store-button main-bg-color">
              <p className="creative-store-button-text">
                Tambah
              </p>
            </Button>
          </div>
        </div>
      </div>
    ),
    [props.modalToggle]
  );
};

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
          title={featureModal.title}
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
    [errorModal, featureModal, props.errorMessage]
  );
};
