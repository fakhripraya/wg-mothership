import { PRODUCT_SORT_OPTIONS } from "../../../variables/constants/dropdown";
import SearchIcon from "../../../assets/svg/search-icon.svg";
import { Fragment, useState } from "react";
import Dropdown from "../../Dropdown";
import Button from "../../Button";
import TextInput from "../../TextInput";
import { NO_STRING } from "../../../variables/global";

export const ShowSearchBar = (props) => {
  const [keyword, setKeyword] = useState("");
  return (
    <Fragment>
      <li className="navbar-search-wrapper">
        <Dropdown
          className="navbar-search-sort-options"
          onChange={(value) => {}}
          showTitle={false}
          toggle={true}
          values={PRODUCT_SORT_OPTIONS}
        />
        <Button
          onClick={() => {
            props.navigate("/search");
            window.handleOpenOverriding(NO_STRING);
          }}
          className="navbar-search-button dark-color lighter-bg-color">
          <img
            src={SearchIcon}
            alt="search-icon-navbar"
          />
        </Button>
        <TextInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onEnter={() => {
            props.navigate(
              `/search?${"keyword=" + keyword}`
            );
            window.handleOpenOverriding(NO_STRING);
          }}
          className="navbar-search"
        />
      </li>
    </Fragment>
  );
};
