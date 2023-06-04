import React, { useState } from "react";
import styled, { css } from "styled-components";
import IconSearch from "../assets/iconSearch.svg";
import IconUp from "../assets/iconUp.svg";
import IconDown from "../assets/iconDown.svg";
import IconAlarm from "../assets/iconAlarm.svg";
import locationData from "../assets/addressList.json";

export const SearchBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    // Modal closed시에 선택된 주소 보여줌
    setSelectedLocationFirst(locationFirst);
    setSelectedLocationSecond(locationSecond);
  };
  const [locationFirst, setLocationFirst] = useState(
    locationData[0]["시/도"][1]
  );
  const [locationSecond, setLocationSecond] = useState(
    locationData[0]["시/군/구"][0]
  );
  const [selectedLocationFirst, setSelectedLocationFirst] =
    useState(locationFirst);
  const [selectedLocationSecond, setSelectedLocationSecond] =
    useState(locationSecond);
  //   console.log(location_data);
  // 시/도 드롭다운 컴포넌트
  const handleLocationFirstChange = (event) => {
    setLocationFirst(event.target.value);
  };

  const locationFirstOptions = locationData.map((location) => (
    <DropdownMenuItem
      key={location["시/도"][0]}
      value={location["시/도"][1]}
      selected={locationFirst === location["시/도"][1]}
      onClick={handleLocationFirstChange}
    >
      {location["시/도"][1]}
    </DropdownMenuItem>
  ));

  // 시/군/구 드롭다운 컴포넌트
  const handleLocationSecondChange = (event) => {
    const selectedCity = event.target.value;
    setLocationSecond(selectedCity);
  };

  const locationSecondOptions = locationData.map((location) => {
    if (location["시/도"][1] === locationFirst) {
      return location["시/군/구"].map((city) => (
        <DropdownMenuItem
          key={city}
          value={city}
          selected={locationSecond === city}
          onClick={handleLocationSecondChange}
        >
          {city}
        </DropdownMenuItem>
      ));
    } else {
      return null;
    }
  });

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Wrapper>
      <div>
        <Location>
          <BtnShowLocation onClick={openModal}>
            <img alt="icon-down" src={IconDown}></img>
          </BtnShowLocation>
          <span>{selectedLocationFirst + " " + selectedLocationSecond}</span>
          <Modal isOpen={modalIsOpen} onClose={closeModal}>
            <ModalContent>
              <ModalHeader>
                <BtnCloseModal onClick={closeModal}>
                  <img alt="icon-up" src={IconUp}></img>
                </BtnCloseModal>
                <div>
                  <span>위치선택</span>
                </div>
                <BtnSelected>{locationFirst}</BtnSelected>
                <BtnSelected>{locationSecond}</BtnSelected>
              </ModalHeader>
              <Dropdown>
                <div>
                  <DropdownMenu>
                    {locationFirstOptions.length > 6 ? (
                      <div>{locationFirstOptions}</div>
                    ) : (
                      locationFirstOptions
                    )}
                  </DropdownMenu>
                </div>
                <div>
                  <DropdownMenu>
                    {locationSecondOptions.length > 6 ? (
                      <div>{locationSecondOptions}</div>
                    ) : (
                      locationSecondOptions
                    )}
                  </DropdownMenu>
                </div>
              </Dropdown>
            </ModalContent>
          </Modal>
        </Location>
        <Alarm>
          <img alt="icon-alarm" src={IconAlarm}></img>
        </Alarm>
      </div>
      <InputBox>
        <input
          type="text"
          value={search}
          onChange={onChange}
          placeholder="병원 이름을 검색해보세요"
        />
        <BtnSearch>
          <img alt="search-button" src={IconSearch}></img>
        </BtnSearch>
      </InputBox>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  padding-top: 2%;
  margin: 2%;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Location = styled.div`
  width: 100%;
  display: flex;
  justify-contents: center;
  align-items: center;

  & > span {
    font-size: 24px;
  }
`;

const Alarm = styled.button`
  background: none;
  border: none;
  padding-right: 2%;
`;

const BtnShowLocation = styled.button`
  background: none;
  border: none;
`;

const InputBox = styled.div`
  width: 100%;
  border: 1px solid #b2b2b2;
  margin-top: 2%;
  padding: 2% 2.5%;
  box-sizing: border-box;
  border-radius: 28px;
  text-align: center;

  & > input {
    font-size: 24px;
    border: none;
    width: 100%;
  }
  & > input::placeholder {
    color: #d9d9d9;
  }
  & > input:focus {
    outline: none;
  }
`;

const BtnSearch = styled.button`
  background: none;
  border: none;
`;

const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  font-size: 25px;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  width: 600px;
  margin: 10%;
  margin-left: 2%;
  padding: 1%;
  border-radius: 4px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;

  & > div:nth-child(2) {
    color: #00ad5c;
    font-weight: 600;
    padding: 2%;
    margin: 2%;
    border-bottom: 2px solid;
  }

  & > span {
    width: 100%;
  }
`;

const BtnCloseModal = styled.button`
  background: none;
  border: none;
`;

const BtnSelected = styled.div`
  width: fit-content;
  background: #00ad5c;
  border: 1px solid #00a758;
  border-radius: 11px;
  color: #ffffff;
  padding: 1% 5%;
  margin: 2%;
  font-size: 20px;
  //   white-space: nowrap;
`;

const Dropdown = styled.div`
  position: relative;
  display: flex;
  background: none;

  & > div {
    width: 100%;
    border: 1px solid #d0d0d0;
    border-radius: 18px;
    padding: 2%;
    margin: 2%;
  }
`;

const DropdownMenu = styled.div`
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

const DropdownMenuItem = styled.option`
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
