import React from "react";
import styled from "styled-components";
import { Post } from "./Post";

export const RegisterForm = () => {
  return (
    <>
      <FormBox>
        <InputBox>
          <InputName>병원명</InputName>
          <InputContent type="text" />
        </InputBox>
        <InputBox>
          <InputName>병원 대표번호</InputName>
          <InputContent />
        </InputBox>
        <InputBox>
          <InputName>영업시간</InputName>
          <InputContent />
        </InputBox>
        <InputBox>
          <InputName>점심시간</InputName>
          <InputContent />
        </InputBox>
        <Post />
        <InputBox>
          <InputName>병원 사진</InputName>
          <ImageBox>
            <InputImage type="file" />
          </ImageBox>
        </InputBox>
      </FormBox>
    </>
  );
};

const FormBox = styled.div`
  box-sizing: border-box;
  width: 625px;
  height: 998px;
  border: 1px solid #a8a8a8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const InputBox = styled.div`
  box-sizing: border-box;
  width: 455px;
  height: 90px;
`;

export const InputName = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  justify-content: flex-start;
  color: #121212;
`;

export const InputContent = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: 1px solid #a8a8a8;
  border-radius: 5px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 15px;
`;

const ImageBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  border: 1px solid #a8a8a8;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;

const InputImage = styled.input`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 15px;
`;
