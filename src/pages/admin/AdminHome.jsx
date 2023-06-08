import React, { useState, Suspense } from "react";
import styled from "styled-components";
import { fetchList } from "../../server/Fetcher";
fetchList();
// 필요할 때마다 동적 로딩을 위한 react.lazy 함수 사용 코드
// 각 컴포넌트를 로딩하기 위한 코드
// 아래 Suspense 는 지연 시 보여주는 화면 설정
const HospitalClient = React.lazy(() =>
  import("./HospitalClient").then((module) => ({
    default: module.HospitalClient,
  }))
);
const HospitalRegister = React.lazy(() =>
  import("./HospitalRegister").then((module) => ({
    default: module.HospitalRegister,
  }))
);
const PersonalClient = React.lazy(() =>
  import("./PersonalClient").then((module) => ({
    default: module.PersonalClient,
  }))
);
const menuTab = [
  "개인 클라이언트 관리",
  "병원 클라이언트 관리",
  "병원 등록 관리",
];

export const AdminHome = () => {
  const [content, setContent] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");

  // Menu 탭 클릭 시 switch 문을 통해서 정의 해둔 각 컴포넌트를 로딩
  const handleMenuClick = (menu) => {
    switch (menu) {
      case "개인 클라이언트 관리":
        setContent(<PersonalClient />);
        setSelectedMenu("개인 클라이언트 관리");
        break;
      case "병원 클라이언트 관리":
        setContent(<HospitalClient />);
        setSelectedMenu("병원 클라이언트 관리");
        break;
      case "병원 등록 관리":
        setContent(<HospitalRegister />);
        setSelectedMenu("병원 등록 관리");
        break;
      //아무것도 클릭 하지 않았다면 AdminHome
      default:
        setContent(null);
        setSelectedMenu(null);
    }
  };

  return (
    <>
      <AdminBox>
        <AdminMenuBox>
          {menuTab.map((menuValue) => {
            return (
              <AdminMenu
                key={menuValue}
                onClick={() => handleMenuClick(menuValue)}
                selected={selectedMenu === menuValue}
              >
                {menuValue}
              </AdminMenu>
            );
          })}
        </AdminMenuBox>
        <AdminContentBox>
          <Suspense fallback={<div>Loading...</div>}>{content}</Suspense>
        </AdminContentBox>
      </AdminBox>
    </>
  );
};

const AdminBox = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
`;

const AdminMenuBox = styled.div`
  padding-top: 14%;
  width: 30%;
  height: 100%;
  background-color: #33bd7d;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AdminMenu = styled.div`
  width: 100%;
  height: 20%;
  font-weight: bold;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#FFFFFF" : "transparent")};
`;
const AdminContentBox = styled.div`
  width: 70%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;
