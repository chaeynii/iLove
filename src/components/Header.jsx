import React from "react";
import styled from "styled-components";
import IconLeft from "../assets/iconLeft.svg";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Header = ({ label }) => {
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <>
      <HeaderWrap>
        <BtnBack onClick={onClickBtn}>
          <img
            alt="icon-left"
            src={IconLeft}
            style={{ cursor: "pointer" }}
          ></img>
        </BtnBack>
        <h2>{label}</h2>
      </HeaderWrap>
    </>
  );
};

/* 메뉴 제목 위치 수정 다시 필요 - 메뉴 이름은 헤더 가운데, 뒤로가기 버튼 위아래 여백 동일하게 */
const HeaderWrap = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  position: relative;

  border-bottom: 1px solid #b2b2b2;

  padding: 0 30px 0 30px;
  line-height: 80px;
  text-align: center;
  justify-content: center;

  & h2 {
    font-size: 20px;
    font-weight: bold;
    color: #00ad5c;
  }
`;

const BtnBack = styled.button`
  display: block;
  position: absolute;
  right: 90%;
  transform: translate(-100%, 0);

  background: none;
  border: none;
  line-height: 80px;
  padding-top: 7px;
`;
