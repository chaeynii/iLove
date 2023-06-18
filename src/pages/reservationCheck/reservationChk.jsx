import React from "react";
import { MyCalendar } from "./MyCalendar";

// 공통 컴포넌트
import {
  Header,
  NavigationBar,
  Footer,
  Container,
} from "../../components/index";

const ReservationChk = () => {
  return (
    <>
      <Container>
        <Header label={"예약 현황"} />
        <MyCalendar />
        <Footer />
        <NavigationBar />
      </Container>
    </>
  );
};

export default ReservationChk;
