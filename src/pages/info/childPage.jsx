/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import userData from "./userdb.json";

// 공통 컴포넌트 연결해서 테스트함
import { Button } from "../../components/Button";
import { NavigationBar } from "../../components/NavigationBar";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { CardBox } from "../../components/CardBox";
import { Header } from "../../components/Header";

// 상수로 뽑아둔 color, fontSize 연결 링크
import styled from "styled-components";
import colors from "../../constants/colors";

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

const SaveButton = styled.button`
  font-size: 30px;
  font-weight: 900;
  color: white;
  border: 1px solid ${colors.BtnborderOut};
  border-radius: 5px;
  background-color: ${colors.primary};
  cursor: pointer;
  padding: 0% 2.5%;
`;

const ChildBox = ({ linkTo }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBirthYearChange = (e) => {
    setBirthYear(e.target.value);
  };

  const handleBirthMonthChange = (e) => {
    setBirthMonth(e.target.value);
  };

  const handleBirthDayChange = (e) => {
    setBirthDay(e.target.value);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
  };

  return (
    <ChildBoxStyle>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div>
          {selectedImage ? (
            <>
              <img src={selectedImage} alt="Selected" />
              <button onClick={removeImage}>Remove Image</button>
            </>
          ) : (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          )}
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div>
            {isEditable ? (
              <>
                <label htmlFor="nameInput" style={{ fontWeight: "bold" }}>이름 </label>
                <InputBox
                  id="nameInput"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  style={{ fontWeight: "bold" }}
                />
              </>
            ) : (
              <p style={{fontWeight: 'bold', textAlign: 'left'}}>{name}</p>
            )}
          </div>
          <Space2 />
          <div>
            {isEditable ? (
              <>
                <label htmlFor="birthYearInput">생년 </label>
                <Input2Box
                  id="birthYearInput"
                  type="text"
                  value={birthYear}
                  onChange={handleBirthYearChange}
                  style={{ fontWeight: "bold" }}
                />
              </>
            ) : (
              <p style={{fontWeight: 'bold', textAlign: 'left'}}>{birthYear}</p>
            )}
            <label htmlFor="birthMonthInput" style={{ fontWeight: "bold" }}> 월일 </label>
            <Input2Box
              id="birthMonthInput"
              type="text"
              value={birthMonth}
              onChange={handleBirthMonthChange}
              style={{ fontWeight: "bold" }}
            />
            <Input2Box
              id="birthDayInput"
              type="text"
              value={birthDay}
              onChange={handleBirthDayChange}
              style={{ fontWeight: "bold", marginLeft: "10px" }}
            />
          </div>
        </div>
      </div>
      <SaveButton style={{ alignSelf: "flex-end" }} onClick={handleSaveClick}>저장</SaveButton>
    </ChildBoxStyle>
  );
};

const ChildBoxStyle = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  border: solid 1px #b2b2b2;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2%;
  margin: 1% 0;
  display: flex; 
  flex-direction: column; 
  align-items: flex-start;
  justify-content: space-between;
  img {
    max-width: 100px;
    margin-right: 10px;
  }
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

function ChildPage() {
  const [boxes, setBoxes] = useState([]);

  const handleClick = () => {
    const newBox = (
      <>
        <ChildBox />
        <Space />
      </>
    );

    setBoxes((prevBoxes) => [newBox, ...prevBoxes]);
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
      {boxes}
      <CardBox linkTo="/link-1">
        <div>
          <MyButton onClick={handleClick}>추가하기</MyButton>
        </div>
      </CardBox>
    </Container>
  );
}

export default ChildPage;
