/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

// 알림창 라이브러리
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// 이미지 링크
import mainLogo from "../../assets/mainLogo.svg";

// 공통 컴포넌트 연결 링크

import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "../../components/index";

import { MyComponent } from "./MyComponent";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

// tab을 true/false로 하는 것 보다 하나의 state로 관리하는게 좀 더 가독성이 나을 것 같아서 리팩토링.
export const SignUp = () => {
  const location = useLocation();
  //  searchParams를 쉽게 파싱해주는 URLSearchParams를 이용
  //  https://blog.jeongwoo.in/javascript-url%EC%9D%98-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-%EA%B0%92%EC%9D%84-%ED%99%95%EC%9D%B8%ED%95%98%EA%B3%A0-%EC%8B%B6%EC%9D%84%EB%95%8C-urlsearchparams-28b44c2036fa
  const searchParams = new URLSearchParams(location.search);

  // searchParams.get("tab") 값이 null이면('병원 관리자 등록 버튼'으로 온게 아닐 경우) "user"로 초기화
  // https://ko.javascript.info/nullish-coalescing-operator
  const initailTabValue = searchParams.get("tab") ?? "user";
  const [tabView, setTabView] = useState(initailTabValue); // "hospital" or "user"

  const handleChangeTab = (tabValue) => {
    setTabView(tabValue);
  };

  return (
    <>
      <Container>
        <div>
          <SignUpDiv>
            <SignUpImg src={mainLogo}></SignUpImg>
            <H1>회원가입</H1>
          </SignUpDiv>
          <SignUpFormDiv>
            <ChangeButtonDiv>
              <ButtonUser
                className={tabView === "user" ? "" : "active"}
                onClick={() => handleChangeTab("user")}
              >
                일반 회원
              </ButtonUser>
              <ButtonHospital
                className={tabView === "hospital" ? "active" : ""}
                onClick={() => handleChangeTab("hospital")}
              >
                병원 클라이언트
              </ButtonHospital>
            </ChangeButtonDiv>
            {tabView === "hospital" ? <HospitalView /> : <UserView />}
          </SignUpFormDiv>
        </div>
        <NavigationBar />
      </Container>
    </>
  );
};
export default SignUp;

// 일반 회원 창
const UserView = () => {
  // 이메일
  const [email, setEmail] = useState("");

  //비밀번호
  const [pw, setPw] = useState("");
  const [pwValid, setPwValid] = useState(false);

  // 비밀번호 확인
  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckValid, setPwCheckValid] = useState(false);

  // 핸드폰번호
  const [phone, setPhone] = useState("");

  // 이름
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);

  //버튼 활성화
  const [notAllow, setNotAllow] = useState(true);

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailRegex.test(email) ? true : false;

  // 비밀번호 유효성 검사
  const handlePassword = (e) => {
    setPw(e.target.value);
    if (e.target.value.length >= 8) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 비밀번호 확인 검사
  const handlePasswordCheck = (e) => {
    setPwCheck(e.target.value);
    if (pw === e.target.value) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  };

  // 핸드폰 유효성 검사
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const phoneRegex = /^01[0-9]{1}-[0-9]{4}-[0-9]{4}$/;
  const phoneValid = phoneRegex.test(phone) ? true : false;

  // 이름 빈값인지 확인
  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value !== "") {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  // 버튼 활성화
  useEffect(() => {
    if (emailValid && pwValid && pwCheckValid && nameValid && phoneValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid, pwCheckValid, nameValid, phoneValid]);

  // 폼 전송 구현
  const register = () => {
    // axios를 사용하여 POST 요청 만들기
    axios
      .post("/users/clientsignup", {
        name: name,
        email: email,
        password: pw,
        phoneNumber: phone,
      })
      .then((response) => {
        // 회원가입 성공
        // 홈으로 이동
        // useNavigate("/");
        window.location.href = "/";
        console.log("등록 성공", response.data);
      })
      .catch((error) => {
        // 오류 처리
        toast("이미 가입된 사용자입니다.");
        console.error("등록 에러", error);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={4000}
        hideProgressBar
      />
      <SignUpForm>
        <SignUpInputDiv>
          <InputTitle>이름</InputTitle>
          <SignUpInput
            placeholder="아이사"
            type="text"
            value={name}
            onChange={handleName}
          ></SignUpInput>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>이메일</InputTitle>
          <SignUpInput
            placeholder="test123@test.com"
            type="email"
            value={email}
            onChange={handleEmail}
          ></SignUpInput>
          {!emailValid && email.length > 0 && (
            <ErrorMaessage>올바른 이메일을 입력해주세요.</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>핸드폰번호</InputTitle>
          <SignUpInput
            placeholder="010-0000-0000"
            type="text"
            value={phone}
            onChange={handlePhone}
          ></SignUpInput>
          {!phoneValid && phone.length > 0 && (
            <ErrorMaessage>-을 붙여서 입력해주세요</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
            value={pw}
            onChange={handlePassword}
          ></SignUpInput>
          {!pwValid && pw.length > 0 && (
            <ErrorMaessage>8자리 이상 입력해주세요.</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호 확인</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
            value={pwCheck}
            onChange={handlePasswordCheck}
          ></SignUpInput>
          {!pwCheckValid && pwCheck.length > 0 && (
            <ErrorMaessage>비밀번호가 다릅니다</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpBtn>
          <Button
            btnFontSize={fontSize.but}
            label={"회원가입"}
            btnColor={"white"}
            bgcolor={colors.primary}
            borderOutLine={colors.BtnborderOut}
            width={"90%"}
            height={"70px"}
            disabled={notAllow}
            onClick={() => {
              register();
            }}
          />
        </SignUpBtn>
      </SignUpForm>
    </>
  );
};

const HospitalView = () => {
  // 이메일
  const [email, setEmail] = useState("");

  //비밀번호
  const [pw, setPw] = useState("");
  const [pwValid, setPwValid] = useState(false);

  // 비밀번호 확인
  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckValid, setPwCheckValid] = useState(false);

  // 핸드폰번호
  const [phone, setPhone] = useState("");

  // 이름
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);

  //버튼 활성화
  const [notAllow, setNotAllow] = useState(true);

  // 병원 이름
  const [hospitalNameInput, sethospitalNameInput] = useState("");

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailRegex.test(email) ? true : false;

  // 비밀번호 유효성 검사
  const handlePassword = (e) => {
    setPw(e.target.value);
    if (e.target.value.length >= 8) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 비밀번호 확인 검사
  const handlePasswordCheck = (e) => {
    setPwCheck(e.target.value);
    if (pw === e.target.value) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  };

  // 핸드폰 유효성 검사
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const phoneRegex = /^01[0-9]{1}-[0-9]{4}-[0-9]{4}$/;
  const phoneValid = phoneRegex.test(phone) ? true : false;

  // 이름 빈값인지 확인
  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value !== "") {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  // 버튼 활성화
  useEffect(() => {
    if (emailValid && pwValid && pwCheckValid && nameValid && phoneValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid, pwCheckValid, nameValid, phoneValid]);

  // 폼 전송 구현
  const register = () => {
    // axios를 사용하여 POST 요청 만들기
    axios
      .post("/users/managersignup", {
        hospitalId: name,
        name: name,
        email: email,
        password: pw,
        phoneNumber: phone,
      })
      .then((response) => {
        // 성공적인 응답 처리
        // useNavigate("/");
        // window.location.href = "/";
        console.log("등록 성공", response.data);
      })
      .catch((error) => {
        // 오류 처리
        console.error("등록 에러", error);
        toast("이미 가입된 사용자입니다.");
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={4000}
        hideProgressBar
      />
      <SignUpForm>
        <SignUpInputDiv>
          <InputTitle>담당자 성함</InputTitle>
          <SignUpInput
            placeholder="테스트"
            type="text"
            value={name}
            onChange={handleName}
          ></SignUpInput>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>병원명</InputTitle>
          <MyComponent />

          <P>
            *찾으시는 병원이 없으실 경우 하단에 신규 병원 등록 신청하기를
            눌러주세요.
          </P>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>담당자 핸드폰번호</InputTitle>
          <SignUpInput
            placeholder="010-0000-0000"
            type="text"
            value={phone}
            onChange={handlePhone}
          ></SignUpInput>
          {!phoneValid && phone.length > 0 && (
            <ErrorMaessage>-을 붙여서 입력해주세요</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>담당자 이메일</InputTitle>
          <SignUpInput
            placeholder="test@naver.com"
            type="email"
            value={email}
            onChange={handleEmail}
          ></SignUpInput>
          {!emailValid && email.length > 0 && (
            <ErrorMaessage>올바른 이메일을 입력해주세요.</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
            value={pw}
            onChange={handlePassword}
          ></SignUpInput>
          {!pwValid && pw.length > 0 && (
            <ErrorMaessage>8자리 이상 입력해주세요.</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호 확인</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
            value={pwCheck}
            onChange={handlePasswordCheck}
          ></SignUpInput>
          {!pwCheckValid && pwCheck.length > 0 && (
            <ErrorMaessage>비밀번호가 다릅니다</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpBtn>
          <Button
            btnFontSize={fontSize.but}
            label={"회원가입"}
            btnColor={"white"}
            bgcolor={colors.primary}
            borderOutLine={colors.BtnborderOut}
            width={"90%"}
            height={"70px"}
            disabled={notAllow}
            onClick={() => {
              register();
            }}
          />
        </SignUpBtn>

        <Link to="/register">
          <ButP>신규 병원 등록 신청하기</ButP>
        </Link>
      </SignUpForm>
    </>
  );
};

const ButP = styled.p`
  margin-top: 4%;
  font-size: 20px;
`;

const ButtonHospital = styled.button`
  /* 일반 버튼 스타일 */
  font-size: ${fontSize.but};
  font-weight: 500;
  color: ${colors.InputBorderInFont};
  width: 50%;
  border: 1px solid ${colors.InputBorderOut};
  border-bottom: none;
  background-color: white;
  cursor: pointer;
  padding: 5%;

  /* 활성 버튼 스타일 */
  &.active {
    font-size: ${fontSize.but};
    font-weight: 500;
    color: white;
    width: 50%;
    border: 1px solid ${colors.primary};
    border-bottom: none;
    background-color: ${colors.primary};
    cursor: pointer;
    padding: 5%;
  }
`;

const ButtonUser = styled.button`
  /* 일반 버튼 스타일 */
  font-size: ${fontSize.but};
  font-weight: 500;
  color: white;
  width: 50%;
  border: 1px solid ${colors.primary};
  border-bottom: none;
  background-color: ${colors.primary};
  cursor: pointer;
  padding: 5%;

  /* 활성 버튼 스타일 */
  &.active {
    font-size: ${fontSize.but};
    font-weight: 500;
    color: ${colors.InputBorderInFont};
    width: 50%;
    border: 1px solid ${colors.InputBorderOut};
    border-bottom: none;
    background-color: white;
    cursor: pointer;
    padding: 5%;
  }
`;

const SignUpDiv = styled.div`
  margin-top: 4%;
`;

const SignUpImg = styled.img`
  padding: 3% 3% 0 3%;
`;

const H1 = styled.p`
  font-size: 38px;
  margin: 0;
  padding: 2%;
  color: #00ad5c;
  font-weight: 700;
`;

const SignUpFormDiv = styled.div`
  width: 100%;
  padding: 10% 5% 2% 5%;
`;
const SignUpForm = styled.form`
  border: 1px solid ${colors.InputBorderOut};
  border-radius: 5px;
  padding: 10%;
  text-align: center;
  margin-bottom: 13%;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
`;
const SignUpInput = styled.input`
  padding: 4%;
  width: 90%;
  margin: 4%;
  border-radius: 5px;
  border: 1px solid ${colors.InputBorderOut};
  font-size: 18px;
`;
const SignUpBtn = styled.div`
  margin-top: 10%;
`;

const SignUpInputDiv = styled.div``;

const InputTitle = styled.p`
  font-size: 18px;
  text-align: left;
  padding-left: 5%;
`;

const ChangeButtonDiv = styled.div`
  width: 100%;
`;

const P = styled.p`
  font-size: 14px;
  color: #c20000;
  margin-bottom: 3%;
`;

const ErrorMaessage = styled.p`
  color: #c20000;
`;
