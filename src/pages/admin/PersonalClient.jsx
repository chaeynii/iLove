import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";

import { Button } from "../../components/Button";
import colors from "../../constants/colors";

import { deleteinstance, instance } from "../../server/Fetcher";

export const PersonalClient = () => {
  const [currentPage, setCurrentPage] = useState(0); // 페이지 숫자 상태
  const [maxPostPage, setMaxPostPage] = useState(currentPage + 1);

  const queryClient = useQueryClient();

  // 인스턴스 사용하는 함수
  const listQuery = useQuery("list", async () => {
    const response = await instance.get("/admin/get/generelclient"); // "/"는 baseURL에 추가된 경로입니다
    return response.data;
  });

  const list = listQuery.data;
  const [searchInput, setsearchInput] = useState(""); // 검색창 인풋
  const [submitted, setSubmitted] = useState(false); // 검색창 submit 상태
  const [checkList, setCheckList] = useState([]); // 체크박스
  const onChange = (e) => {
    setsearchInput(e.target.value);
    setSubmitted(false);
  };

  //검색창 폼 제출
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // 체크박스 확인하는 함수
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList((prev) => prev.filter((el) => el !== id));
    }
  };

  const handleDelete = async (item) => {
    // 페이지네이션 데이터의 id와 체크된 열의 id 값 필터

    console.log("삭제할 id:", item);
    await deleteinstance.delete(`admin/delete/${item.id}`); //React Query에서 'invalidateQueries' 기능 사용해서 업데이트 된 목록 다시
    queryClient.invalidateQueries("list");
  };

  //페이지네이션 로직
  useEffect(() => {
    if (currentPage <= maxPostPage - 1) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () => listQuery.data);
    }
  }, [currentPage, queryClient]);

  if (listQuery.isLoading) {
    return <h1>로딩중입니다..</h1>;
  }

  const filteredList = list.data?.filter(
    (item) => !submitted || item.email === searchInput
  );

  //페이지네이션 로직
  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  const paginatedList = filteredList.slice(startIndex, endIndex);

  return (
    <>
      <PersonalTitle>개인 클라이언트 관리</PersonalTitle>
      <SearchBox>
        <form onSubmit={onSubmit}>
          <InputContent type="text" value={searchInput} onChange={onChange} />
        </form>
      </SearchBox>
      <Table>
        <thead>
          <tr>
            <TableHeader>
              <Checkbox type="checkbox" />
            </TableHeader>
            <TableHeader>가입날짜</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>아이디</TableHeader>
            <TableHeader>연락처</TableHeader>
            <TableHeader>삭제</TableHeader>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map((item) => (
            <TableRow key={item.id}>
              <TableData>
                <Checkbox
                  onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                />
              </TableData>
              <TableData>{item.createdAt.slice(0, 10)}</TableData>
              <TableData>{item.name}</TableData>
              <TableData>{item.email}</TableData>
              <TableData>{item.phoneNumber}</TableData>
              <TableData>
                <Button
                  width={"80px"}
                  height={"30px"}
                  label={"삭제"}
                  bgcolor={colors.primary}
                  btnColor={"white"}
                  onClick={() => handleDelete(item)}
                />
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ButtonBox>
        <button
          disabled={currentPage <= 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          이전 페이지
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          다음 페이지
        </button>
      </ButtonBox>
    </>
  );
};

export const PersonalTitle = styled.p`
  padding-top: 6.5%;
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-size: 42px;
  line-height: 51px;
`;

export const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  width: 90%;
`;

export const TableHeader = styled.th`
  text-align: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  padding: 10px;
  border-bottom: 1px solid #929292;
  border-top: 3px solid #000000;
`;

const TableData = styled.td`
  text-align: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  padding: 10px;
  height: 5%;
  padding-top: 2%;
`;

const TableRow = styled.tr`
  height: 70px;
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 100%;
  cursor: pointer;
`;

const SearchBox = styled.div`
  border: 1px solid #b2b2b2;
  margin-top: 2%;
  padding: 1% 2.5%;
  box-sizing: border-box;
  border-radius: 28px;
  text-align: center;
`;

const InputContent = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  outline: none;
  border: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;

  button {
    background-color: #e5e5e5;
    border: none;
    padding: 12px 20px;
    margin-right: 10px;
    cursor: pointer;
    outline: none;
  }

  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
  }
`;
