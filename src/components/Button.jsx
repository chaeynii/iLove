/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = ({
  btnColor,
  btnFontSize,
  bgcolor,
  borderOutLine,
  width,
  height,
  label,
  onClick,
  LinkTo,
}) => {
  return (
    <>
      <Link to={LinkTo}>
        <ButtonStyle
          onClick={onClick}
          fontSize={btnFontSize}
          color={btnColor}
          bgcolor={bgcolor}
          borderOutLine={borderOutLine}
          width={width}
          height={height}
        >
          {label}
        </ButtonStyle>
      </Link>
    </>
  );
};

const ButtonStyle = styled.button`
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${(props) => props.borderOutLine};
  border-radius: 5px;
  background-color: ${(props) => props.bgcolor};
  cursor: pointer;

  padding: 1% 3.5%;
`;

/* [font-size]
  폰트사이즈 수정해서 사용가능하며 폰트 사이즈에 맞춰 버튼 크기가 작아졌다 줄어졌다하는 점 참고 */

/* width값과 height값은 대도록 수정 금지 & 수정이 필요하면 수정 후 디코에 공유 부탁드립니다 */
