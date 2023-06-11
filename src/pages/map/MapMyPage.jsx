import * as Style from "./styles/MapStyle";
import React, { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";

//아이콘
import { IconMyLocationW } from "../../assets/index";

// 공통 컴포넌트
import { Header, NavigationBar } from "../../components/index";

export const MapMyPage = () => {
  useEffect(() => {
    const mapElement = document.getElementById("map");
    mapElement.style.display = "block"; // display를 block으로 변경하여 보이도록 설정
  }, []);

  return (
    <Style.Wrapper>
      <Header label={"내 위치 설정"}></Header>
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
        <Style.MyLocationBtn>
          <img alt={"icon-here"} src={IconMyLocationW}></img>
          <span>위치 지정 완료</span>
        </Style.MyLocationBtn>
      </Style.MapContainer>
      <NavigationBar />
    </Style.Wrapper>
  );
};
