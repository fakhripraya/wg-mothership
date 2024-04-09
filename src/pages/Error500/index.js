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
          <h3 className="margin-bottom-0 red-color">
            ERROR 500
          </h3>
          <div className="breakline" />
          <label>
            Waduh server kami sedang{" "}
            <span className="red-color">bermasalah</span>{" "}
            <div className="breakline" />
            kalau <span className="red-color">
              error
            </span>{" "}
            ini masih muncul dalam{" "}
            <span className="red-color">satu jam</span>,
            segera hubungin kami ya
          </label>
          <div className="breakline" />
          <Button onClick={() => navigate("/")}>
            Balik ke home
          </Button>
        </div>
      </div>
    </div>
  );
}
