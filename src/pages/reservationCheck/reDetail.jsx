import React, { useState } from "react";
// 공통컴포넌트
import { CardBox, Modal } from "../../components/index";
// css
import styled from "styled-components";
import IconPen from "../../assets/iconPen.svg";

export const ReDetail = ({ hospitalName, memo, onSaved }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [memoValue, setMemoValue] = useState(memo ? memo : "");

  const openModal = () => {
    setModalOpen(true);
    setMemoValue(memo);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMemoChange = (event) => {
    setMemoValue(event.target.value);
  };

  const handleSave = () => {
    onSaved(memoValue);
    closeModal();
  };

  return (
    <>
      <CardBox>
        <HospitalName>{hospitalName}</HospitalName>
        <MemoSection>
          <InputWrapper>
            <MemoInput
              placeholder="메모를 추가해보세요"
              value={memo ? memo : memoValue}
              onChange={handleMemoChange}
            />
            <ButtonWrapper onClick={openModal}>
              <img alt="icon-pen" src={IconPen} />
            </ButtonWrapper>
          </InputWrapper>
          <Modal
            isOpen={modalOpen}
            onClose={closeModal}
            title="메모"
            onSaved={handleSave}
          >
            <ModalInputWrapper onClick={(e) => e.stopPropagation()}>
              <ModalHospitalName>{hospitalName}</ModalHospitalName>
              <ModalInput
                placeholder={memo ? memo : "메모를 입력하세요"}
                value={memoValue}
                onChange={handleMemoChange}
              />
            </ModalInputWrapper>
          </Modal>
        </MemoSection>
      </CardBox>
    </>
  );
};

const HospitalName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #121212;
  border-bottom: 1px solid #b2b2b2;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const MemoSection = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MemoInput = styled.input`
  width: 90%;
  border: none;
`;

const ButtonWrapper = styled.button`
  width: 10%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ModalInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const ModalHospitalName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0 20px 0;
`;

const ModalInput = styled.textarea`
  width: 60%;
  height: 200px;
  border: solid 1px #b2b2b2;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  resize: none;
`;
