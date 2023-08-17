import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./style.scss";

export default function Error404() {
  const navigate = useNavigate();
  return (
    <div className="error404-container">
      <div className="error404-wrapper">
        <div className="error404-title">
          <h2 className="margin-bottom-0 red-color">
            ERROR 404
          </h2>
          <h3>
            This page is either{" "}
            <span className="red-color">not found</span> or
            is under{" "}
            <span className="red-color">maintenance</span>
          </h3>
          <Button onClick={() => navigate("/")}>
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
