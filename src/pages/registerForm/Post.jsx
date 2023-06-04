import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";
import colors from "../../constants/colors";
import { InputBox, InputContent, InputName } from "./RegisterForm";
import { Button } from "../../components/Button";

const ModalContainer = styled.div`
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

const Modal = styled.div`
  padding: 20px;
  background-color: white;
`;

export const Post = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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

    setFullAddress(fullAddress);

    handleCloseModal();
  };

  return (
    <>
      <InputBox>
        <PostBox>
          <InputName>주소</InputName>
          <Button
            width={"100px"}
            height={"50px"}
            bgcolor={colors.primary}
            onClick={handleOpenModal}
            btnColor={"#FFFFFF"}
            label={"주소찾기"}
            fontSize={"15px"}
          />

          {isOpen && (
            <ModalContainer>
              <Modal>
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
        {/* 수정: 주소 선택 후에 fullAddress 값을 인풋 태그에 표현하는 부분 */}
        {fullAddress && (
          <InputContent type="text" value={fullAddress} readOnly />
        )}
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
