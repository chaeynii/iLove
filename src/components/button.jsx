import React from "react";
import styled from "styled-components";

export const Button = () => {
  return (
    <>
      <ButtonStyle>수정하기</ButtonStyle>
    </>
  );
};

const ButtonStyle = styled.button`
  font-size: 20px;

  font-weight: 700;
  color: white;
  border: 1px solid #00954f;
  border-radius: 5px;
  background-color: #00ad5c;
  cursor: pointer;

  padding: 1% 3.5%;
`;
/* [font-size: 20px;]
  폰트사이즈 수정해서 사용가능하며 폰트 사이즈에 맞춰 버튼 크기가 작아졌다 줄어졌다하는 점 참고 */

/* [padding: 1% 3.5%;] 패딩값 수정해서 사용가능하지만 버튼에 사용할 경우 대도록 수정하지말아주시고
  병원상세페이지 -> 병원예약 페이지에 있는 시간을 누르는 버튼이나
  유독 크기가 작은 버튼 또는 로그인 버튼처럼 유독 크기가 큰 경우 등
  특이사항때만 수정해주세요. */
