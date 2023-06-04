import React from "react";
import styled from "styled-components";
// import { useRecoilValue } from "recoil";
// import { favoriteState } from "../../recoil/RecoilAtoms";
import IconClock from "../../assets/iconClock.svg";
import IconLocationGray from "../../assets/iconLocationGray.svg";
import IconStarEmpty from "../../assets/iconStarEmpty.svg";
import IconStarFilled from "../../assets/iconStarFilled.svg";

const HospitalCard = ({
  hpid,
  hospitalName,
  hospitalAddress,
  today,
  dutyTimeStart,
  dutyTimeClose,
  favorite,
}) => {
  const week = ["월", "화", "수", "목", "금", "토", "일", "공휴일"];
  const todayText = week[today - 1];
  // const favorite = useRecoilValue(favoriteState);
  console.log("hpid:", hpid);

  return (
    <>
      <CardBox>
        <HospitalName>{hospitalName}</HospitalName>
        <div>
          <img alt={"icon-clock"} src={IconClock} />
          <span>
            {todayText + "요일 " + dutyTimeStart + " ~ " + dutyTimeClose}
          </span>
        </div>
        <div>
          <img alt={"icon-location"} src={IconLocationGray} />
          <span>{hospitalAddress}</span>
        </div>
        <Favorite>
          <img
            alt={"icon-favorite"}
            src={favorite ? IconStarFilled : IconStarEmpty}
          ></img>
        </Favorite>
      </CardBox>
    </>
  );
};

export default HospitalCard;

const CardBox = styled.button`
  position: relative;
  width: 100%;
  background: none;
  border: solid 1px #b2b2b2;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2%;
  margin: 1% 0;

  & > div {
    display: flex;
    font-size: 16px;
    justify-content: left;
    align-items: center;
    margin: 1%;
  }
  & > div:first-child {
    font-size: 30px;
    color: #121212;
    font-weight: 700;
    margin: 2%;
    margin-top: 1%;
  }
  & img {
    margin-right: 1%;
  }
`;

const HospitalName = styled.div``;
// const HospitalAddress = styled.div``;
// const DutyTime = styled.div``;

const Favorite = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 10%;
  right: 3%;
`;
