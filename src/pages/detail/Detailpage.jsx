import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useQuery } from "react-query";

// 아이콘
import star from "../../assets/star.svg";
import locationWhite from "../../assets/iconLocationWhite.svg";
import locationGreen from "../../assets/iconLocationGreen.svg";
import arrowButtonRight from "../../assets/arrowbutton.png"
import arrowButtonLeft from "../../assets/arrowbutton.png"
import phoneGreen from "../../assets/phoneGreen.svg";
import clockGreen from "../../assets/clockGreen.svg";
import tagGreen from "../../assets/tagGreen.svg";
import smileGreen from "../../assets/smileGreen.svg";
import IconLeft from "../../assets/iconLeft.svg";
import NoImage from "../../assets/NoImage.jpg";

// 공통 컴포넌트
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "../../components/index";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

// 공통 컴포넌트 수정활용
const NewHeader = ({ label, onClick }) => {
  return (
    <>
      <HeaderWrap>
        <BtnBack onClick={onClick}>
          <img alt="icon-left" src={IconLeft}></img>
        </BtnBack>
        <div>
          <h2>{label}</h2>
        </div>
        <HeaderStar><img alt="star" src={star}></img></HeaderStar>
      </HeaderWrap>
    </>
  );
};



const Detail = () => {

// 병원정보


  return (
    <>
      <Container>
        <HeaderContainer>
          <NewHeader label={"병원이름더미데이터"}/>
        </HeaderContainer>
        <SlideContainer>
          <SlideImg><img src={NoImage} alt="" /></SlideImg>
          <ArrowRigth><img src={arrowButtonRight} alt="" /></ArrowRigth>
          <ArrowLeft><img src={arrowButtonLeft} alt="" /></ArrowLeft>
        </SlideContainer>
        <TopContentContainer>
          <div>병원이름더미데이터</div>
          <Button width={"73px"} height={"39px"} bgcolor={colors.primary} label={<div><img src={locationWhite} alt="" /><span>지도</span></div>} 
          borderOutLine={"#ffffff"} btnColor={"white"} btnFontSize={"16px"} LinkTo={"/map"}>
          </Button>
            <UnderLine />
        </TopContentContainer>
        <BottomContentContainer>
          <HpInfo>
            <img src={locationGreen} alt="" />
            <span>서울 특별시 임시 하드코딩 주소</span>
          </HpInfo>
          <HpInfo>
            <img src={phoneGreen} alt="" />
            <span>031-더미-0000</span>
          </HpInfo>
          <HpInfo>
            <img src={clockGreen} alt="" />
            <HpInfoCard>평일 09:00 ~ 18:00</HpInfoCard>
          </HpInfo>
          <HpInfo>
            <img src={tagGreen} alt="" />
            <HpInfoCard>영유아검진</HpInfoCard>
            <HpInfoCard>영유아검진</HpInfoCard>
          </HpInfo>
          <HpInfo>
            <img src={smileGreen} alt="" />
            <h1>이런 점이 좋았어요</h1>
          </HpInfo>
          <div>
            {/* 리뷰컨테이너 */}
          </div>
          <ReserveContainer>
            <Button width={"237px"} height={"69px"} bgcolor={colors.primary} label={"예약하기"} borderOutLine={"#ffffff"} btnColor={"white"} btnFontSize={"30px"} LinkTo={"/reserve"}/>
          </ReserveContainer>
        </BottomContentContainer>
      </Container>
    </>
  );
};


//스타일 - 헤더
const HeaderContainer = styled.div`
  width: 100%;
  height: 74px;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #b2b2b2;
`;

const HeaderStar = styled.div`
  display: flex;
  text-align: center;
  float: right;
  width: 29px;
  height: 28px;
`
const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  & h2 {
    font-size: 20px;
    color: #00ad5c;
    font-weight: 600;
  }
`;

const BtnBack = styled.button`
  background: none;
  border: none;
  float: left;
`;

//스타일 - 메인컨텐츠
const SlideContainer = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideImg = styled.div`
  width: 90%;
  img {
    width: 100%;
    height: 350px;
    border-radius: 20px;
    object-fit: cover;
  };
`;

const ArrowRigth = styled.div`
  position: absolute;
  right: 72px;
  transform: rotate(180deg);
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;

const ArrowLeft = styled.div`
  position: absolute;
  left: 72px;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;

const TopContentContainer = styled.div`
  position: relative;
  margin-top: 13px;
  width: 100%;
  height: 83px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 30px;
  a {
    position: absolute;
    right: 41px;
  }
`;

const UnderLine = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100px;
  border-bottom: 2px solid ${colors.primary};
`;

const BottomContentContainer = styled.div`
  flex-direction: column;
  text-align: left;
  padding-left: 71px;
`;

const HpInfo = styled.div`
  margin-top: 42px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  span {
    margin-left: 22px;
  }
  h1 {
    margin-left: 22px;
    color: ${colors.primary};
  }
`;

const HpInfoCard = styled.span`
  font-weight: 400;
  font-size: 16px;
  padding: 7px 15px 7px 15px;
  border: solid 1px #BEBEBE;
  border-radius: 17.5px;
`;

const ReserveContainer = styled.div`
  margin: 41px 0 41px 0;
  padding-right: 71px;
  display: flex;
  width: 100%;
  justify-content: center;
  button {
    border: 1px solid #00A758;
    border-radius: 11px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

export default Detail;