import * as Style from "./styles/HospitalCardStyle";
import React from "react";
import { Link } from "react-router-dom";

//아이콘
import {
  IconClockHospital,
  IconLocationHospital,
  IconStarEmpty,
  IconStarFilled,
} from "../../assets/index";

//utils
import { formatTime } from "../../utils.js";
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
  const handleFavoriteClick = (event) => {
    //즐겨찾기 클릭 시 Link로 넘어가는 것을 막음
    event.preventDefault();
  };
  return (
    <>
      <Link to={`/detail/${hpid}`}>
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
