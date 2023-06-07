import React from "react"; //, { useState }
import styled from "styled-components";
import CardBox from "../../components/CardBox";
import IconPen from "../../assets/iconPen.svg";
import { ReservationMemo } from "./memoModal";

// eslint-disable-next-line react/prop-types
export const ReDetail = ({ hospitalName, reservationDate }) => {
  return (
    <>
      <CardBox>
        <HospitalName>{hospitalName}</HospitalName>
        <input
          placeholder="메모를 추가해보세요"
          value=""
          style={{ border: "none" }}
        />
        <button
          onClick={"locat"}
          style={{ border: "none", background: "none" }}
        >
          <img alt="icon-pen" src={IconPen}></img>
        </button>
      </CardBox>
    </>
  );
};

const HospitalName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #121212;

  border-bottom: 1px solid #b2b2b2;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
