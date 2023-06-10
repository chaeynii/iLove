import * as Style from "../search/styles/SearchPageStyle";

//아이콘
import { IconDown } from "../../assets/index";

// 공통 컴포넌트
import { Header, NavigationBar } from "../../components/index";

//import문
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

//병원리스트 - 병원카드 컴포넌트
import { HospitalCard } from "../search/HospitalCard";

//검색 정렬 옵션
const SORT_OPTIONS = [
  { name: "인기순", state: "byPopular" },
  { name: "이름순", state: "byName" },
];

//URL
const BE_URL = `http://34.64.69.226:3000/`;
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGUubWFpbCIsInN1YiI6MSwiaWF0IjoxNjg2MjM0NjUxLCJleHAiOjE3MTc3OTIyNTF9.QORp6FfVmnROH3A-OCvHzYKjzZVAXjADpKcwmCwGeAA";
const endpoint_user = `users`;
const endpoint_favorite = `favorite/`;

export const Favorite = () => {
  //검색 필터 옵션
  const [option, setOption] = useState(SORT_OPTIONS[0]);

  // 옵션창 펼쳐졌는지
  const [isOpenOption, setIsOpenOption] = useState(false);
  // 유저 정보
  const { data: userQuery, userIsLoading } = useQuery(["user"], async () => {
    try {
      const response = await axios.get(`${BE_URL}${endpoint_user}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  // 즐겨찾기 리스트 받아오기
  const { data: favoritesQuery, favoriteListIsLoading } = useQuery(
    ["favorites"],
    async () => {
      try {
        const response = axios
          .get(`${BE_URL}${endpoint_favorite}user`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  //로딩중일 경우 null값 반환
  if (userIsLoading || favoriteListIsLoading) {
    return null;
  }

  //유저정보
  const userData = userQuery?.data ?? [];
  const user_id = userData.id;

  //즐겨찾기 리스트
  const favoritesList = favoritesQuery?.data ?? [];

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
          <span>총 {favoritesList.length} 개</span>
          <Style.DropdownContainer>
            <button onClick={handleOptionClick}>
              {option.name}
              <img alt="icon-down" src={IconDown}></img>
            </button>
            {isOpenOption && (
              <div>
                {SORT_OPTIONS.map((option) => (
                  <option
                    key={option.state}
                    value={option.state}
                    onClick={handleOptionChange}
                  >
                    {option.name}
                  </option>
                ))}
              </div>
            )}
          </Style.DropdownContainer>
        </Style.SearchHeader>
        {favoritesList.length > 0 ? (
          favoritesList.map((hospital) => {
            const dutyTimeStart = hospital[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
            const dutyTimeClose = hospital[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

            //즐겨찾기 해당여부 체크
            const favorite = favoritesList.some(
              (favoriteItem) =>
                favoriteItem.user_id === user_id &&
                favoriteItem.hpid === hospital.id
            );

            return (
              <HospitalCard
                key={hospital.id}
                hpid={hospital.id}
                hospitalName={hospital.dutyName}
                hospitalAddress={`${hospital.dutyAddr1Depth} ${hospital.dutyAddr2Depth} ${hospital.dutyAddr3Depth}`}
                today={today}
                dutyTimeStart={dutyTimeStart}
                dutyTimeClose={dutyTimeClose}
                favorite={favorite}
                handleFavorite={() => {}}
              />
            );
          })
        ) : (
          <p>자주 가는 병원을 즐겨찾기 해보세요!</p>
        )}
      </Style.Wrapper>
      <NavigationBar />
    </>
  );
};
