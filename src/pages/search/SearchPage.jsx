import React from "react";
// import styled from "styled-components";
import { useQuery } from "react-query";
import SearchHeader from "./SearchHeader";
import HospitalCard from "./HospitalCard";
import { NavigationBar } from "../../components/NavigationBar";

const SearchPage = () => {
  const usersQuery = useQuery("users", () =>
    fetch("http://localhost:9999/user").then((response) => response.json())
  );
  const hospitalsQuery = useQuery("hospitals", () =>
    fetch("http://localhost:9999/hospital").then((response) => response.json())
  );
  const favoritesQuery = useQuery("favorites", () =>
    fetch("http://localhost:9999/favorite").then((response) => response.json())
  );

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
  const favorites = favoritesQuery.data;

  const user_id = users[0].id;
  //오늘 요일에 따라 다른 dutyTime 가져오기
  let now = new Date();
  const today = now.getDay();

  return (
    <>
      <SearchHeader total={hospitals.length} />
      <div>
        {hospitals.map((hospital) => {
          const dutyTimeStart = hospital[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
          const dutyTimeClose = hospital[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

          // 즐겨찾기 해당여부 체크
          const favorite = favorites.some(
            (favoriteItem) =>
              favoriteItem.user_id === user_id &&
              favoriteItem.hpid === hospital.id
          );

          return (
            <HospitalCard
              key={hospital.id}
              hpid={hospital.id}
              hospitalName={hospital.dutyName}
              hospitalAddress={hospital.dutyAddr}
              today={today}
              dutyTimeStart={dutyTimeStart}
              dutyTimeClose={dutyTimeClose}
              favorite={favorite}
            />
          );
        })}
      </div>
      <NavigationBar />
    </>
  );
};

export default SearchPage;
