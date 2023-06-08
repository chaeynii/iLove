/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import userData from "./userdb.json";
import newKidMockData from "./newKidMockData.json";

// 공통 컴포넌트 연결해서 테스트함
import { Button } from "../../components/Button";
import { NavigationBar } from "../../components/NavigationBar";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { CardBox } from "../../components/CardBox";
import { Header } from "../../components/Header";
import { ChildBox } from "../../components/ChildBox";

// 상수로 뽑아둔 color, fontSize 연결 링크
import styled from "styled-components";
import colors from "../../constants/colors";

import MyPage from "./MyPage";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Space = styled.div`
  margin-bottom: 20px;
`;

const Space2 = styled.div`
  margin-bottom: 5px;
`;

const InputBox = styled.input`
  width: 280px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 24px;
  padding: 2%;
`;

const Input2Box = styled.input`
  width: 75px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 11px;
  padding: 2%;
`;

const MyButton = styled.button`
  font-size: 30px;
  font-weight: 700;
  color: white;
  border: 1px solid ${colors.BtnborderOut};
  border-radius: 5px;
  background-color: ${colors.primary};
  cursor: pointer;
  padding: 1% 5.5%;
`;

const BackButton = styled(Button)`
  margin-top: 20px;
  text-align: center;
`;

function ChildPage() {
  const [boxCreators, setBoxCreators] = useState([]);

  const handleClick = () => {
    const newBoxId = Date.now();
    const newBoxCreator = () => <ChildBox key={newBoxId} id={newBoxId} onRemove={handleRemove} />;
    setBoxCreators((prevCreators) => [newBoxCreator, ...prevCreators]);
  };

  const handleRemove = (id) => {
    setBoxCreators((prevCreators) => prevCreators.filter(creator => creator().props.id !== id));
  };

  return (
    <Container>
      <Header
        label={"아이정보 수정"}
        onClick={() => {
          console.log("Button was clicked!");
        }}
      />
      <Space />
      {boxCreators.map(createBox => createBox())}
      <CardBox>
        <div>
          <MyButton onClick={handleClick}>추가하기</MyButton>
        </div>
      </CardBox>
      <BackButton as={Link} to="/MyPage">돌아가기</BackButton>
      <Space />
      <NavigationBar />
    </Container>
  );
}

export default ChildPage;
