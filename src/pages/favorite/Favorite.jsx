import * as Style from "../search/styles/SearchPageStyle";

// 공통 컴포넌트
import { Header, NavigationBar } from "../../components/index";

//import문
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

//utils
import { BE_URL, endpoint_hospital, endpoint_favorite } from "../../utils.js";

//병원리스트 - 병원카드 컴포넌트
import { HospitalCard } from "../search/HospitalCard";

export const Favorite = () => {
  // 유저 정보
  const userToken = localStorage.getItem("token");

  // 즐겨찾기 리스트 받아오기
  const [favoriteList, setFavoriteList] = useState([]);
  const { data: favoritesQuery, favoriteListIsLoading } = useQuery(
    ["favorites"],
    async () => {
      try {
        const response = axios
          .get(`${BE_URL}${endpoint_favorite}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => setFavoriteList(response.data.data));
        // return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  const [hosData, setHosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newHosData = [];

      for (const favoriteHospital of favoriteList) {
        const hospitalId = favoriteHospital.hospitalId;

        if (!newHosData.some((hospital) => hospital.id === hospitalId)) {
          const response = await axios.get(
            `${BE_URL}${endpoint_hospital}${hospitalId}`
          );
          newHosData.push(response.data.data);
        }
      }

      setHosData(newHosData);
    };

    if (favoriteList.length !== 0) {
      fetchData();
    }
  }, [favoriteList]);

  const renderHospitalCard = () => {
    if (hosData.length !== 0) {
      const hospitalCards = hosData.map((hospital) => {
        //today가 0일 경우(일요일) 7번째 dutyTime값을 가져오도록 함
        const dutyTimeStart =
          today === 0 ? hospital.dutyTime7s : hospital[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
        const dutyTimeClose =
          today === 0 ? hospital.dutyTime7c : hospital[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

        return (
          <HospitalCard
            key={hospital.id}
            hpid={hospital.id}
            hospitalName={hospital.dutyName}
            hospitalAddress={`${hospital.dutyAddr1Depth} ${hospital.dutyAddr2Depth} ${hospital.dutyAddr3Depth}`}
            today={today}
            dutyTimeStart={dutyTimeStart}
            dutyTimeClose={dutyTimeClose}
            favorite={true}
          />
        );
      });

      return hospitalCards;
    } else {
      return <p>자주 가는 병원을 즐겨찾기 해보세요!</p>;
    }
  };

  //로딩중일 경우 null값 반환
  if (favoriteListIsLoading) {
    return null;
  }

  //오늘 날짜(요일) 저장
  let now = new Date();
  const today = now.getDay();

  return (
    <>
      <Header label={"즐겨찾기"} />
      <Style.Wrapper>
        <Style.SearchHeader>
          <span>총 {favoriteList.length}개</span>
        </Style.SearchHeader>
        {renderHospitalCard()}
      </Style.Wrapper>
      <NavigationBar />
    </>
  );
};
