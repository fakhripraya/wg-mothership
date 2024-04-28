import { Fragment } from "react";
import {
  JOINING_AUDIO,
  JOINING_AUDIO_URL,
  LEAVING_AUDIO,
  LEAVING_AUDIO_URL,
  MUTE_AUDIO,
  MUTE_AUDIO_URL,
  UNMUTE_AUDIO,
  UNMUTE_AUDIO_URL,
} from "../../../variables/constants/creativeStore";

export const ShowAudios = () => (
  <Fragment>
    <audio
      id={JOINING_AUDIO}
      src={JOINING_AUDIO_URL}
    />
    <audio
      id={LEAVING_AUDIO}
      src={LEAVING_AUDIO_URL}
    />
    <audio
      id={MUTE_AUDIO}
      src={MUTE_AUDIO_URL}
    />
    <audio
      id={UNMUTE_AUDIO}
      src={UNMUTE_AUDIO_URL}
    />
  </Fragment>
);
