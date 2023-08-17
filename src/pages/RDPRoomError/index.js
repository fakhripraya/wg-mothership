import React, { useEffect } from "react";
import "./style.scss";
import Button from "../../components/Button";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  RDPFailButton,
  RDPFailMessage,
} from "../../utils/functions/rdp";

export default function RDPRoomError() {
  // HOOKS //
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  // VARIABLES //
  const reason = searchParams.get("reason");

  // FUNCTIONS SPECIFIC //
  function handleGoBack() {
    navigate(`/rdp`);
  }

  // COMPONENT SPECIFIC //
  const ShowErrorMessage = () => {
    const errorMessage = RDPFailMessage(reason);
    return (
      <h4 className="margin-top-0 margin-bottom-12-18">
        {errorMessage}
      </h4>
    );
  };

  const ShowErrorButton = () => RDPFailButton(reason);

  useEffect(() => {
    // Scroll window to top
    window.scrollTo(0, 0);
    // set the overflow to hidden specific for rdp page
    window.document.getElementsByTagName(
      "html"
    )[0].style.overflow = "hidden";

    // return the overflow to the default value
    return () =>
      (window.document.getElementsByTagName(
        "html"
      )[0].style.overflow = "auto");
  }, []);

  return (
    <div className="rdp-room-error-container">
      <div className="rdp-room-error-wrapper">
        <div className="rdp-room-error-textinput-box">
          <h3 className="rdp-room-error-input-title">
            Oh no,{" "}
            <span className="red-color">
              something's not right
            </span>
          </h3>
          <ShowErrorMessage />
          <div className="rdp-room-error-button-wrapper">
            <Button
              onClick={() => handleGoBack()}
              className="rdp-room-error-button-back">
              Back
            </Button>
            <ShowErrorButton />
          </div>
        </div>
      </div>
    </div>
  );
}
