import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 공통 컴포넌트 연결해서 테스트함
import { Button } from "../../components/Button";
import { NavigationBar } from "../../components/NavigationBar";
import { Container } from "../../components/Container";
import { CardBox } from "../../components/CardBox";
import { Header } from "../../components/Header";

// 상수로 뽑아둔 color, fontSize 연결 링크
import styled from "styled-components";
import colors from "../../constants/colors";

import ChildPage from "./ChildPage";

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1bkBlbWFpbC5jb20iLCJzdWIiOjQsImlhdCI6MTY4NjI0MTEzOCwiZXhwIjoxNzE3Nzk4NzM4fQ.KasXkCCr9xevwacUP2lA54x5Y4AElLhtTftH8Mj3jho";
const endpoint_user = "users";

//주소, 번호, 이메일 칸 앞에 로고넣기 위해 사용
const Logo = styled.img`
  margin-right: 10px;
`;

const Space = styled.div`
  margin-bottom: 20px;
`;

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

const InputBox = styled.input`
  width: 380px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
`;

const StyledInput = styled.input`
  font-weight: bold;
  font-size: 16px;
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

function MyPage() {
  let navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get("/users/get", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log(res1.data.data[0]);
        setUser(res1.data.data[0]);
        setEditData({
          name: res1.data.data[0].name,
          address: res1.data.data[0].address,
          phoneNumber: res1.data.data[0].phoneNumber,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // 클릭시 ChildPage로 이동
  const handleClick = () => {
    navigate("./ChildPage");
  };

  const handleEditClick = async () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      try {
        const response = await axios.patch("/users/update", editData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.data);
        } else {
          // handle error
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Header
        label={"내정보"}
        onClick={() => {
          console.log("Button was clicked!");
        }}
      />
      <Space />
      <Container>
        <MyContainer>
          {isEditing ? (
            <TextContainer>
              <StyledInput
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
              />
              <Underline />
            </TextContainer>
          ) : (
            <TextContainer>
              <NameText>{editData.name}</NameText>
              <Underline />
            </TextContainer>
          )}
          <MyButton onClick={handleEditClick}>
            {isEditing ? "저장" : "회원정보 수정"}
          </MyButton>
        </MyContainer>
        <MyContainerLeftAlignWithLogo logo="address.png">
          <TextContainer>
            {isEditing ? (
              <InputBox
                type="text"
                name="address"
                value={editData.address}
                onChange={handleInputChange}
              />
            ) : (
              <MyText>{editData.address}</MyText>
            )}
          </TextContainer>
        </MyContainerLeftAlignWithLogo>
        <MyContainerLeftAlignWithLogo logo="phonenumber.png">
          <TextContainer>
            {isEditing ? (
              <StyledInput
                type="text"
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleInputChange}
              />
            ) : (
              <MyText>{editData.phoneNumber}</MyText>
            )}
          </TextContainer>
        </MyContainerLeftAlignWithLogo>
        <MyContainerLeftAlignWithLogo logo="email.png">
          <TextContainer>
            <MyText>{user ? user.email : "Loading..."}</MyText>
          </TextContainer>
        </MyContainerLeftAlignWithLogo>
        <MyContainer>
          <TextContainer>
            <SpecialText>우리 아이 관리</SpecialText>
            <Underline />
          </TextContainer>
          <MyButton onClick={handleClick}>아이정보 관리</MyButton>
        </MyContainer>
        <NavigationBar />
      </Container>
    </Container>
  );
}

export default MyPage;
