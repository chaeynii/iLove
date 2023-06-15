import styled from "styled-components";

// 공통 컴포넌트 스타일 불러오기
import { Container } from "../../../components/Container";

export const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
`;

export const MapContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const CardBoxWrap = styled.div`
  display: block;
  position: absolute;
  top: ${({ isOpen }) => (isOpen ? "70%" : "105%")};
  left: 50%;
  width: 70%;
  z-index: 3;
  transform: translate(-50%, -50%);
`;

export const CardBoxHeader = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: 700;
  margin: 3% 0 5% 0;
  white-space: pre-line;
  text-align: left;

  & > div {
    margin-left: 2%;
  }
`;

export const CardBoxContent = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 5%;

  & > div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 2%;
    box-sizing: border-box;
  }
  & img {
    display: flex;
    justify-content: flex-start;
    margin: 0;
  }
  & span {
    white-space: nowrap;
    margin-left: 5%;
  }
`;

export const BtnHidden = styled.button`
  background: none;
  border: none;
`;

export const MoveMyLocation = styled.button`
  display: block;
  position: absolute;
  width: 20%;
  z-index: 3;
  transform: translate(-50%, -50%);
  bottom: 0%;
  left: 60%;
  z-index: 3;
  font-size: 20px;

  font-weight: 700;
  color: white;
  border: 1px solid #00954f;
  border-radius: 5px;
  background-color: #00ad5c;
  cursor: pointer;
  transform: translate(70%, -70%);
  padding: 1% 3.5%;
`;

export const MyLocationBtn = styled.button`
  position: absolute;
  display: flex;
  bottom: 0%;
  left: 50%;
  z-index: 3;
  font-size: 20px;

  font-weight: 700;
  color: white;
  border: 1px solid #00954f;
  border-radius: 5px;
  background-color: #00ad5c;
  cursor: pointer;
  transform: translate(-50%, -70%);
  padding: 1% 3.5%;
`;
