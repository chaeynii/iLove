import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import { fetchList } from "../../server/Fetcher";
import { Button } from "../../components/Button";

export const PersonalClient = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const maxPostPage = 10;
  const queryClient = useQueryClient();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpcnN0QHRlc3QuZ29vZCIsInN1YiI6IjY0NzdlOTk2YTkwZTQwOWYxYTQ4NzIyMSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODU1ODA0MTQsImV4cCI6MTcxNzEzODAxNH0.cWYJrF8kSJrmC4csSlR2x5B4v_ASZhinvKl5NFoShGc";
  const { isLoading, data: list } = useQuery("list", () => fetchList(token));

  const [checkValue, setCheckValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const onChange = (e) => {
    setCheckValue(e.target.value);
    setSubmitted(false);
    console.log(checkValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  /* 아직삭제가 안됩니다*/
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList((prev) => prev.filter((el) => el !== id));
    }
  };
  useEffect(() => {
    if (currentPage <= maxPostPage - 2) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () => fetchList(nextPage));
    }
  }, [currentPage, queryClient]);

  if (isLoading) {
    return <h1>로딩중입니다..</h1>;
  }

  const filteredList = list?.filter(
    (item) => !submitted || item.email === checkValue
  );

  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  const paginatedList = filteredList.slice(startIndex, endIndex);

  return (
    <>
      <PersonalTitle>개인 클라이언트 관리</PersonalTitle>
      <SearchBox>
        <form onSubmit={onSubmit}>
          <InputContent type="text" value={checkValue} onChange={onChange} />
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
            <tr key={item._id.$oid}>
              <TableData>
                <Checkbox
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, item._id.$oid)
                  }
                  checked={checkList.includes(item._id.$oid)}
                />
              </TableData>
              <TableData>{item.createdAt.$date.slice(0, 10)}</TableData>
              <TableData>{item.name}</TableData>
              <TableData>{item.email}</TableData>
              <TableData>{item.phoneNumber}</TableData>
              <TableData>
                <Button width={"100px"} height={"50px"} label={"삭제"} />
              </TableData>
            </tr>
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
          disabled={currentPage >= maxPostPage - 1}
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
  border-radius: 5px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 15px;
`;

const ButtonBox = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
`;
