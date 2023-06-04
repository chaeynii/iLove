import React, { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import CardBox from "../../components/CardBox";
import IconLeft from "../../assets/iconLeftGreen.svg";
import IconRight from "../../assets/iconRightGreen.svg";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

export const MyCalendar = () => {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate); // 클릭한 날짜 - 초기값 현재 날짜
  const activeDate = moment(value).format("YY.MM.DD"); // 클릭한 날짜 (년-월-일)
  // const monthOfActiveDate = moment(value).format("MM월");
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  // const getActiveMonth = (activeStartDate: moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('MM월');
  //   setActiveMonth(newActiveMonth);
  // };

  return (
    <>
      <CardBox linkTo={"#"}>
        <ShowDate>
          <h1>{activeDate}</h1>
        </ShowDate>
      </CardBox>
      <CardBox linkTo={"#"}>
        <ShowCalendar>
          <Calendar
            locale="ko"
            onChange={onChange}
            value={value}
            nextLabel=<img alt="icon-right" src={IconRight}></img>
            prevLabel=<img alt="icon-left" src={IconLeft}></img>
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false} // 앞뒤달에 이어지는 날짜
            /* { onActiveStartDateChange={({ activeStartDate }) =>
              getActiveMonth(activeStartDate)
            } } */
          />
        </ShowCalendar>
      </CardBox>
      <CardBox>
        <DiaryHeader>
          <div>
            <span>5월</span>
            <hr />
          </div>
        </DiaryHeader>
      </CardBox>
    </>
  );
};

const ShowDate = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;

  & h1 {
    font-size: 30px;
    color: #00ad5c;
    font-weight: bold;
    text-decoration-line: none;
  }
`;

const ShowCalendar = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const DiaryHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;

  & > div:nth-child(2) {
    color: #00ad5c;
    font-weight: 600;
    padding: 2%;
    margin: 2%;
    border-bottom: 2px solid;
  }

  & > span {
    width: 100%;
  }
`;
