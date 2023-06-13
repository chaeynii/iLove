import * as Style from "../search/styles/SearchPageStyle";

//아이콘
import { IconDown } from "../../assets/index";

// 공통 컴포넌트
import { Header, NavigationBar } from "../../components/index";

//import문
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

//utils
import {
  BE_URL,
  endpoint_user,
  endpoint_hospital,
  endpoint_favorite,
} from "../../utils.js";

//병원리스트 - 병원카드 컴포넌트
import { HospitalCard } from "../search/HospitalCard";

//검색 정렬 옵션
const SORT_OPTIONS = [
  { name: "인기순", state: "byPopular" },
  { name: "이름순", state: "byName" },
];

export const Favorite = () => {
  //검색 필터 옵션
  const [option, setOption] = useState(SORT_OPTIONS[0]);

  // 옵션창 펼쳐졌는지
  const [isOpenOption, setIsOpenOption] = useState(false);
  // 유저 정보
  const userToken = localStorage.getItem("token");
  const { data: userInfo, userIsLoading } = useQuery(
    ["user"],
    // instance를 사용해 중복되는 옵션 제거 -> ?????
    () =>
      axios.get(`${BE_URL}${endpoint_user}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
    {
      //백엔드에서 주는 데이터를 내가 원하는 가공해서 받을 수 있습니다.
      select: (response) => {
        return response.data; // 이 데이터는 위의 userInfo로 받을 수 있어요.
      },
      // 에러 핸들링
      onError: (error) => {
        console.log(error);
      },
    }
  );

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

  const input = () => {
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
            handleFavorite={() => {}}
          />
        );
      });

      return hospitalCards;
    } else {
      return <p>자주 가는 병원을 즐겨찾기 해보세요!</p>;
    }
  };

  //로딩중일 경우 null값 반환
  if (userIsLoading || favoriteListIsLoading) {
    return null;
  }

  //유저정보
  const userData = userInfo?.data ?? [];
  //유저아이디
  const user_id = userData.id;

  //오늘 날짜(요일) 저장
  let now = new Date();
  const today = now.getDay();

  // 검색 옵션버튼 클릭 시
  const handleOptionClick = () => {
    setIsOpenOption(!isOpenOption);
  };
  // 검색 옵션(SORT OPTION) 변경 시
  const handleOptionChange = (e) => {
    const selectedOptionState = e.target.value;
    const selectedOption = SORT_OPTIONS.find(
      (option) => option.state === selectedOptionState
    );

    if (selectedOption) {
      setOption(selectedOption);
      setIsOpenOption(false);
    }
  };

  return (
    <>
      <Header label={"즐겨찾기"} />
      <Style.Wrapper>
        <Style.SearchHeader>
          <span>총 {favoriteList.length}개</span>
        </Style.SearchHeader>
        {input()}
      </Style.Wrapper>
      <NavigationBar />
    </>
  );
};
