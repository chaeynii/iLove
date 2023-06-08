/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// 이미지 링크
import mainLogo from "../../assets/mainLogo.svg";
import MainBanner from "../../assets/mainBanner.png";
import iconPeople from "../../assets/iconPeople.svg";
import arrowRight from "../../assets/arrowRight.svg";

// 공통 컴포넌트 연결 링크
import { NavigationBar } from "../../components/NavigationBar";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { SearchBar } from "../../components/SearchBar";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

// react-slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 더미 데이터
import { dataHome } from "./data";

export const Home = ({ linkTo }) => {
  return (
    <>
      <Container>
        <MainLogoImg src={mainLogo} alt="mainLogo"></MainLogoImg>

        <TopMenuBar>
          <MenuLogo>
            <LogoP>아이사랑</LogoP>
          </MenuLogo>
          <FlexGrow></FlexGrow>

          <MenuSeb>
            <Link to={linkTo}>
              <SebP>로그인</SebP>
            </Link>
          </MenuSeb>

          <MenuSeb>
            <Link to={linkTo}>
              <SebP>회원가입</SebP>
            </Link>
          </MenuSeb>
        </TopMenuBar>

        <SearchBar />

        <Banner>
          <Img src={MainBanner} alt="star"></Img>
        </Banner>

        <BannerSeb>
          <Link to={linkTo}>
            <BanContainer>
              <BannerSebDiv1>
                <BannerSebIcon
                  src={iconPeople}
                  alt="iconPeople"
                ></BannerSebIcon>
              </BannerSebDiv1>

              <BannerSebDiv2>
                <BannerSebP>병원 관리자 등록</BannerSebP>
                <BannerSebH1>가족이 되어줄 병원을 찾습니다</BannerSebH1>
              </BannerSebDiv2>

              <BannerSebDiv3>
                <BannerSebIcon
                  src={arrowRight}
                  alt="arrowRight"
                ></BannerSebIcon>
              </BannerSebDiv3>
            </BanContainer>
          </Link>
        </BannerSeb>

        <SiliderMargin>
          <SimpleSlider />
        </SiliderMargin>
        <Footer />
        <NavigationBar />
      </Container>
    </>
  );
};
export default Home;

const SiliderMargin = styled.div`
  margin: 5% 0 8% 0;
`;

const MainLogoImg = styled.img`
  margin-top: 4%;
`;

const TopMenuBar = styled.div`
  width: 100%;
  //   background-color: bisque;
  border-bottom: solid 1px ${colors.InputBorderOut};
  display: flex;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const MenuLogo = styled.div`
  padding: 2% 0% 1% 3%;
`;

const MenuSeb = styled.div`
  padding: 2% 3% 1% 0%;
`;

const SebP = styled.p``;

const LogoP = styled.p`
  color: ${colors.primary};
  font-weight: 700;
  font-size: ${fontSize.h3};
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  border-radius: 20px;
  margin: 4% 0;
  padding: 0 2.5%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BannerSeb = styled.div`
  position: relative;
  width: 100%;
  padding: 2%;
`;

const BanContainer = styled.div`
  display: flex;
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  padding: 3%;
`;

const BannerSebDiv1 = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BannerSebDiv2 = styled.div`
  flex-grow: 5;
  padding: 0 0 0 3%;
  text-align: left;
`;
const BannerSebDiv3 = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerSebIcon = styled.img``;

const BannerSebP = styled.p`
  color: #707070;
  padding: 1%;
  font-size: 18px;
`;
const BannerSebH1 = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #383838;
  padding: 1%;
`;

// 캐러셀 라이브러리
const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {dataHome.map((item) => (
          <Card>
            <CardTop>
              <CardImg src={item.linkImg} alt={item.linkImg}></CardImg>
            </CardTop>
            <CardBottom>
              <CardTitle>{item.hospitalName}</CardTitle>
              <CardAddress>{item.address}</CardAddress>
            </CardBottom>
          </Card>
        ))}
      </Slider>
    </>
  );
};

const Card = styled.div`
  position: relative;
`;

const CardTop = styled.div`
  margin: 0 2% 0 2%;
`;
const CardBottom = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: #ffffff;
`;

const CardTitle = styled.p`
  font-size: 28px;
  font-weight: 700;
`;

const CardAddress = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const CardImg = styled.img`
  width: 100%;
  hieght: 100%;
  object-fit: cover;
  border-radius: 20px;
`;
