import { PRODUCT_SORT_OPTIONS } from "../../../variables/constants/dropdown";
import SearchIcon from "../../../assets/svg/search-icon.svg";
import { Fragment, useState } from "react";
import Dropdown from "../../Dropdown";
import Button from "../../Button";
import TextInput from "../../TextInput";
import { NO_STRING } from "../../../variables/global";

export const ShowSearchBar = (props) => {
  const [keyword, setKeyword] = useState("");
  const [sortKey, setSortKey] = useState(null);

  function handleNavigate() {
    let searchParam = "";

    searchParam += `${keyword ? "keyword=" + keyword : ""}`;
    if (searchParam !== "" && sortKey)
      searchParam += `&sortKey=${sortKey.key}`;
    else if (searchParam === "" && sortKey)
      searchParam += `sortKey=${sortKey.key}`;

    props.navigate(`/search?${searchParam}`);
    window.handleOpenOverriding(NO_STRING);
  }

  return (
    <Fragment>
      <li className="navbar-search-wrapper">
        <Dropdown
          className="navbar-search-sort-options"
          onChange={(key) => {
            window.handleProductSearchSort(key, setSortKey);
          }}
          showTitle={false}
          toggle={true}
          value={
            sortKey?.key || PRODUCT_SORT_OPTIONS[0].key
          }
          values={PRODUCT_SORT_OPTIONS.map((x) => x.key)}
        />
        <Button
          onClick={() => handleNavigate()}
          className="navbar-search-button dark-color lighter-bg-color">
          <img
            src={SearchIcon}
            alt="search-icon-navbar"
          />
        </Button>
        <TextInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onEnter={() => handleNavigate()}
          className="navbar-search"
        />
      </li>
    </Fragment>
  );
};
