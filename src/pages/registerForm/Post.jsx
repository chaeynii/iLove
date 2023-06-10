import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";
import colors from "../../constants/colors";
import { InputBox, InputContent, InputName } from "./RegisterForm";
import { Button } from "../../components/Button";

export const Post = ({ getAddrData }) => {
  const [isOpen, setIsOpen] = useState(false); //모달 상태
  const [fulladdress, setFulladdress] = useState(""); // 전체주소
  const [dutyAddr1Depth, setDutyAddr1Depth] = useState(""); // 시,도 주소
  const [dutyAddr2Depth, setDutyAddr2Depth] = useState(""); // 상세주소

  const handleOpenModal = () => {
    // 모달 오픈
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    // 모달 클로즈
    setIsOpen(false);
  };

  // 주소 검색 다음 api
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    const { addressType, bname, buildingName } = data;
    if (addressType === "R") {
      if (bname !== "") {
        extraAddress += bname;
      }
      if (buildingName !== "") {
        extraAddress += `${extraAddress !== "" && ", "}${buildingName}`;
      }
      fullAddress += `${extraAddress !== "" ? ` ${extraAddress}` : ""}`;
    }

    const newAddress = data.address.split(" "); // 검색한 주소를 배열로 전환
    const dutyAddr1Depth = newAddress.splice(0, 2).join(" "); // 시,도 주소를 뽑아내기 위해서 인덱스 번호로 자름
    const dutyAddr2Depth = [...newAddress].join(" "); // 시,도 주소를 제외한 나머지 주소를 상세주소 변수에 추가

    setDutyAddr2Depth(dutyAddr2Depth); // 시,도 주소 변수 값으로 State변화
    setDutyAddr1Depth(dutyAddr1Depth); // 상세주소 변수 값으로 State변화
    getAddrData(dutyAddr1Depth, dutyAddr2Depth); // 레지스터폼에서 props로 내려온 getAddrData 함수에 2가지 종류의 주소 데이터를 보냄
    console.log(data);
    handleCloseModal(); // 주소 선택 시 모달 닫음
  };

  return (
    <>
      <InputBox>
        <PostBox>
          <InputName>주소</InputName>
          <Button
            width={"100px"}
            height={"30px"}
            bgcolor={colors.primary}
            onClick={handleOpenModal}
            btnColor={"#FFFFFF"}
            label={"주소찾기"}
            fontSize={"18px"}
          />

          {isOpen && (
            <ModalContainer>
              <Modal width={"30%"}>
                <PostCodeContainer>
                  <DaumPostCode
                    onComplete={handleComplete}
                    className="post-code"
                  />
                </PostCodeContainer>
                <button onClick={handleCloseModal}>닫기</button>
              </Modal>
            </ModalContainer>
          )}
        </PostBox>
        <InputContent type="text" value={dutyAddr1Depth} readOnly />
        <InputContent type="text" value={dutyAddr2Depth} readOnly />
      </InputBox>
    </>
  );
};

const PostCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 600px;
`;

const PostBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

export const Modal = styled.div`
  width: ${(props) => props.width};
  height: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;
