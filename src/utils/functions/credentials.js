import { trackPromise } from "react-promise-tracker";
import { URL_GET_GOOGLE_URL } from "../../variables/global";
import {
  delayInMilliSecond,
  handleErrorMessage,
} from "./global";

export function handlePostGoogleAuth(
  credentialService,
  setErrorMessage,
  setModalToggle,
  modalToggle
) {
  trackPromise(
    credentialService
      .getData({
        endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
        url: URL_GET_GOOGLE_URL,
      })
      .then(async (result) => {
        window.location.replace(result.responseData);
        await delayInMilliSecond(10000);
      })
      .catch((error) => {
        return handleErrorMessage(
          error,
          setErrorMessage,
          setModalToggle,
          modalToggle
        );
      })
  );
}
