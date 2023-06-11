import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";

const weekTable = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
  "공휴일",
  "점심시간",
];

const openTimeTable = [
  { value: "0800", label: "0800" },
  { value: "0900", label: "0900" },
  { value: "1000", label: "1000" },
  { value: "1100", label: "1200" },
  { value: "1200", label: "1300" },
  { value: "1300", label: "1400" },
];

const closeTimeTable = [
  { value: "1200", label: "1200" },
  { value: "1300", label: "1300" },
  { value: "1400", label: "1400" },
  { value: "1500", label: "1500" },
  { value: "1600", label: "1600" },
  { value: "1700", label: "1700" },
  { value: "1800", label: "1800" },
  { value: "1900", label: "1900" },
  { value: "2000", label: "2000" },
];

export const SelectBox = ({ getOpenTimeData, getCloseTimeData }) => {
  const [openTimeOption, setOpenTimeOption] = useState([]); // 오픈시간 담는 배열
  const [closeTimeOption, setCloseTimeOption] = useState([]); // 마감시간 담는 배열

  const handleOpenTimeOptionChange = (selectedOption, index) => {
    const updatedOpenTimeOptions = [...openTimeOption];
    updatedOpenTimeOptions[index] = selectedOption;
    setOpenTimeOption(updatedOpenTimeOptions); // 선택된 옵션을 오픈시간 배열에 추가

    getOpenTimeData(updatedOpenTimeOptions); // 부모 컴포넌트인 레지스터폼에서 props 로 내려온 getOpenTimeData함수에 데이터 보내는 코드
  };

  const handleCloseTimeOptionChange = (selectedOption, index) => {
    const updatedCloseTimeOptions = [...closeTimeOption];
    updatedCloseTimeOptions[index] = selectedOption;
    setCloseTimeOption(updatedCloseTimeOptions); // 선택된 옵션을 마감시간 배열에 추가

    getCloseTimeData(updatedCloseTimeOptions); // 부모 컴포넌트인 레지스터폼에서 props 로 내려온 getCloseTimeData함수에 데이터 보내는 코드
  };

  const renderTimeTable = () => {
    const timetables = [];

    for (let i = 0; i < weekTable.length; i++) {
      // 요일의 갯수 만큼 셀렉트 옵션 추가 ex) 월,화,수,목,금,토,일,주말,점심시간 셀렉트 옵션 생성
      timetables.push(
        <TimeTable key={i}>
          <div>{weekTable[i]}</div>
          <StyledSelect
            placeholder="오픈시간" // 오픈시간 셀렉트
            value={openTimeOption[i]}
            onChange={(selectedOption) =>
              handleOpenTimeOptionChange(selectedOption, i)
            }
            options={openTimeTable}
          />
          <Span>부터</Span>
          <StyledSelect
            placeholder="마감시간" // 마감시간 셀렉트
            value={closeTimeOption[i]}
            onChange={(selectedOption) =>
              handleCloseTimeOptionChange(selectedOption, i)
            }
            options={closeTimeTable}
          />
          <Span>까지</Span>
        </TimeTable>
      );
    }

    return timetables;
  };

  return (
    <>
      <SelectContainer>{renderTimeTable()}</SelectContainer>
    </>
  );
};

const TimeTable = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 2%;
`;

const StyledSelect = styled(Select)`
  width: 25%;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
`;
const Span = styled.span``;
