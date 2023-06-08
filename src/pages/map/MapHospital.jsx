import * as Style from "./styles/MapStyle";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

//아이콘
import {
  IconDown,
  IconUp,
  IconClockMap,
  IconMapGray,
  IconTel,
  IconMyLocationW,
} from "../../assets/index";

// 공통 컴포넌트
import { Header, NavigationBar, CardBox } from "../../components/index";

export const MapHospital = () => {
  const dutyName = "엄민숙소아청소년과의원";
  const hospitalAddress = "서울시광진구";
  const todayText = "몇";
  const dutyTimeStart = "09:00";
  const dutyTimeClose = "18:30";
  const dutyTel = "02-000-0000";

  useEffect(() => {
    const mapElement = document.getElementById("map");
    mapElement.style.display = "block"; // display를 block으로 변경하여 보이도록 설정
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Style.Wrapper>
      <Header label={dutyName} />
      <Style.MapContainer>
        <Map
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          center={{ lat: 37.5665, lng: 126.978 }}
          level={3}
        />
        <Style.CardBoxWrap isOpen={isOpen}>
          <CardBox linkTo={"#"}>
            <div>
              <Style.CardBoxHeader>
                <Style.BtnHidden onClick={handleToggle}>
                  <img alt={"icon-down"} src={isOpen ? IconDown : IconUp}></img>
                </Style.BtnHidden>
                <div>{dutyName}</div>
              </Style.CardBoxHeader>
              <Style.CardBoxContent>
                <div>
                  <img alt={"icon-clock"} src={IconClockMap} />
                  <span>
                    {todayText +
                      "요일 " +
                      dutyTimeStart +
                      " ~ " +
                      dutyTimeClose}
                  </span>
                </div>
                <div>
                  <img alt={"icon-location"} src={IconMapGray} />
                  <span>{hospitalAddress}</span>
                </div>
                <div>
                  <img alt={"icon-telephone"} src={IconTel} />
                  <span>{dutyTel}</span>
                </div>
              </Style.CardBoxContent>
            </div>
          </CardBox>
        </Style.CardBoxWrap>
        <Style.ButtonStyle>
          <img alt={"icon-here"} src={IconMyLocationW}></img>
          <span>현위치</span>
        </Style.ButtonStyle>
      </Style.MapContainer>
      <NavigationBar />
    </Style.Wrapper>
  );
};
