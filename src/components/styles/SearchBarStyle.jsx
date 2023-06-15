import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  display: block !important;
  padding-top: 2%;
  margin: 2% auto;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  & button {
    background: none;
    border: none;
    cursor: pointer;
  }

  & img:hover {
    filter: invert(30%);
  }
`;

export const InputBox = styled.div`
  width: 100%;
  border: 1px solid #b2b2b2;
  margin-top: 2%;
  padding: 2% 2.5%;
  box-sizing: border-box;
  border-radius: 100px;
  text-align: center;

  & form {
    width: 100%;
    display: flex;
  }
  & input {
    font-size: 24px;
    border: none;
    width: 100%;
  }
  & input::placeholder {
    color: #d9d9d9;
  }
  & input:focus {
    outline: none;
  }
`;

export const Location = styled.div`
  width: 100%;
  display: flex;
  justify-contents: center;
  align-items: center;

  & > span {
    font-size: 24px;
  }
`;

export const ModalContent = styled.div`
  & > div {
    display: flex;
    align-items: center;
    justify-content: left;
  }
`;

export const BtnSelected = styled.div`
  width: fit-content;
  background: #00ad5c;
  border: 1px solid #00a758;
  border-radius: 11px;
  color: #ffffff;
  padding: 1% 5%;
  margin: 2%;
  font-size: 20px;
`;

export const DropdownMenu = styled.div`
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px; /* 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 적용 */
  background: rgba(0, 0, 0, 0);
  margin: 1%;

  /* 스크롤바 스타일 */
  direction: ltr;
  scrollbar-width: thin; /* 스크롤바의 너비 */
  scrollbar-color: transparent transparent; /* 스크롤바의 색상 (트랙, 썸네일 순서) */
  scrollbar-track-color: transparent; /* 스크롤바 트랙 색상 */

  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-track {
    background: #d9d9d9; /* 스크롤바 트랙 배경색 */
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #b2b2b2; /* 스크롤바 썸네일 색상 */
    border-radius: 4px; /* 스크롤바 썸네일의 둥근 모서리 */
  }

  /* 스크롤바 위치 조정 */
  ::-webkit-scrollbar-track-piece:start {
    margin-left: 2px; /* 스크롤바 트랙 시작 위치 조정 */
  }
`;

export const DropdownMenuItem = styled.option`
  cursor: pointer;
  background: rgba(0, 0, 0, 0);
  text-align: left;
  color: #d0d0d0;
  font-weight: 600;

  ${(props) =>
    props.selected &&
    css`
      color: #00ad5c;
    `}
`;
