import * as Style from "./styles/HospitalCardStyle";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";

// 알림창 라이브러리
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

//아이콘
import {
  IconClockHospital,
  IconLocationHospital,
  IconStarEmpty,
  IconStarFilled,
} from "../../assets/index";

//utils
import { formatTime, BE_URL, endpoint_favorite } from "../../utils.js";
//요일 정보 지정을 위한 상수
//일~월 : 0~6
const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

export const HospitalCard = ({
  hpid,
  hospitalName,
  hospitalAddress,
  today,
  dutyTimeStart,
  dutyTimeClose,
  favorite,
}) => {
  //요일 정보 변환
  const todayText = WEEK[today];

  // InfoCard에 넣어줄 요소
  const INFO_PROPS = [
    {
      alt: "icon-clock",
      icon: IconClockHospital,
      content: dutyTimeStart
        ? // dutyTime이 null 값일 경우 휴무로 표시
          `${todayText}요일 ${formatTime(dutyTimeStart)} ~ ${formatTime(
            dutyTimeClose
          )}`
        : `${todayText}요일 휴무`,
    },
    {
      alt: "icon-location",
      icon: IconLocationHospital,
      content: hospitalAddress,
    },
  ];

  // favorite post 보내기
  const userToken = localStorage.getItem("token");
  const { mutate: handleFavorite } = useMutation(() =>
    axios.post(
      `${BE_URL}${endpoint_favorite}`,
      { hospitalId: hpid },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
  );

  const handleLoginRequired = () => {
    toast("로그인 후 이용해주세요"); // 토스트 메시지 띄우기
    setTimeout(() => {
      navigate("/login"); // 3초 후에 페이지 이동
    }, 1500);
  };

  const navigate = useNavigate();
  const handleFavoriteClick = (event) => {
    //즐겨찾기 클릭 시 Link로 넘어가는 것을 막음
    event.preventDefault();
    console.log("즐찾 클릭시 유저토큰 출력:", userToken);
    if (userToken) {
      try {
        handleFavorite();
        // 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else {
      handleLoginRequired();
      return [];
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={4000}
        hideProgressBar
      />
      <Link to={`/detail?id=${hpid}`}>
        <Style.HospitalCardBox>
          <div>{hospitalName}</div>
          {INFO_PROPS.map((prop) => (
            <div key={prop.alt}>
              <img alt={prop.alt} src={prop.icon} />
              <span>{prop.content}</span>
            </div>
          ))}
          <Style.Favorite onClick={handleFavoriteClick}>
            <img
              alt={"icon-favorite"}
              src={favorite ? IconStarFilled : IconStarEmpty}
            ></img>
          </Style.Favorite>
        </Style.HospitalCardBox>
      </Link>
    </>
  );
};
