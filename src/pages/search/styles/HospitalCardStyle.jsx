import styled from "styled-components";

// 공통 컴포넌트 스타일 불러오기
import { CardBoxStyle } from "../../../components/CardBox";

export const HospitalCardBox = styled(CardBoxStyle)`
  padding: 2%;
  margin: 1% 0;
  display: block !important;

  & > div {
    display: flex;
    font-size: 16px;
    justify-content: left;
    align-items: center;
    margin: 1%;
    text-align: left;
  }
  & > div:first-child {
    font-size: 30px;
    color: #121212;
    font-weight: 700;
    margin: 2%;
    margin-top: 1%;
  }
  & img {
    margin-right: 1%;
  }
`;

export const InfoList = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: left;
  align-items: center;
  margin: 1%;
`;

export const Favorite = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 10%;
  right: 3%;
`;
