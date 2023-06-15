import * as Style from "./styles/MapStyle";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import { useLocation } from "react-router-dom";

//아이콘
import {
  IconDown,
  IconUp,
  IconClockMap,
  IconMapGray,
  IconTel,
  IconMapG,
} from "../../assets/index";

// 공통 컴포넌트
import { Header, NavigationBar, CardBox } from "../../components/index";
//utils
import { formatTime, BE_URL, endpoint_hospital } from "../../utils.js";

//요일 정보 지정을 위한 상수
//일~월 : 0~6
const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
//오늘 날짜(요일) 저장
let now = new Date();
const today = now.getDay();

export const MapHospital = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const mapElement = document.getElementById("map");
    mapElement.style.display = "block"; // display를 block으로 변경하여 보이도록 설정
  }, []);

  //url에서 병원id 추출
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hospital_id = searchParams.get("id");
  // 해당 병원 데이터 받아오기
  const { data: hospitalQuery, isLoading: hospitalIsLoading } = useQuery(
    ["hospital"],
    async () => {
      try {
        const response = await axios.get(
          `${BE_URL}${endpoint_hospital}${hospital_id}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  //로딩중일 경우 null값 반환
  if (hospitalIsLoading) {
    return null;
  }

  //병원 데이터
  const hospitalData = hospitalQuery?.data ?? [];
  //위도&경도
  const hospitalLat = hospitalData.wgs84Lat;
  const hospitalLon = hospitalData.wgs84Lon;

  //요일 정보 변환
  const todayText = WEEK[today];
  //today가 0일 경우(일요일) 7번째 dutyTime값을 가져오도록 함
  const dutyTimeStart =
    today === 0 ? hospitalData.dutyTime7s : hospitalData[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
  const dutyTimeClose =
    today === 0 ? hospitalData.dutyTime7c : hospitalData[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

  console.log("병원데이터:", hospitalData);
  return (
    <Style.Wrapper>
      <Header label={hospitalData.dutyName} />
      <Style.MapContainer>
        <Map
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          center={{ lat: `${hospitalLat}`, lng: `${hospitalLon}` }}
          level={3}
        >
          <MapMarker
            position={{ lat: `${hospitalLat}`, lng: `${hospitalLon}` }}
            image={{
              src: IconMapG,
              size: {
                width: 64,
                height: 69,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
        </Map>
        <Style.CardBoxWrap isOpen={isOpen}>
          <CardBox linkTo={"#"}>
            <div>
              <Style.CardBoxHeader>
                <Style.BtnHidden onClick={handleToggle}>
                  <img alt={"icon-down"} src={isOpen ? IconDown : IconUp}></img>
                </Style.BtnHidden>
                <div>{hospitalData.dutyName}</div>
              </Style.CardBoxHeader>
              <Style.CardBoxContent>
                <div>
                  <img alt={"icon-location"} src={IconMapGray} />
                  <span>{hospitalData.dutyAddr}</span>
                </div>
                <div>
                  <img alt={"icon-clock"} src={IconClockMap} />
                  <span>
                    {dutyTimeStart
                      ? // dutyTime이 null 값일 경우 휴무로 표시
                        `${todayText}요일 ${formatTime(
                          dutyTimeStart
                        )} ~ ${formatTime(dutyTimeClose)}`
                      : `${todayText}요일 휴무`}
                  </span>
                </div>
                <div>
                  <img alt={"icon-telephone"} src={IconTel} />
                  <span>{hospitalData.dutyTel1}</span>
                </div>
              </Style.CardBoxContent>
            </div>
          </CardBox>
        </Style.CardBoxWrap>
      </Style.MapContainer>
      <NavigationBar />
    </Style.Wrapper>
  );
};
