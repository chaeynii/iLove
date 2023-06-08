// /* eslint-disable */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

// 이미지 링크
import mainLogo from "../../assets/mainLogo.svg";

// 공통 컴포넌트 연결 링크
import { Button, Container } from "../../components/index";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

const UserData = {
  email: "test@naver.com",
  pw: "123456789",
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  // 버튼 활성화 비활성화 여부
  const [notAllow, setNotAllow] = useState(true);

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  // 비밀번호 유효성 검사
  const handlePassword = (e) => {
    setPw(e.target.value);
    if (e.target.value.length >= 8) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 회원가입으로 등록된 고객정보랑 일치하는지 확인
  // const ConfirmBut = () => {
  //   if (email === UserData.email && pw === UserData.pw) {
  //     alert("로그인에 성공했습니다.");
  //   } else {
  //     alert("등록되지 않은 회원입니다.");
  //   }
  // };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  // 로그인 폼 전송
  const getUserLoginInfo = async () => {
    // axios를 사용하여 post 요청
    axios
      .post("/users/login", {
        email: email,
        password: pw,
      })
      .then((response) => {
        // 성공 응답
        console.log("로그인 성공", response.data);
        const token = response.data.data.token;

        // 토큰 local storage에 저장
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        // 오류처리
        console.log("로그인 실패", error);
      });
  };

  return (
    <>
      <Container>
        <MainLogoDiv>
          <MainLogoImg src={mainLogo}></MainLogoImg>
          <H1>환영합니다!</H1>
        </MainLogoDiv>

        <LoginFormDiv>
          <LoginForm>
            <LoginInput
              placeholder="test123@test.com"
              type="email"
              value={email}
              onChange={handleEmail}
            ></LoginInput>
            {!emailValid && email.length > 0 && (
              <ErrorMaessage>올바른 이메일을 입력해주세요.</ErrorMaessage>
            )}
            <LoginInput
              placeholder="8자리 이상 입력해주세요"
              type="password"
              value={pw}
              onChange={handlePassword}
            ></LoginInput>
            {!pwValid && pw.length > 0 && (
              <ErrorMaessage>8자리 이상 입력해주세요.</ErrorMaessage>
            )}

            <LoginBtn>
              <Button
                btnFontSize={fontSize.but}
                label={"로그인하기"}
                btnColor={"white"}
                bgcolor={colors.primary}
                borderOutLine={colors.BtnborderOut}
                width={"90%"}
                height={"70px"}
                disabled={notAllow}
                onClick={getUserLoginInfo}
              />
            </LoginBtn>
          </LoginForm>
        </LoginFormDiv>

        <Div>
          <LoginUl>
            <LoginLi>아이디찾기</LoginLi>
            <LoginLi> | </LoginLi>
            <LoginLi>비밀번호찾기</LoginLi>
            <LoginLi> | </LoginLi>
            <LoginLi>회원가입</LoginLi>
          </LoginUl>
        </Div>
      </Container>
    </>
  );
};
export default Login;

const ErrorMaessage = styled.p`
  color: #c20000;
`;

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
  padding: 10% 5% 2% 5%;
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
const Div = styled.div`
  padding-bottom: 3%;
`;
const LoginUl = styled.div`
display: flex;
justify-content: center; /* 좌우정렬 */
padding: 1%;
}`;

const LoginLi = styled.div`
  padding: 0.5%;
  color: #b2b2b2;
`;
