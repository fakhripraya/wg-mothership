import React, { useLayoutEffect, useState } from "react";
import "./style.scss";
import Button from "../Button";
import { getSocialMedia } from "../../variables/path/footer";
import { useLocation } from "react-router-dom";

export default function Footer(props) {
  // VARIABLES
  const [isRender, setIsRender] = useState(false);
  let location = useLocation();

  // COMPONENT SPECIFIC
  const StyledButton = (props) => {
    const { children, className } = props;
    return (
      <div className="footer-button-container">
        <Button className={"footer-button " + className}>
          {children}
        </Button>
      </div>
    );
  };

  useLayoutEffect(() => {
    setIsRender(() => {
      if (props.isOverriding) return true;
      return !location.pathname.includes("creative-store");
    });
  }, [location]);

  return (
    isRender && (
      <div
        className={`footer-container ${
          props.isOverriding ? "" : "main-bg-color"
        }`}>
        <div className="footer-grid-wrapper grid-false">
          <div className="footer-column-1">
            <div className="footer-column-1-wrapper">
              <div className="footer-column-1-media-social">
                {getSocialMedia().map((social, index) => {
                  return (
                    <StyledButton
                      key={`footer-styled-button-${index}`}
                      className={
                        props.isOverriding
                          ? "footer-button-outlined footer-button-outlined-overriding"
                          : "footer-button-outlined"
                      }>
                      {social.name}
                    </StyledButton>
                  );
                })}
              </div>
              <h3> We are based in </h3>
              <h3
                className={
                  props.isOverriding ? "main-color" : ""
                }>
                Jakarta,&nbsp;
              </h3>
              <h1
                style={{ fontSize: "2.5em" }}
                className={`break-word ${
                  props.isOverriding ? "main-color" : ""
                }`}>
                Indonesia
              </h1>
              <h2 className="footer-column-1-email">
                Drop us a line
              </h2>
              <h1 className="break-word">
                <a
                  className={`footer-column-1-email-text ${
                    props.isOverriding ? "main-color" : ""
                  }`}
                  href="mailto:letmeask@wg.com">
                  letmeask@livejb.com
                </a>
              </h1>
              <div className="footer-column-1-help">
                <StyledButton
                  className={
                    props.isOverriding
                      ? "max-width footer-button-block-overriding"
                      : "max-width footer-button-block"
                  }>
                  Privacy and Policy
                </StyledButton>
                <StyledButton
                  className={
                    props.isOverriding
                      ? "max-width footer-button-block-overriding"
                      : "max-width footer-button-block"
                  }>
                  Terms and Condition
                </StyledButton>
                <StyledButton
                  className={
                    props.isOverriding
                      ? "max-width footer-button-block-overriding"
                      : "max-width footer-button-block"
                  }>
                  Customer Service
                </StyledButton>
              </div>
            </div>
          </div>
          <div className="footer-column-2">
            <div className="footer-column-2-wrapper">
              {/* <img className="footer-logo-img" src={WGLogo} alt="WG_LOGO"></img> */}
              <p>
                © {"2022"} All Rights Reserved,{" "}
                <span
                  className={
                    props.isOverriding
                      ? "main-color font-bold"
                      : "font-bold"
                  }>
                  LIVEJB
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
