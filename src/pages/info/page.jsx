import React from "react";
import { useNavigate } from "react-router-dom";
import userData from "./userdb.json";

import { NavigationBar } from "../../components/NavigationBar";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import styled from "styled-components";
import colors from "../../constants/colors";

const MyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 20px;
  position: relative;
`;

const MyContainerLeftAlign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 20px;
  position: relative;
  padding-left: 50px;
`;

const Logo = styled.img`
  margin-right: 10px;
`;

const MyContainerLeftAlignWithLogo = ({ logo, children }) => (
  <MyContainerLeftAlign>
    <Logo src={`${process.env.PUBLIC_URL}/${logo}`} alt="logo" />
    {children}
  </MyContainerLeftAlign>
);

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MyText = styled.h2`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const NameText = styled(MyText)`
  font-size: 20px;
  font-weight: bold;
`;

const SpecialText = styled(MyText)`
  color: #00ad5c;
  font-size: 25px;
  font-weight: bold;
`;

const Underline = styled.div`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background-color: green;
`;

const MyButton = styled.button`
  font-size: 15px;
  font-weight: 700;
  color: white;
  border: 1px solid ${colors.BtnborderOut};
  border-radius: 5px;
  background-color: ${colors.primary};
  cursor: pointer;
  padding: 1% 1.5%;
  position: absolute;
  right: 0;
`;

export default function MyPage() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("./childpage");
  };

  return (
    <Container>
      <Header
        label={"내정보"}
        onClick={() => {
          console.log("Button was clicked!");
        }}
      />
      <Container>
        <MyContainer>
          <TextContainer>
            <NameText>{userData.data[0].name}</NameText>
            <Underline />
          </TextContainer>
          <MyButton>회원정보 수정</MyButton>
        </MyContainer>
        <MyContainerLeftAlignWithLogo logo="address.png">
          <TextContainer>
            <MyText>{userData.data[0].address}</MyText>
          </TextContainer>
        </MyContainerLeftAlignWithLogo>
        <MyContainerLeftAlignWithLogo logo="phonenumber.png">
          <TextContainer>
            <MyText>{userData.data[0].phoneNumber}</MyText>
          </TextContainer>
        </MyContainerLeftAlignWithLogo>
        <MyContainerLeftAlignWithLogo logo="email.png">
          <TextContainer>
            <MyText>{userData.data[0].email}</MyText>
          </TextContainer>
        </MyContainerLeftAlignWithLogo>
        <MyContainer>
          <TextContainer>
            <SpecialText>우리 아이 관리</SpecialText>
            <Underline />
          </TextContainer>
          <MyButton onClick={handleClick}>아이정보 관리</MyButton>
        </MyContainer>
      </Container>
    </Container>
  );
}
