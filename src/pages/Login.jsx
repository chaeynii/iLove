/* eslint-disable */

import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// 이미지 링크
import mainLogo from "../assets/mainLogo.svg";
import MainBanner from "../assets/mainBanner.png";
import iconPeople from "../assets/iconPeople.svg";
import arrowRight from "../assets/arrowRight.svg";

// 공통 컴포넌트 연결 링크
import { Button } from "../components/Button";
import { NavigationBar } from "../components/NavigationBar";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { CardBox } from "../components/CardBox";
import { SearchBar } from "../components/SearchBar";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";

// react-slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Login = () => {
  return (
    <>
      <Container>
        <Router>
          <MainLogoDiv>
            <MainLogoImg src={mainLogo}></MainLogoImg>
            <H1>환영합니다!</H1>
          </MainLogoDiv>

          <LoginFormDiv>
            <LoginForm>
              <LoginInput placeholder="test@naver.com" type="text"></LoginInput>
              <LoginInput
                placeholder="8자리 이상 입력해주세요"
                type="password"
              ></LoginInput>

              <LoginBtn>
                <Button
                  btnFontSize={fontSize.but}
                  label={"로그인하기"}
                  btnColor={"white"}
                  bgcolor={colors.primary}
                  borderOutLine={colors.BtnborderOut}
                  width={"90%"}
                  height={"70px"}
                />
              </LoginBtn>
            </LoginForm>
          </LoginFormDiv>
          <Footer />
          <NavigationBar />
        </Router>
      </Container>
    </>
  );
};
export default Login;

const MainLogoDiv = styled.div`
  margin-top: 4%;
`;

const MainLogoImg = styled.img`
  padding: 3% 3% 0 3%;
`;

const H1 = styled.p`
  font-size: 38px;
  margin: 0;
  padding: 2%;
  color: #00ad5c;
  font-weight: 700;
`;

const LoginFormDiv = styled.div`
  width: 100%;
  /* background-color: rgb(255, 212, 212); */
  padding: 10% 16% 2% 16%;
`;
const LoginForm = styled.form`
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  padding: 6%;
  text-align: center;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
`;
const LoginInput = styled.input`
  padding: 4%;
  width: 90%;
  margin: 4%;
  border-radius: 5px;
  border: 1px solid #b6b6b6;
  font-size: 18px;
`;
const LoginBtn = styled.div`
  margin: 5%;
`;
