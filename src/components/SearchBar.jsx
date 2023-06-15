import * as Style from "./styles/SearchBarStyle";
import React, { useState, useEffect, useMemo } from "react";

//아이콘 & 행정구역데이터 - assets
import {
  addressList as locationData,
  IconSearch,
  IconDown,
  IconAlarm,
} from "../assets/index";

// 공통 컴포넌트
import { Modal, Alarm } from "../components/index";

export const SearchBar = ({ onSearch, depth1, depth2, onLocationChange }) => {
  //--------------------검색부분
  //검색어
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  // 폼 전송 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };
  //--------------------위치선택&위치선택 모달창(알람모달과 구분 필요)
  //위치선택 값(모달 내부), 초기값은 [서울/전체]
  const [locationFirst, setLocationFirst] = useState(
    locationData[0]["시/도"][1]
  );
  const [locationSecond, setLocationSecond] = useState(
    locationData[0]["시/군/구"][0]
  );
  //위치선택 값(모달->페이지로 전달된 값)
  const [selectedLocationFirst, setSelectedLocationFirst] =
    useState(locationFirst);
  const [selectedLocationSecond, setSelectedLocationSecond] =
    useState(locationSecond);
  // 모달 열기 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  //모달 열기, 닫기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //모달 확인 버튼 -> 위치정보 저장됨
  const onSaved = () => {
    setSelectedLocationFirst(locationFirst);
    setSelectedLocationSecond(locationSecond);
    closeModal(); // 위치 저장 후 모달창을 닫음
    // SearchPage로 변경사항 전달
    // locationFirst가 locationData 배열에서 몇 번째 값인지 찾기
    const index = locationData.findIndex(
      (location) => location["시/도"][1] === locationFirst
    );

    // 해당 인덱스의 "시/도" 배열의 0번째 값을 depth1로 전달
    if (index !== -1) {
      const depth1Value = locationData[index]["시/도"][0];
      onLocationChange(depth1Value, locationSecond);
    }
  };
  useEffect(() => {
    onLocationChange(depth1, depth2);
  }, [depth1, depth2]);

  // 모달내부 : 시/도 드롭다운 함수&컴포넌트
  const handleLocationFirstChange = (event) => {
    setLocationFirst(event.target.value);
    setLocationSecond("전체"); // 시/도 클릭시 시/군/구 옵션을 전체로 초기화
  };
  const locationFirstOptions = useMemo(() => {
    return locationData.map((location) => (
      <Style.DropdownMenuItem
        key={location["시/도"][0]}
        value={location["시/도"][1]}
        selected={locationFirst === location["시/도"][1]}
        onClick={handleLocationFirstChange}
      >
        {location["시/도"][1]}
      </Style.DropdownMenuItem>
    ));
  }, [locationFirst]);

  // 모달내부: 시/군/구 드롭다운 함수&컴포넌트
  const handleLocationSecondChange = (event) => {
    const selectedCity = event.target.value;
    setLocationSecond(selectedCity);
  };
  const locationSecondOptions = useMemo(() => {
    return locationData.map((location) => {
      if (location["시/도"][1] === locationFirst) {
        return location["시/군/구"].map((city) => (
          <Style.DropdownMenuItem
            key={city}
            value={city}
            selected={locationSecond === city}
            onClick={handleLocationSecondChange}
          >
            {city}
          </Style.DropdownMenuItem>
        ));
      } else {
        return null;
      }
    });
  }, [locationFirst, locationSecond]);
  //------------알람 모달창 관련
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
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
        <Style.Location>
          <button onClick={openModal}>
            <img alt="icon-down" src={IconDown} />
          </button>
          <span>{selectedLocationFirst + " " + selectedLocationSecond}</span>
          {/* ModalOpen이 true일 경우에 Modal 컴포넌트 렌더링 실행 */}
          {isModalOpen && (
            <Modal
              title="위치선택"
              onClose={closeModal}
              isOpen="true"
              onSaved={onSaved}
            >
              <Style.ModalContent>
                <div>
                  <Style.BtnSelected>{locationFirst}</Style.BtnSelected>
                  <Style.BtnSelected>{locationSecond}</Style.BtnSelected>
                </div>
                <div>
                  <Style.DropdownMenu>
                    {locationFirstOptions}
                  </Style.DropdownMenu>
                  <Style.DropdownMenu>
                    {locationSecondOptions}
                  </Style.DropdownMenu>
                </div>
              </Style.ModalContent>
            </Modal>
          )}
        </Style.Location>
        <button onClick={openAlarmModal}>
          <img alt="icon-alarm" src={IconAlarm} />
        </button>
        {isAlarmModalOpen && (
          <Modal
            title="알람"
            onClose={closeAlarmModal}
            isOpen="true"
            onSaved={onSavedAlarmModal}
          >
            <Alarm></Alarm>
          </Modal>
        )}
      </div>
      <Style.InputBox>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={onChange}
            placeholder="병원 이름을 검색해보세요"
          />
          <button type="submit" style={{ cursor: "pointer" }}>
            <img alt="search-button" src={IconSearch} />
          </button>
        </form>
      </Style.InputBox>
    </Style.Wrapper>
  );
};
