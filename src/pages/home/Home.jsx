import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import Select from "react-select";

import { instance } from "../../server/Fetcher";

// 알림창 라이브러리
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// 이미지 링크
import mainLogo from "../../assets/mainLogo.svg";
import mainLogoSeb from "../../assets/mainLogoSeb.svg";
import MainBanner from "../../assets/mainBanner.png";
import iconPeople from "../../assets/iconPeople.svg";
import arrowRight from "../../assets/arrowRight.svg";
import pinwheel from "../../assets/Pinwheel.gif";
import Loding from "../../assets/ImgLoding.jpg";
import newLogo from "../../assets/newLogo.jpg";

// 공통 컴포넌트 연결 링크
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "../../components/index";

// 검색창
import { SearchInput } from "./SearchInput";
// 유튜브
import { AutoplayYouTubeVideo } from "./Youtube";
// 알림
import { AlarmHome } from "./AlarmHome";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

// react-slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Home = () => {
  const token = localStorage.getItem("token");
  let showTab;
  let hideTab;
  if (token) {
    showTab = "none";
    hideTab = "";
  } else {
    showTab = "";
    hideTab = "none";
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    // 토큰 가져오기

    const role = localStorage.getItem("role");

    if ((token, role)) {
      // 토큰이 존재하므로 삭제 진행
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast("로그아웃 성공");
    } else {
      // 오류 알림표시
      toast("오류로 인해 로그아웃하지 못했습니다.");
    }

    navigate("/");
  };

  // 키워드 검색어
  // const [searchKeyword, setSearchKeyword] = useState("");

  //키워드 검색 후 필터링 된 병원 리스트
  // const [keywordFilteredHospitals, setKeywordFilteredHospitals] = useState([]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  // 사용자의 현재 위치  담기
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);

  // 유저 내정보에 있는 주소 값 가져오기
  useEffect(() => {
    const userAddress = async () => {
      try {
        const response = await instance.get("users/get");
        setLatitude(response.data.data[0].userLat);
        setLongitude(response.data.data[0].userLon);
        setAddress(response.data.data[0].address);
      } catch (error) {
        console.error("유저정보 실패: ", error);
      }
    };

    userAddress();
  }, []);

  const [distance, setDistance] = useState(10);

  const handleDistanceChange = (selectedDistance) => {
    setDistance(selectedDistance);
  };

  // 검색창
  // 키워드 검색어
  const [searchKeyword, setSearchKeyword] = useState("");

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  // 폼 전송 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 고정값 김포 경도위도
  const defaultLatitude = 37.64245641626587;
  const defaultLongitude = 126.64398423537274;
  // 고정값 광명 경도위도
  // const defaultLatitude = 37.472215621869594;
  // const defaultLongitude = 126.8751105269487;

  return (
    <>
      <Container>
        <ToastContainer
          position="top-center"
          limit={1}
          closeButton={false}
          autoClose={4000}
          hideProgressBar
        />
        {/* <MainLogoImg src={mainLogo} alt="mainLogo"></MainLogoImg> */}

        <TopMenuBar>
          <MenuLogo>
            <NewLogoImg src={newLogo} alt="아이사랑"></NewLogoImg>
          </MenuLogo>
          <FlexGrow></FlexGrow>

          <MenuSeb>
            <Link to="/login">
              <SebP style={{ display: showTab }}>로그인</SebP>
            </Link>
          </MenuSeb>

          <MenuSeb>
            <LogoutBut style={{ display: hideTab }} onClick={handleLogout}>
              로그아웃
            </LogoutBut>
          </MenuSeb>

          <MenuSeb>
            <Link to="SignUp">
              <SebP style={{ display: showTab }}>회원가입</SebP>
            </Link>
          </MenuSeb>

          <MenuSeb style={{ display: hideTab }}>
            <AlarmHome />
          </MenuSeb>
        </TopMenuBar>

        <SearchInput
          onSearch={handleSearch}
          value={search}
          onChange={onChange}
          onSubmit={handleSubmit}
          linkTo={`/search?query=${encodeURIComponent(search)}`}
        />

        <Banner>
          <Img src={MainBanner} alt="star"></Img>
        </Banner>

        <SiliderMargin>
          <MainSub>
            {address ? (
              <H2>{address}</H2>
            ) : (
              <H2Seb>
                내정보에서 주소를 등록해주세요
                <br /> 위치 : 김포 마산동
              </H2Seb>
            )}
            <H1>내 주변 소아과</H1>
            <DistanceDiv>
              <Distance
                distance={distance}
                setDistance={setDistance}
                onChange={handleDistanceChange}
              />
            </DistanceDiv>
          </MainSub>

          <SimpleSlider
            latitude={latitude || defaultLatitude}
            longitude={longitude || defaultLongitude}
            distance={distance}
          />
        </SiliderMargin>

        <AutoplayYouTubeVideo videoId={"efzr12y8vUc"} />

        <BannerSeb>
          <Link to="/SignUp?tab=hospital">
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

        <Footer />
        <NavigationBar />
      </Container>
    </>
  );
};
export default Home;

// 거리 설정
const options = [
  { value: 1, label: 1 },
  { value: 3, label: 3 },
  { value: 5, label: 5 },
  { value: 8, label: 8 },
  { value: 10, label: 10 },
];

const Distance = ({ distance, setDistance }) => {
  const updatedOptions = options.map((option) => ({
    ...option,
    label: `${option.value} km`,
  }));

  const handleDistanceChange = (selectedOption) => {
    setDistance(selectedOption.value);
  };

  return (
    <Select
      options={updatedOptions}
      styles={customStyles}
      value={{ value: distance, label: `${distance} km` }}
      onChange={handleDistanceChange}
    />
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
  }),
};

const H1 = styled.p`
  font-size: 30px;
  font-weight: 900;
  color: #121212;
  padding: 1%;
  margin-bottom: 3%;
  width: 33.33%;
`;

const H2 = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #121212;
  padding: 1%;
  margin-bottom: 3%;
  width: 33.33%;
`;

const H2Seb = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #b2b2b2;
  padding: 1%;
  margin-bottom: 3%;
  width: 33.33%;
`;

const DistanceDiv = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #121212;
  padding: 1%;
  margin-bottom: 3%;
  width: 33.33%;
`;

const MainSub = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SiliderMargin = styled.div`
  margin: 5% 0 8% 0;
`;

const MainLogoImg = styled.img`
  margin-top: 4%;
  margin-top: 4%;
  width: 30%;
`;

const NewLogoImg = styled.img`
  width: 100%;
`;

const TopMenuBar = styled.div`
  margin-top: 5%;
  width: 100%;
  // border-bottom: solid 2px ${colors.primary};
  display: flex;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const MenuLogo = styled.div`
  padding: 2% 0% 1% 3%;
  width: 20%;
`;

const MenuSeb = styled.div`
  padding: 2% 2% 1% 0%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SebP = styled.p``;

const LogoutBut = styled.p``;

const Banner = styled.div`
  position: relative;
  width: 100%;
  border-radius: 20px;
  margin: 4% 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BannerSeb = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 5%;
`;

const BanContainer = styled.div`
  display: flex;
  border: 1px solid #dbecdf;
  // background: #eaf9ed;
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
const SimpleSlider = ({ latitude, longitude, distance }) => {
  const settings = {
    dots: true,
    infinite: false,
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
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
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

  // 병원 데이터 get
  const [hospitalData, setHospitalData] = useState([]);
  // 로딩 화면
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 위도와 경도를 이용하여 병원 데이터를 가져오는 기능
    const hospitalApi = async () => {
      try {
        const response = await axios.get("/hospital/near", {
          params: {
            userLat: latitude,
            userLon: longitude,
            r: distance,
          },
        });
        const responseData = response.data.data;
        setHospitalData(responseData);
        console.log(latitude, longitude, distance);
        console.log("병원 정보 수", hospitalData);
        setLoading(false);
      } catch (error) {
        console.error(
          "병원 데이터를 가져오는 중에 오류가 발생했습니다.:",
          error
        );
      }
    };

    //위도와 경도에 유효한 값이 있는 경우에만 API를 호출합니다.
    if (latitude !== null && longitude !== null) {
      hospitalApi();
    }
  }, [latitude, longitude, distance]);

  return (
    <>
      {loading ? (
        <img src={pinwheel} alt="Loading..." />
      ) : (
        <Slider {...settings}>
          {hospitalData.length > 0 ? (
            hospitalData.map((data) => (
              <Card key={data.id}>
                <Link to={`/detail?id=${data.id}`}>
                  <CardTop>
                    {data.image.length > 0 ? (
                      <CardImg
                        key={data.id}
                        src={data.image}
                        alt={data.image}
                      />
                    ) : (
                      <>
                        <CardTitle>{data.dutyName}</CardTitle>
                        <CardImg key={data.id} src={Loding} alt={data.image} />
                      </>
                    )}
                  </CardTop>
                </Link>
              </Card>
            ))
          ) : (
            <Guide>{distance} km내에 병원이 없습니다</Guide>
          )}
        </Slider>
      )}
    </>
  );
};

// console.log("병원 정보 수", hospitalData);

const Card = styled.div`
  position: relative;
`;

const CardTop = styled.div`
  margin: 0 2% 0 2%;
  transition: opacity 0.3s ease;

  &:hover {
    &::after {
      width: 97%;
      height: 99%;
      background: rgba(0, 0, 0, 0.5);
      content: "";
      position: absolute;
      border-radius: 20px;
      top: 0;
      left: 5px;
      z-index: 1;
    }
  }
`;

const CardBottom = styled.div`
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  color: #fff;
`;

const CardTitle = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8%;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 80%;
  transition: opacity 0.3s ease;

  ${CardTop}:hover & {
    color: white;
    z-index: 2;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const Guide = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin: 10% 0 10% 0;
  color: #b2b2b2;
  // text-align: center;
`;
