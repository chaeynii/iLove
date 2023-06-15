import * as Style from "../../components/styles/SearchBarStyle";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

//아이콘 & 행정구역데이터 - assets
import {
  addressList as locationData,
  IconSearch,
  IconDown,
  IconAlarm,
} from "../../assets/index";

export const SearchInput = ({
  // onSearch,
  onChange,
  value,
  linkTo,
  onSubmit,
}) => {
  //--------------------검색부분
  //검색어

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
