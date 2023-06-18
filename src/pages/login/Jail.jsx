import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 공통 컴포넌트
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "../../components/index";
import styled from "styled-components";
import logo from "../../assets/newLogo.jpg";
import colors from "../../constants/colors";

export const Jail = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      axios
        .get("/users/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.data.adminVerified) {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <JailContainer>
        <CardBox>
          <img src={logo} alt="logo" />
          <p>승인 대기중인 계정입니다</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              localStorage.removeItem("user");
              localStorage.removeItem("verified");
              navigate("/");
            }}
          >
            로그아웃
          </button>
        </CardBox>
      </JailContainer>
    </>
  );
};

const JailContainer = styled.div`
  width: 100%;
  max-width: 834px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 3%; /* 고정 내비게이션과 겹치지 않도록 콘텐츠 하단에 패딩 추가 */
  margin-top: 200px;
  padding: 0 30px 0 30px;
  div {
    height: 300px;
  }
  img {
    width: 120px;
    margin-top: 20px;
  }
  p {
    font-weight: 600;
    font-size: 20px;
    margin: 60px 0 10px 0;
  }
  button {
    width: 100px;
    height: 40px;
    margin: 20px;
    font-size: 14px;
    font-weight: 500;
    background-color: ${colors.primary};
    border-radius: 5px;
    border: none;
    color: white;
    cursor: pointer;
    :hover {
      opacity: 70%;
    }
  }
`;
