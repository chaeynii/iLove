/* eslint-disable */

// 이미지 링크
import star from "../assets/star.svg";
import map from "../assets/map.svg";
import miniLogo from "../assets/miniLogo.svg";
import myInfo from "../assets/myInfo.svg";
import reservation from "../assets/reservation.svg";

import { Link, useNavigate } from "react-router-dom";
// 상수값 연결 링크
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";

import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { instance } from "../server/Fetcher";

export const NavigationBar = () => {
  const userRole = localStorage.getItem("role");

  let myPageLink;
  let reservationLink;
  let searchLink;
  let favoriteLink;

  if (userRole) {
    favoriteLink = "/favorite";
    searchLink = "/search";
    reservationLink = "/reserve";
  } else {
    favoriteLink = "/login";

    reservationLink = "/login";
  }

  if (userRole === "manager") {
    myPageLink = "/modify";
  } else if (userRole === "client") {
    myPageLink = "/Mypage";
  } else if (userRole === "admin") {
    myPageLink = "/admin";
  } else {
    myPageLink = "/login";
  }
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      instance.get("/users/get").then((res) => {
        if (res.data.data.adminVerified === false) {
          navigate("/jail");
        }
      });
    }
  }, []);
  return (
    <>
      <Nav>
        <NavUl>
          <NavLi>
            <NavA to={reservationLink} disabled={userRole !== "client"}>
              <NavImg src={reservation} alt="star"></NavImg>
              <NavP>예약현황</NavP>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA to={"/search"} disabled={userRole === "manager"}>
              <NavImg src={map} alt="star"></NavImg>
              <NavP>병원찾기</NavP>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA to="/">
              <NavLogo src={miniLogo} alt="star"></NavLogo>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA to={favoriteLink} disabled={userRole !== "client"}>
              <NavImg src={star} alt="star"></NavImg>
              <NavP>즐겨찾기</NavP>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA to={myPageLink}>
              <NavImg src={myInfo} alt="star"></NavImg>
              <NavP>내정보</NavP>
            </NavA>
          </NavLi>
        </NavUl>
      </Nav>
    </>
  );
};
const Nav = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.InputBorderOut};
  position: fixed;
  max-width: 834px;
  bottom: 0;
  z-index: 99;
  background-color: #ffffff;
`;

const NavUl = styled.ul`
  height: 90px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLi = styled.li`
  width: 20%;
  padding: 1%;
`;

const NavA = styled(Link)`
  color: ${colors.fontColor};
  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}
  color: ${colors.fontColor};
`;

const NavImg = styled.img`
  width: 41px;
  height: 41px;
`;

const NavP = styled.p`
  color: #777777;
  font-weight: 500;
  margin: 4px 0 0 0;
`;

const NavLogo = styled.img`
  margin-bottom: 20px;
`;
