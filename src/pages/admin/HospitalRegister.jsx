import React from "react";

import { PersonalTitle, Table, TableHeader } from "./PersonalClient";

export const HospitalRegister = () => {
  return (
    <>
      <PersonalTitle>병원 등록 관리</PersonalTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>선택</TableHeader>
            <TableHeader>가입날짜</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>아이디</TableHeader>
            <TableHeader>연락처</TableHeader>
            <TableHeader>삭제</TableHeader>
          </tr>
        </thead>
      </Table>
    </>
  );
};
