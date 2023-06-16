import * as Style from "./styles/SearchBarStyle";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../constants/colors";

// 공통 컴포넌트
import { Modal, AlarmList } from "./index";
import axios from "axios";

export const AlarmButton = () => {
  const testToken = localStorage.getItem("token");
  //------------알람 모달창 관련
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [listLength, setListLength] = useState(0);

  const onListChange = (length) => {
    setListLength(length);
  };

  useEffect(() => {
    if (testToken) {
      axios
        .get("/reservation/alarm", {
          headers: {
            Authorization: `Bearer ${testToken}`,
          },
        })
        .then((res) => {
          const response = res.data.data;
          const alarmFilter = response.filter((item) => item.read === false);
          setListLength(alarmFilter.length);
        });
    }
  }, []);

  const openAlarmModal = () => {
    setIsAlarmModalOpen(true);
  };
  const closeAlarmModal = () => {
    setIsAlarmModalOpen(false);
  };
  const onSavedAlarmModal = () => {
    // 알람모달에서 확인버튼 클릭 시
    closeAlarmModal(); // 알람 모달을 닫음
  };
  return (
    <Style.Wrapper>
      <div>
        <MenuSeb onClick={openAlarmModal}>
          {/* <img alt="icon-alarm" src={IconAlarm} /> */}
          <SebP>알림</SebP>
          <CircleContainer>
            <SebPSeb>{listLength}</SebPSeb>
          </CircleContainer>
        </MenuSeb>
        {isAlarmModalOpen && (
          <Modal
            title="알람"
            onClose={closeAlarmModal}
            isOpen="true"
            onSaved={onSavedAlarmModal}
          >
            <AlarmList onListChange={onListChange} />
          </Modal>
        )}
      </div>
    </Style.Wrapper>
  );
};
const SebP = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #121212;
  margin-right: 2px;
`;
const MenuSeb = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.primary};
`;
const SebPSeb = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
