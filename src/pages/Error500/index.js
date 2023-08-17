import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./style.scss";

export default function Error500() {
  const navigate = useNavigate();
  return (
    <div className="error500-container">
      <div className="error500-wrapper">
        <div className="error500-title">
          <h2 className="margin-bottom-0 red-color">
            ERROR 500
          </h2>
          <h3>
            Our server is under{" "}
            <span className="main-color">maintenance</span>{" "}
            <br />
            If this <span className="red-color">
              error
            </span>{" "}
            still showing within{" "}
            <span className="main-color">an hour</span>,
            please contact support immediately
          </h3>
          <Button onClick={() => navigate("/")}>
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
