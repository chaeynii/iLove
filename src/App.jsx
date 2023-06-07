import { RegisterForm } from "./pages/registerForm/RegisterForm";
import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// 공통 컴포넌트 연결
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
  Post,
  SearchPage,
  SignUp,
  Detail,
} from "./pages/index";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Container>
        <Router>
          <Footer />
          <NavigationBar />
        </Router>
      </Container>
    </>
  );
}

export default App;

