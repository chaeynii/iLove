import { RegisterForm } from "./pages/registerForm/RegisterForm";

import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 공통 컴포넌트 연결해서 테스트함
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "./components/index";
// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "./constants/colors";
import fontSize from "./constants/fontSize";

// 페이지 연결
import {
  AdminHome,
  Home,
  MyPage,
  Login,
  SearchPage,
  SignUp,
  Detail,
  Reserve,
  MapHospital,
  MapMyPage,
  ReservationChk,
  ChildPage,
  Favorite,
  ModifyForm,
} from "./pages/index";

// const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      {" "}
      {/* Router 컴포넌트 추가 */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="admin" element={<AdminHome />} />
        <Route path="/reserve" element={<ReservationChk />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/detail/" element={<Detail />} />
        <Route path="/detail/reserve" element={<Reserve />} />
        <Route path="/detail/map" element={<MapHospital />} />
        <Route path="/Mypage" element={<MyPage />} />
        <Route path="/Mypage/ChildPage" element={<ChildPage />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/modify" element={<ModifyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
