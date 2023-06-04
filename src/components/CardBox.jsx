/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardBox = ({ children, linkTo }) => {
  return (
    <CardBoxStyle>
      <Link to={linkTo}>{children}</Link>
    </CardBoxStyle>
  );
};

export default CardBox;

const CardBoxStyle = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;
  border: solid 1px #b2b2b2;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2%;
  margin: 1% 0;
`;
