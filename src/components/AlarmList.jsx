import React, { useEffect, useState } from "react";
import { instance } from "../server/Fetcher";
import styled from "styled-components";
import { calculateDday, formatDay, formatTime } from "../utils";
import { Link } from "react-router-dom";
import axios from "axios";

export const AlarmList = ({ onListChange }) => {
  const testToken = localStorage.getItem("token");
  // 현재 날짜
  const activeDate = new Date();

  const [list, setList] = useState([]);

  useEffect(() => {
    if (testToken) {
      axios
        .get("/reservation/alarm", {
          headers: {
            Authorization: `Bearer ${testToken}`,
          },
        })
        .then((res) => {
          const response = res.data.data;
          const alarmFilter = response.filter((item) => item.read === false);
          console.log(res);
          setList(response);
          onListChange(alarmFilter.length);
        });
    }
  }, [onListChange]);

  const alarmGetRead = (id) => {
    instance.patch(`/reservation/read/${id}`, {
      read: true,
    });
  };

  return (
    <Box>
      {list.map((item) => {
        return (
          <ReservationBox
            key={item.id}
            onClick={() => alarmGetRead(item.id)}
            to={"/reserve"}
            style={
              item.read
                ? { backgroundColor: "#d9d9d9" }
                : { backgroundColor: "rgba(0,173,92,0.5)" }
            }
          >
            <ShowDday dday={calculateDday(activeDate, item.reservedDate)}>
              <h2>{calculateDday(activeDate, item.reservedDate)}</h2>
            </ShowDday>

            <ReservationList className="hosName">
              {item.hospital.dutyName}
            </ReservationList>
            <ReservationList className="resDate">
              {formatDay(item.reservedDate)}
            </ReservationList>
            <ReservationList className="resTime">
              {formatTime(item.reservedTime)}
            </ReservationList>
          </ReservationBox>
        );
      })}
    </Box>
  );
};

const ReservationBox = styled(Link)`
  display: flex;
  justify-content: space-around;

  width: 80%;

  margin: 3% auto;
  padding: 4%;

  border: 1px solid #d9d9d9;
  border-radius: 20px;
`;

const ShowDday = styled.div`
  width: 20%;
  height: auto;
  border: ${({ dday }) => (dday === "Today" ? "1px solid #00ad5c" : "none")};
  border-radius: 40px;
  background-color: ${({ dday }) => (dday === "Today" ? "#00ad5c" : "white")};
  color: ${({ dday }) => (dday === "Today" ? "white" : "black")};

  padding-top: 10px;
  padding-bottom: 10px;

  & > h2 {
    font-size: 20px;
    font-weight: ${({ dday }) => (dday === "Today" ? "bold" : "normal")};

    backgrond-color: white;
  }
`;

const ReservationList = styled.span`
  font-size: 18px;
  text-align: left;
  padding-top: 10px;

  &.hosName {
    width: 40%;

    font-size: 20px;
    font-weight: bold;
  }

  &.resDate {
    width: 10%;
    margin-right: 5%;
  }

  &.resTime {
    width: 10%;

    text-align: center;
    align-items: center;

    border: 1px solid #b2b2b2;
    border-radius: 20px;

    background-color: white;
  }
`;

const Box = styled.div`
  height: 500px;
  overflow-y: scroll;
`;
