import React, { useState } from "react"; //, { useState }
import styled from "styled-components";
// 공통 컴포넌트
import { CardBox, Modal } from "../../components/index";
// 아이콘
import IconPen from "../../assets/iconPen.svg";

// eslint-disable-next-line react/prop-types
export const ReDetail = ({ hospitalName, reservationDate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CardBox>
        <HospitalName>{hospitalName}</HospitalName>
        <MemoSection>
          <input
            placeholder="메모를 추가해보세요"
            value=""
            style={{ width: "90%", border: "none" }}
          />
          <ButtonWrapper onClick={openModal}>
            <img alt="icon-pen" src={IconPen} />
          </ButtonWrapper>
          <Modal
            isOpen={modalOpen}
            onClose={closeModal}
            title="메모"
            style={{
              width: "60%",
            }}
          ></Modal>
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

const ButtonWrapper = styled.button`
  width: 10%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: right;
`;
