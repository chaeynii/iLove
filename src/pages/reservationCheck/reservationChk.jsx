import React from "react";
import { ReservationMemo } from "./memoModal";
import { MyCalendar } from "./myCalendar";

const ReservationChk = () => {
  return (
    <>
      <MyCalendar />
      <ReservationMemo label={"아이사랑 소아과"} />
    </>
  );
};

export default ReservationChk;
