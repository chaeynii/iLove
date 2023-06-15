/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import colors from "../../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { instance } from "../../../server/Fetcher";

// const token = localStorage.getItem("token")
//   ? localStorage.getItem("token")
//   : false;
// 빈공간
const Space = styled.div`
  margin-bottom: 20px;
`;
// 빈공간
const Space2 = styled.div`
  margin-bottom: 5px;
`;
// 아이 이름 입력을 위한 inputbox
const InputBox = styled.input`
  width: 280px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 24px;
  padding: 2%;
`;
// 아이 생년월일 입력을 위한 inputbox
const Input2Box = styled.input`
  width: 75px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 11px;
  padding: 2%;
`;
// ChildBox의 저장버튼 구현
const SaveButton = styled.button`
  position: absolute;
  bottom: 10px;
  font-size: 30px;
  font-weight: 900;
  color: white;
  border: 1px solid ${colors.BtnborderOut};
  border-radius: 5px;
  background-color: ${colors.primary};
  cursor: pointer;
  padding: 0% 2.5%;
`;
// 아이 성별 선택을 위한 버튼
const GenderButton = styled.button`
  position: absolute;
  top: 15px;
  width: 30px;
  border: 1px solid ${colors.BtnborderOut};
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "green" : "grey")};
  cursor: pointer;
  padding: 5px;
`;
//GenderButton에 성별 이미지를 넣기위해 만듬
const GenderImage = styled.img`
  width: 17px;
  height: 27px;
`;
// GenderButton중 남성
const MaleButton = styled(GenderButton)`
  right: 50px;
`;
//GenderButton중 여성
const FemaleButton = styled(GenderButton)`
  right: 10px;
`;

export const ChildBox = ({
  id,
  gender,
  birth,
  name,
  memo,
  image,
  onRemove,
  linkTo,
  defaultEditable,
  alwaysShowEditAndRemove,
}) => {
  const [imageUrl, setImageUrl] = useState(image?.imageUrl); // 기존 이미지
  const [selectedImageFile, setSelectedImageFile] = useState(null); // 선택한 이미지 null(기존 유지) false (삭제) file (삭제 후 업로드)
  const [kidName, setKidName] = useState(name);
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [isEditable, setIsEditable] = useState(defaultEditable);

  useEffect(() => {
    setIsEditable(defaultEditable);
    if (birth === undefined || null) {
    } else if (birth) {
      const modifyBirth = birth.split("-");
      setBirthYear(modifyBirth[0]);
      setBirthMonth(modifyBirth[1]);
      setBirthDay(modifyBirth[2]);
    }
  }, [defaultEditable]);

  //사용자가 선택한 이미지 파일에 대한 참조(URL)를 imageUrl 상태에 저장
  const handleImagePlus = (e) => {
    const file = e.target.files[0]; // 첫 번째 파일을 선택합니다.
    setSelectedImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file); // 첫 번째 파일을 readAsDataURL에 전달합니다.
  };

  //사용자가 이름을 입력하면 그 값을 상태에 저장하는 역할
  //이는 사용자의 입력을 실시간으로 'kidname' 상태에 반영하기 위한 것
  const handleKidNameChange = (e) => {
    setKidName(e.target.value);
  };

  //사용자가 '생년'을 입력하면 그 값을 상태에 저장하는 역할
  const handleBirthYearChange = (e) => {
    setBirthYear(e.target.value);
  };

  //사용자가 '월'을 입력하면 그 값을 상태에 저장하는 역할
  const handleBirthMonthChange = (e) => {
    setBirthMonth(e.target.value);
  };

  //사용자가 '일'을 입력하면 그 값을 상태에 저장하는 역할
  const handleBirthDayChange = (e) => {
    setBirthDay(e.target.value);
  };

  //이미지가 선택되었을 때 그 이미지를 제거하는 역할
  //이미지 참조(imageUrl)를 null로 설정함으로써 이미지를 제거
  const removeImage = () => {
    // 이미지가 선택되었는지 확인
    if (!imageUrl) {
      alert("삭제할 이미지가 선택되지 않았습니다.");
      return;
    }

    // 이미지 상태 업데이트 (백엔드에 요청하지 않고 이미지 상태만 변경)
    setImageUrl(null);
    setSelectedImageFile(false);
  };
  //버튼이 클릭되었을 때, 현재 입력 상태를 확정 편집을 불가능하게 만드는 역할
  //isEditable 상태를 false로 설정함으로써 이를 달성, 반대도 가능
  const handleButtonClick = async () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      return;
    }
    // 이름, 생년, 월, 일 모두 채워져 있는지 확인
    if (!kidName || !birthYear || !birthMonth || !birthDay) {
      alert("모든 칸을 채워주세요");
      return;
    }
    // 이름은 두 글자 이상이어야 함
    if (kidName.length < 2) {
      alert("이름은 최소 두 글자 이상이어야 합니다");
      return;
    }
    // 생년, 월, 일이 숫자로 입력되었는지 확인
    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
      alert("생년월일은 숫자로 입력해야 합니다");
      return;
    }
    // 생년은 네 자리, 월과 일은 두 자리여야 함
    if (
      birthYear.length !== 4 ||
      birthMonth.length !== 2 ||
      birthDay.length !== 2
    ) {
      alert("생년은 네 자리, 월과 일은 두 자리 숫자로 입력해야 합니다");
      return;
    }
    if (!selectedGender) {
      alert("성별을 선택해주세요");
      return;
    }

    // 내가 이미지를 건드리고, 기존 이미지가 있으면 삭제
    if (selectedImageFile !== null && image) {
      try {
        // 이미지 삭제 요청
        const response = await instance.delete(`image/${image.id}`);
        console.log(response); // check the response
      } catch (error) {
        console.error("Error removing image:", error);
      }
    }

    if (imageUrl) {
      const formData = new FormData();
      formData.append("files", selectedImageFile);
      formData.append("kidId", id);

      try {
        const response = await instance.post("image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data); // check the response
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const originalBirth = `${birthYear}-${birthMonth}-${birthDay}`;
    await instance.patch(`kid/${id}`, {
      name: kidName,
      birth: originalBirth,
      gender: selectedGender,
    });
  };

  //"삭제" 버튼이 클릭되었을 때 해당 항목을 삭제하는 역할 onRemove 함수를 호출하며,
  //이 onRemove 함수는 ChildBox 컴포넌트를 사용하는 부모 컴포넌트에서 제공,
  //onRemove 함수는 id를 인자로 받아 해당 항목을 실제로 삭제하는 로직을 수행
  const handleRemoveClick = () => {
    onRemove(id);
  };

  //이미지를 추가 안해도 그공간을 비워놓기위해 사용
  const Placeholder = styled.div`
    width: 100px;
    height: 100px;
    background-color: transparent;
    border: 1px solid #ddd;
  `;

  //저장 버튼을 누르면 remove image 버튼이 사라져도 그공간을 비워놓기 위해
  const ButtonPlaceholder = styled.button`
    visibility: hidden;
  `;

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  // 처음 성별 상태를 API에서 받아온 성별로 설정
  const [selectedGender, setSelectedGender] = useState(gender);

  const imageContainerStyle = {
    marginRight: isEditable ? "0px" : "50px",
    flex: 1,
  };

  const nameBirthContainerStyle = {
    marginLeft: isEditable ? "10px" : "50px",
    marginLeft: "10px",
    flex: 4,
  };

  const MaleImageAfterSave = styled.img`
    width: 21px;
    height: 22px;
    margin-left: 5px;
  `;

  const FemaleImageAfterSave = styled.img`
    width: 17px;
    height: 27px;
    margin-left: 5px;
  `;

  return (
    <ChildBoxStyle>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={imageContainerStyle}>
          {imageUrl ? (
            isEditable ? (
              <>
                <img src={imageUrl} alt="Selected" />
                <button onClick={removeImage}>Remove Image</button>
              </>
            ) : (
              <>
                <img src={imageUrl} alt="Selected" />
                <ButtonPlaceholder>Remove Image</ButtonPlaceholder>
              </>
            )
          ) : isEditable ? (
            <>
              <Placeholder />
              <input type="file" accept="image/*" onChange={handleImagePlus} />
            </>
          ) : (
            <Placeholder />
          )}
        </div>
        <div style={nameBirthContainerStyle}>
          <div>
            {isEditable ? (
              <>
                <label htmlFor="kidNameInput" style={{ fontWeight: "bold" }}>
                  이름
                </label>
                <InputBox
                  id="kidNameInput"
                  type="text"
                  value={kidName}
                  onChange={handleKidNameChange}
                  style={{ fontWeight: "bold" }}
                />
              </>
            ) : (
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  textAlign: "left",
                }}
              >
                {kidName}
                {selectedGender === "male" && (
                  <MaleImageAfterSave
                    src={`${process.env.PUBLIC_URL}/malegreen.png`}
                    alt="malegreen"
                  />
                )}
                {selectedGender === "female" && (
                  <FemaleImageAfterSave
                    src={`${process.env.PUBLIC_URL}/femalegreen.png`}
                    alt="femalegreen"
                  />
                )}
              </p>
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
                <label htmlFor="birthMonthInput" style={{ fontWeight: "bold" }}>
                  {" "}
                  월일{" "}
                </label>
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
              </>
            ) : (
              <>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    marginTop: "20px",
                  }}
                >
                  {birthYear}년 {birthMonth}월 {birthDay}일
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {(isEditable || alwaysShowEditAndRemove) && (
        <>
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "20%",
              padding: "2px 5px",
              lineHeight: "1",
              border: "none",
            }}
            onClick={handleRemoveClick}
          />
          <SaveButton
            style={{ alignSelf: "flex-end" }}
            onClick={handleButtonClick}
          >
            {isEditable ? "저장" : "수정"}
          </SaveButton>
        </>
      )}
      {isEditable && (
        <>
          <MaleButton
            selected={selectedGender === "male"}
            onClick={() => handleGenderClick("male")}
          >
            <GenderImage
              src={`${process.env.PUBLIC_URL}/male.png`}
              alt="male"
            />
          </MaleButton>
          <FemaleButton
            selected={selectedGender === "female"}
            onClick={() => handleGenderClick("female")}
          >
            <GenderImage
              src={`${process.env.PUBLIC_URL}/female.png`}
              alt="female"
            />
          </FemaleButton>
        </>
      )}
    </ChildBoxStyle>
  );
};

const ChildBoxStyle = styled.div`
  position: relative;
  width: 100%;
  height: 140px;
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
