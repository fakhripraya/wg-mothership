import AudioMasuk from "../../assets/audio/user-in.mp3";
import KeluarMasuk from "../../assets/audio/user-out.mp3";
import RemoteIn from "../../assets/audio/remote-in.mp3";
import RemoteOut from "../../assets/audio/remote-out.mp3";
import {
  setFeatureModal,
  setOpenTab,
} from "../../utils/redux/reducers/creativeStore/creativeStoreReducer";

// LIST OF COLOR
export const ROLE_PRESET_COLORS = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#e91e63",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#95a5a6",
  "#607d8b",
  "#11806a",
  "#1f8b4c",
  "#206694",
  "#71368a",
  "#ad1457",
  "#c27c0e",
  "#a84300",
  "#992d22",
  "#979c9f",
  "#546e7a",
];

// URI
export const JOINING_AUDIO_URL = AudioMasuk;
export const LEAVING_AUDIO_URL = KeluarMasuk;
export const REMOTE_PEER_JOINING_AUDIO_URL = RemoteIn;
export const REMOTE_PEER_LEAVING_AUDIO_URL = RemoteOut;
export const MUTE_AUDIO_URL = `http://www.sousound.com/music/healing/healing_01.mp3`;
export const UNMUTE_AUDIO_URL = `http://www.sousound.com/music/healing/healing_01.mp3`;

// IDs
export const JOINING_AUDIO = "JOINING_AUDIO";
export const LEAVING_AUDIO = "LEAVING_AUDIO";
export const MUTE_AUDIO = "MUTE_AUDIO";
export const UNMUTE_AUDIO = "UNMUTE_AUDIO";

// GENERAL
export const TEXT = "TEXT";
export const VOICE = "VOICE";
export const LIVE_SPACE = "LIVE_SPACE";
export const CONNECTED = "CONNECTED";
export const CONNECTING = "CONNECTING";
export const DISCONNECTING = "DISCONNECTING";
export const DISCONNECTED = "DISCONNECTED";

// CHANNEL TYPES
export const ANNOUNCEMENT_CHANNEL = "ANNOUNCEMENT_CHANNEL";
export const TEXT_CHANNEL = "TEXT_CHANNEL";
export const VOICE_CHANNEL = "VOICE_CHANNEL";

// RIGHT SIDE PANEL
export const VISITORS = "VISITORS";
export const TRANSACTION_ORDERS = "TRANSACTION_ORDERS";

// CREATIVE STORE TABS
export const CREATIVE_STORE_SETTING =
  "CREATIVE_STORE_SETTING";
export const PERMISSION_SETTING = "PERMISSION_SETTING";

// MODAL NAME
export const ADD_CHANNEL = "ADD_CHANNEL";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const SETTING_SOCKET = "SETTING_SOCKET";
export const SETTING_CHANNEL = "SETTING_CHANNEL";
export const SETTING_CATEGORY = "SETTING_CATEGORY";
export const INVITE_PEOPLE = "INVITE_PEOPLE";

export const CREATIVE_STORE_TABS = (props) => [
  {
    onClick: () => {
      props.dispatch(setOpenTab(CREATIVE_STORE_SETTING));
    },
    title: "Setting Toko",
    iconClass:
      "creative-store-icon-button creative-store-gear-button",
  },
  {
    onClick: () => {
      props.dispatch(setOpenTab(PERMISSION_SETTING));
    },
    title: "Setting Akses",
    iconClass:
      "creative-store-icon-button creative-store-key-button",
  },
  {
    onClick: () => {
      props.dispatch(
        setFeatureModal({
          modal: ADD_CHANNEL,
          toggle: true,
        })
      );
    },
    title: "Tambah Channel",
    iconClass:
      "creative-store-icon-button creative-store-add-button",
  },
  {
    onClick: () => {
      props.dispatch(
        setFeatureModal({
          modal: ADD_CATEGORY,
          toggle: true,
        })
      );
    },
    title: "Tambah Kategori",
    iconClass:
      "creative-store-icon-button creative-store-add-button",
  },
  {
    onClick: () => {
      props.dispatch(
        setFeatureModal({
          modal: INVITE_PEOPLE,
          toggle: true,
        })
      );
    },
    title: "Invite Yang Lain",
    iconClass:
      "creative-store-icon-button creative-store-invite-button",
  },
];
