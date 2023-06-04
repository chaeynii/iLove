import React from "react";
import styled from "styled-components";
import IconLeft from "../assets/iconLeft.svg";

// eslint-disable-next-line react/prop-types
export const Header = ({ label, onClick }) => {
  return (
    <>
      <HeaderWrap>
        <BtnBack onClick={onClick}>
          <img alt="icon-left" src={IconLeft}></img>
        </BtnBack>
        <div>
          <h2>{label}</h2>
        </div>
      </HeaderWrap>
    </>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid #b2b2b2;
  display: inline-block;
  text-align: center;
  justify-content: center;

  & h2 {
    font-size: 20px;
    color: #00ad5c;
  }
`;

const BtnBack = styled.button`
  background: none;
  border: none;
  float: left;
`;
