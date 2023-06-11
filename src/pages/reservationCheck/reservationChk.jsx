import React from "react";
import { MyCalendar } from "./MyCalendar";

// 공통 컴포넌트
import { Header, NavigationBar, Footer } from "../../components/index";

const ReservationChk = () => {
  return (
    <>
      <Header label={"예약 현황"} />
      <MyCalendar />
      <Footer />
      <NavigationBar />
    </>
  );
};

export default ReservationChk;
