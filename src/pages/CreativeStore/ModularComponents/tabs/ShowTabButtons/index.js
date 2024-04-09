import { Fragment } from "react";
import { CREATIVE_STORE_TABS } from "../../../../../variables/constants/creativeStore";

export const ShowTabButtons = (props) => (
  <Fragment>
    {CREATIVE_STORE_TABS(props).map((val, index) => (
      <div
        key={`creative-store-tab-${val.title}-${index}`}
        onClick={val.onClick}
        className="creative-store-add-menu-wording">
        <p className="white-color">{val.title}</p>
        <span className={val.iconClass} />
      </div>
    ))}
  </Fragment>
);
