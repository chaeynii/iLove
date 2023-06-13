import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useQuery } from "react-query";

// 아이콘
import star from "../../assets/star.svg";
import locationWhite from "../../assets/iconLocationWhite.svg";
import locationGreen from "../../assets/iconLocationGreen.svg";
import arrowButtonRight from "../../assets/arrowbutton.png";
import arrowButtonLeft from "../../assets/arrowbutton.png";
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

// 공통 컴포넌트 수정활용 *즐겨찾기,뒤로가기 클릭 이벤트 추가해야함
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
        <HeaderStar>
          <img alt="star" src={star}></img>
        </HeaderStar>
      </HeaderWrap>
    </>
  );
};

// 백엔드 주소
const BEdata = "http://34.64.69.226:5000/api";

const Detail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hospitalID = searchParams.get("id") 
  // const token = localStorage.getItem("token") ? localStorage.getItem("token") : false;

  // const hospitalID = "A1100401"; // 임시 하드코딩 아이디
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vb250ZXN0QHRlc3QudGVzdCIsInN1YiI6MywiaWF0IjoxNjg2MjM2NTQzLCJleHAiOjE3MTc3OTQxNDN9.ToJBCRSygcxpdmMC-B0DyayfbdR7f6E4FEYhhEu5RhA"
  // 임시 하드코딩 토큰

  const [hospitalData, setHospitalData] = useState({});
  const [hospitalImg, setHospitalImg] = useState("");
  const [hospitalReviews, setHospitalReviews] = useState([]);
  const [hospitalReviewState, setHospitalReviewState] = useState({});
  const [userReviews, setUserReviews] = useState([]);

  // 병원,이미지,리뷰 정보
  useEffect(() => {
    fetch(`${BEdata}/hospital/${hospitalID}`, {
      headers: {
        Accept: "application / json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((hospitalID) => {
        setHospitalData(hospitalID.data);
      });

    fetch(`${BEdata}/image/hospital/${hospitalID}`)
      .then((res) => res.json())
      .then((hospitalD) => {
        setHospitalImg(hospitalD.data);
      });

    fetch(`${BEdata}/reviews/${hospitalID}`)
      .then((res) => res.json())
      .then((reviewData) => {
        setHospitalReviews(reviewData.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${BEdata}/reviews/${hospitalID}`)
      .then((res) => res.json())
      .then((reviewData) => {
        setHospitalReviews(reviewData.data);
      });
  }, [hospitalReviewState]);

  // 병원리뷰
  function reviewClick(label) {
    if (token) {
      const data = { vote: label };
      fetch(`${BEdata}/reviews/${hospitalID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((reviewData) => {
          setHospitalReviewState(reviewData.data);
          if (reviewData.data.length == 1) {
            fetch(`${BEdata}/reviews/user/${hospitalID}`, {
              headers: {
                Authorization: token,
              },
              method: "GET",
            })
              .then((res) => res.json())
              .then((reviewcheck) => {
                setUserReviews(reviewcheck.data[0].vote);
              });
          }
        })
        .catch((err) => {
          alert("잘못된 유저정보입니다");
        });
    } else {
      alert("로그인이 필요합니다");
    }
  }

  return (
    <>
      <Container>
        <HeaderContainer>
          <NewHeader label={hospitalData.dutyName} />
        </HeaderContainer>
        <SlideContainer>
          <SlideImg>
            {" "}
            {hospitalImg.imageUrl ? (
              <img src={hospitalImg.imageUrl} alt="" />
            ) : (
              <img src={NoImage} alt="No Image" />
            )}
          </SlideImg>
          <ArrowRigth>
            <img src={arrowButtonRight} alt="" />
          </ArrowRigth>
          <ArrowLeft>
            <img src={arrowButtonLeft} alt="" />
          </ArrowLeft>
        </SlideContainer>
        <TopContentContainer>
          <div>{hospitalData.dutyName}</div>
          <Button
            width={"73px"}
            height={"39px"}
            bgcolor={colors.primary}
            label={
              <div>
                <img src={locationWhite} alt="" />
                <span>지도</span>
              </div>
            }
            borderOutLine={"#ffffff"}
            btnColor={"white"}
            btnFontSize={"16px"}
            linkTo={`/detail/map?id=${hospitalID}`}
          ></Button>
          <UnderLine />
        </TopContentContainer>
        <QueryMapBtn Link={`detail/map?id=${hospitalID}`}>
          <div>
            <img src={locationWhite} alt="" />
            <span>지도</span>
          </div>
        </QueryMapBtn>
        <BottomContentContainer>
          <HpInfo>
            <img src={locationGreen} alt="" />
            <span>{hospitalData.dutyAddr}</span>
          </HpInfo>
          <HpInfo>
            <img src={phoneGreen} alt="" />
            <span>{hospitalData.dutyTel1}</span>
          </HpInfo>
          <HpInfo>
            <img src={clockGreen} alt="" />
            <HpInfoGrid>
              {hospitalData.dutyTime1c && hospitalData.dutyTime1s && (
                <HpInfoCard>
                  월 {hospitalData.dutyTime1s}-{hospitalData.dutyTime1c}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime2c && hospitalData.dutyTime2s && (
                <HpInfoCard>
                  화 {hospitalData.dutyTime2s}-{hospitalData.dutyTime2c}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime3c && hospitalData.dutyTime3s && (
                <HpInfoCard>
                  수 {hospitalData.dutyTime3s}-{hospitalData.dutyTime3c}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime4c && hospitalData.dutyTime4s && (
                <HpInfoCard>
                  목 {hospitalData.dutyTime4s}-{hospitalData.dutyTime4c}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime5c && hospitalData.dutyTime5s && (
                <HpInfoCard>
                  금 {hospitalData.dutyTime5s}-{hospitalData.dutyTime5c}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime6c && hospitalData.dutyTime6s && (
                <HpInfoCard>
                  토 {hospitalData.dutyTime6s}-{hospitalData.dutyTime6c}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime7c && hospitalData.dutyTime7s && (
                <HpInfoCard>
                  일 {hospitalData.dutyTime7s}-{hospitalData.dutyTime7c}
                </HpInfoCard>
              )}
            </HpInfoGrid>
          </HpInfo>
          <HpInfo>
            <img src={tagGreen} alt="" />
            {hospitalData.dutyEtc ? (
              <HpInfoCard>{hospitalData.dutyEtc}</HpInfoCard>
            ) : (
              <HpInfoCard>태그가 없습니다</HpInfoCard>
            )}
          </HpInfo>
          <HpInfo>
            <img src={smileGreen} alt="" />
            <h1>이런 점이 좋았어요</h1>
          </HpInfo>
          <ReviewContainer>
            <ReviewButton onClick={() => reviewClick(1)}>
              친절한 의사 선생님
              {hospitalReviews && (
                <span>{JSON.stringify(hospitalReviews[0])}</span>
              )}
            </ReviewButton>
            <ReviewButton onClick={() => reviewClick(2)}>
              전문적인 치료
              {hospitalReviews && (
                <span>{JSON.stringify(hospitalReviews[1])}</span>
              )}
            </ReviewButton>
            <ReviewButton onClick={() => reviewClick(3)}>
              상냥한 간호사·직원
              {hospitalReviews && (
                <span>{JSON.stringify(hospitalReviews[2])}</span>
              )}
            </ReviewButton>
            <ReviewButton onClick={() => reviewClick(4)}>
              편리한 접수·예약
              {hospitalReviews && (
                <span>{JSON.stringify(hospitalReviews[3])}</span>
              )}
            </ReviewButton>
            <ReviewButton onClick={() => reviewClick(5)}>
              깨끗한 시설
              {hospitalReviews && (
                <span>{JSON.stringify(hospitalReviews[4])}</span>
              )}
            </ReviewButton>
            <ReviewButton onClick={() => reviewClick(6)}>
              편한 교통·주차
              {hospitalReviews && (
                <span>{JSON.stringify(hospitalReviews[5])}</span>
              )}
            </ReviewButton>
          </ReviewContainer>
          <ReserveContainer>
            <Button
              width={"237px"}
              height={"69px"}
              bgcolor={colors.primary}
              label={"예약하기"}
              borderOutLine={"#ffffff"}
              btnColor={"white"}
              btnFontSize={"30px"}
              linkTo={`/detail/reserve?id=${hospitalID}`}
            />
          </ReserveContainer>
        </BottomContentContainer>
        <NavigationBar></NavigationBar>
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
  margin-right: 10px;
  @media screen and (max-width: 600px) {
    width: 21px;
    height: 21px;
  }
`;
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
    @media screen and (max-width: 600px) {
      font-size: 17px;
    }
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
  }
`;

const ArrowRigth = styled.div`
  display: none;
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
  display: none;
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
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
  a {
    position: absolute;
    right: 41px;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  button {
    border: 1px solid #00a758;
    border-radius: 7px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

const UnderLine = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100px;
  border-bottom: 2px solid ${colors.primary};
`;

const QueryMapBtn = styled.button`
  display: none;
  margin-top: 20px;
  width: 90%;
  height: 39px;
  background-color: ${colors.primary};
  color: white;
  font-size: 16px;
  border: 1px solid #00a758;
  border-radius: 7px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 800px) {
    display: inline-block;
  }
`;

const BottomContentContainer = styled.div`
  flex-direction: column;
  text-align: left;
  padding-left: 71px;
  padding-right: 71px;
  @media screen and (max-width: 600px) {
    padding-left: 30px;
    padding-right: 30px;
  }
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
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const HpInfoCard = styled.span`
  font-weight: 400;
  font-size: 16px;
  padding: 7px 15px 7px 15px;
  border: solid 1px #bebebe;
  border-radius: 17.5px;
  @media screen and (max-width: 640px) {
    font-size: 13px;
  }
`;

const HpInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;

const ReviewContainer = styled.div`
  padding: 0 45px 0 45px;
  margin-top: 19px;
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }
`;

const ReviewButton = styled.button`
  cursor: pointer;
  background: #f4f4f4;
  border: 1px solid #00ad5c;
  border-radius: 11px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: space-around;
  font-weight: 600;
  font-size: 14px;
  position: relative;
  text-align: start;
  span {
    color: #00ad5c;
    position: absolute;
    right: 10px;
  }
  @media screen and (max-width: 700px) {
    padding: 7px;
    font-size: 12px;
  }
`;

const ReserveContainer = styled.div`
  margin: 60px 0 41px 0;
  display: flex;
  width: 100%;
  justify-content: center;
  button {
    border: 1px solid #00a758;
    border-radius: 11px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

export default Detail;
