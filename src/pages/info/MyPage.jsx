import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../server/Fetcher";

//아이콘
import {
  IconMypageLocation,
  IconMypageTel,
  IconEmail,
} from "../../assets/index";

// 공통 컴포넌트 연결해서 테스트함
import { NavigationBar } from "../../components/NavigationBar";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { ChildBox } from "./component/ChildBox";
import { Post } from "../registerForm/Post";

// 상수로 뽑아둔 color, fontSize 연결 링크
import styled from "styled-components";
import colors from "../../constants/colors";

//주소, 번호, 이메일 칸 앞에 로고넣기 위해 사용

const MyContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 20px;

  & > div:first-child {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid 2px ${colors.primary};
    padding: 1.5% 2%;
    font-size: 20px;
    font-weight: 700;
  }

  & > div:nth-child(2) {
    width: 20%;
    display: flex;
    position: absolute;
    left: 90%;
    transform: translate(-50%, 0);
  }

  & input {
    border: none;
    font-size: 16px;
    text-align: center;
  }

  & input:focus {
    outline: none;
  }
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

const InfoList = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  padding: 1%;

  & img {
    margin: 1%;
  }

  & span {
    margin: 1%;
  }

  & input {
    border: none;
    font-size: 16px;
    text-align: left;
  }

  & input:focus {
    outline: none;
  }
`;

const MyButton = styled.button`
  font-size: 15px;
  font-weight: 700;
  width: 100%;
  margin: 3%;
  padding: 5%;
  color: white;
  border: 1px solid ${colors.BtnborderOut};
  border-radius: 5px;
  background-color: ${colors.primary};
  cursor: pointer;
`;

function MyPage() {
  let navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({});
  const [boxCreators, setBoxCreators] = useState([]);
  const [savedData, setSavedData] = useState(null);
  const [fullAddress, setFullAddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const getAddrData = (addr1, addr2, lat, lng, fullAddress) => {
    setFullAddress(fullAddress);
    setLng(lng);
    setLat(lat);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res1 = await instance.get("/users/get");

        setUser(res1.data.data[0]);
        console.log("fetchUserData");
        const fetchedData = {
          name: res1.data.data[0].name,
          address: res1.data.data[0].address,
          phoneNumber: res1.data.data[0].phoneNumber,
        };
        setEditData(fetchedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();

    const getKids = async () => {
      const axiosGet = await instance.get("/kid/get");
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
      const response = await instance.patch("users/update", {
        name: editData.name,
        phoneNumber: editData.phoneNumber,
        address: fullAddress,
        userLat: lat,
        userLon: lng,
      });
      if (response.status === 200) {
        setEditData(response.data.data);
      } else {
        console.error();
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
      <Header label={"내정보"} />
      <MyContainer>
        <div>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력해주세요"
            />
          ) : (
            <span>{editData.name}</span>
          )}
        </div>
        <div>
          {isEditing ? (
            <>
              <MyButton onClick={handleEditClick}>저장</MyButton>
              <MyButton onClick={handleCancleClick}>취소</MyButton>
            </>
          ) : (
            <MyButton onClick={handleEditClick}>회원정보 수정</MyButton>
          )}
        </div>
      </MyContainer>
      <InfoList>
        <img alt={"icon-email"} src={IconEmail} />
        <span>{user ? user.email : "Loading..."}</span>
      </InfoList>
      <InfoList>
        <img alt={"icon-tel"} src={IconMypageTel} />
        {isEditing ? (
          <input
            type="text"
            name="phoneNumber"
            value={editData.phoneNumber}
            onChange={handleInputChange}
          />
        ) : (
          <span>{editData.phoneNumber}</span>
        )}
      </InfoList>
      <InfoList>
        <img alt={"icon-address"} src={IconMypageLocation} />
        {isEditing ? (
          <Post getAddrData={getAddrData} />
        ) : (
          <span>{editData.address}</span>
        )}
      </InfoList>
      <MyContainer>
        <div>
          <span>우리 아이 관리</span>
        </div>
        <div>
          <MyButton onClick={handleClick}>아이정보 관리</MyButton>
        </div>
      </MyContainer>
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
      <NavigationBar />
    </Container>
  );
}

export default MyPage;
