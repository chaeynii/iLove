import * as Style from "./styles/SearchBarStyle";
import React from "react";
import { Link } from "react-router-dom";

//아이콘
import { IconSearch } from "../assets/index";

export const SearchInput = ({ onChange, value, linkTo, onSubmit }) => {
  return (
    <Style.Wrapper>
      <Style.InputBox style={{ marginTop: "0%" }}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            // onSearch={onSearch}
            value={value}
            onChange={onChange}
            placeholder="병원 이름을 검색해보세요"
          />
          <Link to={linkTo}>
            <button type="submit" style={{ cursor: "pointer" }}>
              <img alt="search-button" src={IconSearch} />
            </button>
          </Link>
        </form>
      </Style.InputBox>
    </Style.Wrapper>
  );
};
