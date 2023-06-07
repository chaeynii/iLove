import React, { useState } from "react";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import CardBox from "../../components/CardBox";
import IconLeft from "../../assets/iconLeftGreen.svg";
import IconRight from "../../assets/iconRightGreen.svg";
import styled from "styled-components";
import { ReDetail } from "./reDetail";

export const MyCalendar = () => {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate); // 클릭한 날짜 - 초기값 현재 날짜
  const activeDate = dayjs(value).format("YY.MM.DD"); // 클릭한 날짜 (년-월-일)
  const activeMonth = dayjs(value).get("month") + 1 + "월";

  return (
    <>
      <CardBox linkTo={"#"} bxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
        <ShowDate>
          <h1>{activeDate}</h1>
        </ShowDate>
      </CardBox>
      <CardBox linkTo={"#"} bxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}>
        <ShowCalendar>
          <ReCalendar
            locale="ko"
            onChange={onChange}
            value={value}
            nextLabel={<img alt="icon-right" src={IconRight}></img>}
            prevLabel={<img alt="icon-left" src={IconLeft}></img>}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false} // 앞뒤달에 이어지는 날짜
          />
        </ShowCalendar>
      </CardBox>
      <CardBox linkTo={"#"} bxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}>
        <DiaryHeader>
          <h2>{activeMonth}</h2>
        </DiaryHeader>
        <DiaryMain>
          <ReTime>
            <ReDate>
              <h3>10일</h3>
              <h3>토</h3>
            </ReDate>
            <ReHour>
              <h3>PM 3</h3>
            </ReHour>
          </ReTime>
          <ReDetail hospitalName={"아이사랑 소아과"} />
          <DueDate>
            <h2>D-day</h2>
          </DueDate>
        </DiaryMain>
      </CardBox>
    </>
  );
};

// 날짜 표시
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

// 달력 부분
const ShowCalendar = styled.div`
  text-align: center;
  justify-content: center;
`;

const ReCalendar = styled(Calendar)`
  .react-calendar {
    width: 100%;
    max-width: 832px;
    background-color: #fff;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica
  }

  /* 상단 네비게이션 바 */
  .react-calendar__navigation {
    display: flex;
    width: 100%;
    height: 80px;
    margin-bottom: 10px;

    .react-calendar__navigation__label {
      font-weight: bold;
      font-size: 20px;
      background: none;
      border:none;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
      background: none;
      border:none;
    }

    .react-calendar__navigation__label > span {
      font-size: 20px;
      font-weight: bold;
      color: #121212;
    }
  }

  /* 요일 표시 */
  .react-calendar__month-view__weekdays {
    background: none;
    abbr { /*월,화,수... 글자 부분*/
      color: #121212};
      font-size: 18px;
      margin-bottom: 10px;
    }
  }

  /* day 타일 모양 */
  .react-calendar__tile {
    /* 기존 스타일 제거 */
    background: none;
    text-align: center;
    margin: 5px 0 10px 0;
    padding: 0 5px 0 5px;
    border: none;
  
    /* 추가된 스타일 */
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 18px;
    color: #121212;
    border-radius: 50%;
  }
  }
  /*hover, focus, 선택됐을 시 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: #00ad5c;
    border-radius: 100%;
  }

  /* 오늘 표시 */
  .react-calendar__tile--now {
    border: 5px solid #00ad5c;
    color: #121212;
    font-weight: bold;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: #00ad5c;
    color: white;
  }

  /* 주말일때 일 표시 */
  .react-calendar__month-view__days__day--weekend {
    color: #a9a9a9;
  }
`;

const DiaryHeader = styled.div`
  display: flex;
  justify-content: left;
  margin: 10px;
  border-bottom: 1px solid #b2b2b2;

  & > h2 {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: #121212;
    margin-bottom: 10px;
  }
`;

const DiaryMain = styled.div`
  display: flex;
  justify-content: left;
  margin: 10px;
`;

const ReTime = styled.div`
  width: 30%;
  align-items: center;
  justify-content: center;s
`;

const ReDate = styled.div`
  width: 50%;
  float: left;
  display: flex;

  & > h3 {
    font-size: 18px;
    font-weight: bold;
    color: #121212;
  }
`;

const ReHour = styled.div`
  width: 50%;
  float: left;
  display: flex;

  & > h3 {
    font-size: 18px;
    font-weight: bold;
    color: #121212;
  }
`;

const DueDate = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > h2 {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: #121212;
    margin-bottom: 10px;
  }
`;
