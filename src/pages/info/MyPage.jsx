import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { instance } from "../../server/Fetcher";

// 공통 컴포넌트 연결해서 테스트함
import { NavigationBar } from "../../components/NavigationBar";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { ChildBox } from "./component/ChildBox";

// 상수로 뽑아둔 color, fontSize 연결 링크
import styled from "styled-components";
import colors from "../../constants/colors";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : false;
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

const KidContainer = styled.div`
  display: flex;
  flex-direction: column; // 추가
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

const AddressBox = styled.input`
  width: 380px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
`;

const NameBox = styled.input`
  width: 90px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const PhonedBox = styled.input`
  width: 130px;
  font-weight: bold;
  font-size: 16px;
`;

const MyText = styled.h2`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const NameText = styled(MyText)`
  font-size: 24px;
  font-weight: bold;
`;

const KidText = styled(MyText)`
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

const SaveButton = styled(MyButton)`
  right: 50px;
`;

const CancelButton = styled(MyButton)`
  right: 0;
  background-color: #ff0000; // Cancel button with red color for better UI.
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
  const [boxCreators, setBoxCreators] = useState([]);
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res1 = await instance.get("users/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res1);
        // setUser(res1.data.data[0]);
        // const fetchedData = {
        //   name: res1.data.data[0].name,
        //   address: res1.data.data[0].address,
        //   phoneNumber: res1.data.data[0].phoneNumber,
        // };
        // setEditData(fetchedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();

    const getKids = async () => {
      const axiosGet = await axios.get("/kid/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const kidsData = axiosGet.data.data;
      setBoxCreators(kidsData);
    };
    getKids();
  }, []);

  // 클릭시 ChildPage로 이동
  const handleClick = () => {
    navigate("./ChildPage");
  };

  const handleEditClick = async () => {
    // If we are in edit mode, then we update the user.
    if (isEditing) {
      // This will await the update of the user before setting isEditing to false.
      await updateUser();
      setIsEditing(false);
    }
    // If we are not in edit mode, then we set the originData to the current editData and enter edit mode.
    else {
      setSavedData({ ...editData }); // 수정 모드로 진입할 때 현재 데이터를 savedData에 저장
      setIsEditing(true);
    }
  };

  const handleCancleClick = () => {
    // 취소 버튼을 누르면 savedData로 되돌리고 편집 모드를 해제
    setEditData({ ...savedData }); // 취소 버튼을 눌렀을 때 savedData를 복구
    setIsEditing(false);
  };

  const updateUser = async () => {
    try {
      const response = await axios.patch(
        "users/update",
        {
          name: editData.name,
          phoneNumber: editData.phoneNumber,
          address: editData.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Success");
      } else {
        console.error("Faile");
      }
    } catch (error) {
      console.error(error);
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
              <NameBox
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
          {isEditing ? (
            <div>
              <SaveButton onClick={handleEditClick}>저장</SaveButton>
              <CancelButton onClick={handleCancleClick}>취소</CancelButton>
            </div>
          ) : (
            <MyButton onClick={handleEditClick}>회원정보 수정</MyButton>
          )}
        </MyContainer>
        <MyContainerLeftAlignWithLogo logo="address.png">
          <TextContainer>
            {isEditing ? (
              <AddressBox
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
              <PhonedBox
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
            <KidText>우리 아이 관리</KidText>
            <Underline />
          </TextContainer>
          <MyButton onClick={handleClick}>아이정보 관리</MyButton>
        </MyContainer>
        {/*
        <KidContainer>
          {boxCreators.map(({ id, name, gender, birth, memo, image }) => (
            <ChildBox
              alwaysShowEditAndRemove={false}
              defaultEditable={false}
              key={id}
              id={id}
              name={name}
              gender={gender}
              birth={birth}
              memo={memo}
              image={image}
            />
          ))}
        </KidContainer>
        */}
        <NavigationBar />
      </Container>
    </Container>
  );
}

export default MyPage;
