import React, { useEffect, useState } from "react";
import { instance } from "../server/Fetcher";
import { useQuery } from "react-query";
import styled from "styled-components";
import { calculateDday, formatDay, formatTime } from "../utils";
import { Link } from "react-router-dom";

export const Alarm = ({ onListChange }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    instance.get("/reservation/alarm").then((res) => {
      setList(res.data.data);
      onListChange(res.data.data.length);
    });
  }, [onListChange]);

  const alarmGetRead = (id) => {
    instance.patch(`/reservation/read/${id}`, {
      read: true,
    });
  };

  const activeDate = new Date();
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
            <h2>{calculateDday(activeDate, item.reservedDate)}</h2>

            <ReservationList>{item.hospital.dutyName}</ReservationList>
            <ReservationList>{formatDay(item.reservedDate)}</ReservationList>
            <ReservationList>{formatTime(item.reservedTime)}</ReservationList>
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

const ReservationList = styled.span`
  font-size: 18px;
`;

const Box = styled.div`
  height: 500px;
  overflow-y: scroll;
`;
