import WGLogo from "../../assets/svg/LIVEJB_V1_LOGO.svg";

export const ShowNavbar = (props) => {
  function handleGoToHome() {
    window.location.href = "/";
  }
  // TODO: nanti buat logo yang support background ijo
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-mobile-logo-wrapper">
          <img
            onClick={() => handleGoToHome()}
            className="navbar-logo-img"
            src={WGLogo}
            alt="WG_LOGO"
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export const ShowBreadcrumbs = (props) => {
  let breadCrumbTexts = "";
  props.trails.forEach(
    (item) => (breadCrumbTexts += `${item} / `)
  );
  breadCrumbTexts = breadCrumbTexts.slice(0, -2);
  return <h3>{breadCrumbTexts}</h3>;
};
