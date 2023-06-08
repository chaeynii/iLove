import * as Style from "./styles/SearchPageStyle";

//아이콘
import { IconSearch, IconUp, IconDown, IconAlarm } from "../../assets/index";

// 공통 컴포넌트
import { NavigationBar, SearchBar } from "../../components/index";

//import문
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

//병원리스트 - 병원카드 컴포넌트
import { HospitalCard } from "./HospitalCard";
import { Wrapper } from "../../components/styles/SearchBarStyle";
import SearchHeader from "./SearchHeader";

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
export const SearchPage = () => {
  //유저 id
  const [user_id, setUser_id] = useState(null);
  // 위치정보 depth1, depth2
  const [depth1, setDepth1] = useState("");
  const [depth2, setDepth2] = useState("");
  // 위치정보만 받았을 때의 전체 병원리스트
  const [hospitalList, setHospitalList] = useState([]);
  // 키워드 검색어
  const [searchKeyword, setSearchKeyword] = useState("");
  //키워드 검색 후 필터링 된 병원 리스트
  const [keywordFilteredHospitals, setKeywordFilteredHospitals] = useState([]);
  //정렬 옵션
  const [sortOption, setSortOption] = useState(
    SORT_OPTIONS.find((item) => item.state === "byPopular")
  );
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const handleDepthChange = (first, second) => {
    setDepth1(first);
    setDepth2(second);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const filterHospitals = (keyword, hospitalList) => {
    const filtered = hospitalList.filter((hospital) =>
      hospital.dutyName.includes(keyword)
    );
    setKeywordFilteredHospitals(filtered);
  };

  const usersQuery = useQuery("users", () =>
    axios
      .get(`${BE_URL}${endpoint_user}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => response.data)
  );

  const hospitalsQuery = useQuery("hospitals", () =>
    axios
      .get(
        depth2 === "전체" //depth2가 전체일 경우 depth1만 url 요청
          ? `${BE_URL}hospital?depth1=${depth1}&size=10&page=0`
          : `${BE_URL}hospital?depth1=${depth1}&depth2=${depth2}&size=10&page=0`
      )
      .then((response) => response.data)
  );

  const favoritesQuery = useQuery("favorites", () =>
    axios
      .get(`${BE_URL}${endpoint_favorite}user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => response.data)
  );
  //user_id 불러오는 함수
  useEffect(() => {
    if (usersQuery.isSuccess) {
      const fetchedUser_id = usersQuery.data.data.id;
      setUser_id(fetchedUser_id);
    }
  }, [usersQuery]);

  // user_id가 불러와졌다면, 즐겨찾기 목록 가져오기
  useEffect(() => {
    if (user_id !== null && favoritesQuery.isSuccess) {
      favoritesQuery.refetch();
    }
  }, [favoritesQuery, user_id]);

  //병원리스트 가져오기
  useEffect(() => {
    if (hospitalsQuery.isSuccess) {
      const hospitalList = hospitalsQuery.data.data;
      setHospitalList(hospitalList);
    }
  }, [hospitalsQuery.isSuccess]);
  //검색 키워드에 대한 결과를 병원리스트에서 추출하기
  useEffect(() => {
    if (searchKeyword) {
      filterHospitals(searchKeyword, hospitals);
    } else {
      setKeywordFilteredHospitals(hospitalList);
    }
  }, [searchKeyword, hospitalList]);

  if (
    usersQuery.isLoading ||
    hospitalsQuery.isLoading ||
    favoritesQuery.isLoading
  ) {
    return <div>Loading...</div>;
  }
  if (usersQuery.isError) {
    return <div>Error loading users: {usersQuery.error.message}</div>;
  }
  if (hospitalsQuery.isError) {
    return <div>Error loading hospitals: {hospitalsQuery.error.message}</div>;
  }
  if (favoritesQuery.isError) {
    return <div>Error loading favorites: {favoritesQuery.error.message}</div>;
  }
  const users = usersQuery.data;
  const hospitals = hospitalsQuery.data;
  const favorites = favoritesQuery.data || []; // favoritesQuery.data가 없을 경우 빈 배열로 초기화

  //오늘 요일에 따라 다른 dutyTime 가져오기
  let now = new Date();
  const today = now.getDay();

  const handleFavorite = (hpid) => {
    // 즐겨찾기 추가 또는 제거 로직 구현
    // hpid를 기반으로 즐겨찾기 상태를 변경할 수 있습니다.
    console.log("handleFavorite 실행, hpid:", hpid);
  };

  //-----------검색 정렬 함수
  const handleSortDropdownClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortOptionChange = (e) => {
    const selectedOptionState = e.target.value;
    const selectedOption = SORT_OPTIONS.find(
      (item) => item.state === selectedOptionState
    );

    if (selectedOption) {
      setSortOption(selectedOption);
      setIsSortDropdownOpen(false);
    }
  };
  return (
    <>
      <Wrapper>
        <SearchBar
          onSearch={handleSearch}
          depth1={depth1}
          depth2={depth2}
          onLocationChange={handleDepthChange}
        />
        <SearchHeader
          total={keywordFilteredHospitals.length}
          sortOption={"byPopular"}
          onOptionChange={handleSortOptionChange}
        ></SearchHeader>
        {keywordFilteredHospitals.map((hospital) => {
          const dutyTimeStart = hospital[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
          const dutyTimeClose = hospital[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

          //즐겨찾기 해당여부 체크
          const favorite = favorites.data.some(
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
              handleFavorite={handleFavorite}
            />
          );
        })}
        {/* </div> */}
      </Wrapper>
      <NavigationBar />
    </>
  );
};

export default SearchPage;
