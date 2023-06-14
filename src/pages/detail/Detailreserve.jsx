import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useQuery } from "react-query";

// 아이콘
import star from "../../assets/star.svg";
import yellowStar from "../../assets/yellowStar.svg";
import clockGreen from "../../assets/clockGreen.svg";
import IconLeft from "../../assets/iconLeft.svg";

// 공통 컴포넌트
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
  Modal,
} from "../../components/index";
import { formatTime } from "../../utils";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";
import { ModalContainer } from "../registerForm/Post";

// 백엔드 주소
const BEdata = "http://34.64.69.226:5000/api/";

const Reserve = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hospitalID = searchParams.get("id");
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;
  const navigate = useNavigate();

  // const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vb250ZXN0QHRlc3QudGVzdCIsInN1YiI6MywiaWF0IjoxNjg2MjM2NTQzLCJleHAiOjE3MTc3OTQxNDN9.ToJBCRSygcxpdmMC-B0DyayfbdR7f6E4FEYhhEu5RhA";
  // 임시 토큰

  const [hospitalData, setHospitalData] = useState({});
  const [reserveday, setReserveday] = useState({
    year: "",
    month: "",
    date: "",
    day: "",
    dayNum: 0,
  });
  const [reserveModal, setReserveModal] = useState(false);
  const [dayinput, setDayinput] = useState("");
  const [dutyTimes, setDutyTimes] = useState({});
  const [reserveTimeTable, setReserveTimeTable] = useState([]); // 근무시간 오픈~종료 배열
  const [clickedBtn, setClickedBtn] = useState(null);
  const [clickedBtnTime, setClickedBtnTime] = useState(null);
  const [reservedTime, setReservedTime] = useState([]);
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    fetch(`${BEdata}hospital/${hospitalID}`, {
      headers: {
        Accept: "application / json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((hospitalID) => {
        setHospitalData(hospitalID.data);
      });

    fetch(`${BEdata}reservation/hospital/${hospitalID}`, {
      headers: {
        Accept: "application / json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((hospitalReserve) => {
        setReservedTime(hospitalReserve.data);
      });

    if (token) {
      fetch(`${BEdata}favorite`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.forEach((like) => {
            if (like.hospitalId == hospitalID) {
              setLikeState(true);
            }
          });
        });
    }

    const today = new Date();
    let nowyear = today.getFullYear(); // 년도
    let nowmonth = today.getMonth() + 1; // 월
    let nowdate = today.getDate(); // 날짜
    let nowdayNum = today.getDay(); // 요일
    let transDay = function (nowdayNum) {
      if (nowdayNum === 0) {
        return "일";
      }
      if (nowdayNum === 1) {
        return "월";
      }
      if (nowdayNum === 2) {
        return "화";
      }
      if (nowdayNum === 3) {
        return "수";
      }
      if (nowdayNum === 4) {
        return "목";
      }
      if (nowdayNum === 5) {
        return "금";
      }
      if (nowdayNum === 6) {
        return "토";
      }
    };
    setReserveday({
      year: nowyear,
      month: nowmonth,
      date: nowdate,
      day: transDay(nowdayNum),
      dayNum: nowdayNum,
    });
  }, []);

  useEffect(() => {
    setDutyTimes({
      월: [hospitalData.dutyTime1s, hospitalData.dutyTime1c],
      화: [hospitalData.dutyTime2s, hospitalData.dutyTime2c],
      수: [hospitalData.dutyTime3s, hospitalData.dutyTime3c],
      목: [hospitalData.dutyTime4s, hospitalData.dutyTime4c],
      금: [hospitalData.dutyTime5s, hospitalData.dutyTime5c],
      토: [hospitalData.dutyTime6s, hospitalData.dutyTime6c],
      일: [hospitalData.dutyTime7s, hospitalData.dutyTime7c],
    });
  }, [hospitalData]);

  useEffect(() => {
    const date = new Date(
      reserveday.year,
      reserveday.month - 1,
      reserveday.date
    );
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    setReserveday((current) => {
      const newDay = { ...current, day: dayOfWeek };
      return newDay;
    });
  }, [reserveday.date]);

  // 모달창 컨트롤
  const ModalReserveDays = ({ year, month }) => {
    function changeDay(e) {
      let changeValue = e.target.value;
      let changeValueArray = changeValue.split("-");

      setDayinput(e.target.value);

      setReserveday((current) => {
        const newreserveday = { ...current };
        newreserveday.year = Number(changeValueArray[0]);
        newreserveday.month = Number(changeValueArray[1]);
        newreserveday.date = Number(changeValueArray[2]);
        return newreserveday;
      });
    }

    return (
      <>
        <ModalInput
          onChange={changeDay}
          value={dayinput}
          type="date"
          min={`${reserveday.year}-01-01`}
          max="2099-12-31"
        ></ModalInput>
      </>
    );
  };

  function openModal() {
    return setReserveModal(true);
  }
  function closeModal() {
    if (dutyTimes[reserveday.day][0] !== null) {
      // 근무시간이 있는 날일시 시간 배열 생성
      setReserveTimeTable(() => {
        let result = [];

        // start = [[10],[30]]
        const start = [
          Number(dutyTimes[reserveday.day][0].split("").slice(0, 2).join("")),
          Number(dutyTimes[reserveday.day][0].split("").slice(2, 4).join("")),
        ];
        const close = [
          Number(dutyTimes[reserveday.day][1].split("").slice(0, 2).join("")),
          Number(dutyTimes[reserveday.day][1].split("").slice(2, 4).join("")),
        ];
        let minute = start[1];

        for (let i = start[0]; i < close[0]; i++) {
          let time = String(i) + String(minute);
          if (time.length < 4) {
            time = "0" + time;
          }
          result.push(time);

          if (minute == 0) {
            minute = 30;
            time = String(i) + String(minute);
            if (time.length < 4) {
              time = "0" + time;
            }
            result.push(time);
          }
          minute = "00";
        }
        return result;
      });
      return setReserveModal(false);
    } else {
      alert("예약이 불가능한 날입니다");
    }
  }

  function checkReserve(time, reserveday) {
    let result = false;

    function checkToday(data) {
      const whenYear = Number(data.reservedDate.slice(0, 4));
      const whenMonth = Number(data.reservedDate.slice(4, 6));
      const whenDay = Number(data.reservedDate.slice(6, 8));
      return (
        whenYear == reserveday.year &&
        whenMonth == reserveday.month &&
        whenDay == reserveday.date
      );
    }
    const todayReserve = reservedTime.filter(checkToday);

    todayReserve.forEach((day) => {
      if (time == day.reservedTime) {
        result = true;
      }
    });

    return result;
  }

  function hadleBtn(BtnIndex) {
    setClickedBtn(BtnIndex);
  }

  function handleSubmit(time) {
    // 제출시 로그인토큰 유무에 따른 동작 분류
    if (token) {
      let transReserveday = { ...reserveday };
      if (String(transReserveday.month).length == 1) {
        transReserveday.month = "0" + String(transReserveday.month);
      }
      if (String(transReserveday.date).length == 1) {
        transReserveday.date = "0" + String(transReserveday.date);
      }

      const data = {
        hospitalId: `${hospitalID}`,
        memo: "메모 내용입니다.",
        reservedTime: `${time}`,
        reservedDate: `${transReserveday.year}${transReserveday.month}${transReserveday.date}`,
      };

      fetch(`${BEdata}reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((submitData) => {
          setReservedTime((current) => {
            const newReservedTime = [...current];
            newReservedTime.push(submitData.data);
            return newReservedTime;
          });
        });

      alert("예약되었습니다, 예약확인 페이지로 이동합니다");
      navigate("/reserve");
    } else {
      alert("로그인 후 예약가능합니다");
    }
  }

  // 공통 컴포넌트 수정활용 *즐겨찾기,뒤로가기 클릭 이벤트 추가해야함
  const NewHeader = ({ label, onClick }) => {
    return (
      <>
        <HeaderWrap>
          <BtnBack onClick={() => navigate(`/detail?id=${hospitalID}`)}>
            <img alt="icon-left" src={IconLeft}></img>
          </BtnBack>
          <div>
            <h2>{label}</h2>
          </div>
          <HeaderStar onClick={handleFavoriteClick}>
            {likeState ? (
              <img alt="like" src={yellowStar}></img>
            ) : (
              <img alt="notlike" src={star}></img>
            )}
          </HeaderStar>
        </HeaderWrap>
      </>
    );
  };

  const NewCardBox = ({
    bgcolor,
    fontSize,
    color,
    width,
    height,
    label,
    onClick,
    disabled,
    borderRad,
    button,
    margin,
  }) => {
    return (
      <NewCardBoxStyle
        onClick={onClick}
        fontSize={fontSize}
        color={color}
        bgcolor={bgcolor}
        width={width}
        height={height}
        disabled={disabled}
        borderRad={borderRad}
        margin={margin}
      >
        {label}
        {button}
      </NewCardBoxStyle>
    );
  };

  const NewButton = ({
    btnColor,
    btnFontSize,
    bgcolor,
    borderOutLine,
    width,
    height,
    label,
    onClick,
    disabled,
  }) => {
    return (
      <>
        <div>
          <NewButtonStyle
            onClick={onClick}
            fontSize={btnFontSize}
            color={btnColor}
            bgcolor={bgcolor}
            borderOutLine={borderOutLine}
            width={width}
            height={height}
            disabled={disabled}
          >
            {label}
          </NewButtonStyle>
        </div>
      </>
    );
  };

  function handleFavorite(data) {
    fetch(`${BEdata}favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data.id) {
          setLikeState(true);
        } else {
          setLikeState(false);
        }
      });
  }

  const handleFavoriteClick = (event) => {
    //즐겨찾기 클릭 시 Link로 넘어가는 것을 막음
    event.preventDefault();
    if (token) {
      try {
        handleFavorite({ hospitalId: hospitalID });
      } catch (error) {
        console.error("Favorite post 요청 실패", error);
        // 필요한 에러 처리 작업 수행
      }
    } else {
      alert("로그인 후 즐겨찾기가 가능합니다");
    }
  };

  return (
    <>
      <Container>
        <HeaderContainer>
          <NewHeader label={hospitalData.dutyName} />
        </HeaderContainer>
        <TopContentContainer>
          <div>{hospitalData.dutyName}</div>
          <UnderLine />
        </TopContentContainer>
        <BottomContentContainer>
          <HpInfo>
            <img src={clockGreen} alt="" />
            <HpInfoGrid>
              {hospitalData.dutyTime1c && hospitalData.dutyTime1s && (
                <HpInfoCard>
                  월 {formatTime(hospitalData.dutyTime1s)}-
                  {formatTime(hospitalData.dutyTime1c)}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime2c && hospitalData.dutyTime2s && (
                <HpInfoCard>
                  화 {formatTime(hospitalData.dutyTime2s)}-
                  {formatTime(hospitalData.dutyTime2c)}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime3c && hospitalData.dutyTime3s && (
                <HpInfoCard>
                  수 {formatTime(hospitalData.dutyTime3s)}-
                  {formatTime(hospitalData.dutyTime3c)}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime4c && hospitalData.dutyTime4s && (
                <HpInfoCard>
                  목 {formatTime(hospitalData.dutyTime4s)}-
                  {formatTime(hospitalData.dutyTime4c)}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime5c && hospitalData.dutyTime5s && (
                <HpInfoCard>
                  금 {formatTime(hospitalData.dutyTime5s)}-
                  {formatTime(hospitalData.dutyTime5c)}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime6c && hospitalData.dutyTime6s && (
                <HpInfoCard>
                  토 {formatTime(hospitalData.dutyTime6s)}-
                  {formatTime(hospitalData.dutyTime6c)}
                </HpInfoCard>
              )}
              {hospitalData.dutyTime7c && hospitalData.dutyTime7s && (
                <HpInfoCard>
                  일 {formatTime(hospitalData.dutyTime7s)}-
                  {formatTime(hospitalData.dutyTime7c)}
                </HpInfoCard>
              )}
            </HpInfoGrid>
          </HpInfo>
          <NewCardBox
            bgcolor={"#FEFEFE"}
            width={"100%"}
            height={"86px"}
            label={`${reserveday.year}. ${reserveday.month}. ${reserveday.date}. (${reserveday.day})`}
            borderRad={"16px"}
            color={colors.primary}
            fontSize={"25px"}
            margin={"37px 0 45px 0"}
            button={
              <NewButton
                width={"100px"}
                height={"43px"}
                bgcolor={colors.primary}
                label={<span>날짜선택</span>}
                borderOutLine={"#ffffff"}
                btnColor={"white"}
                btnFontSize={"16px"}
                onClick={openModal}
              ></NewButton>
            }
          ></NewCardBox>
          <QueryReserveBtn onClick={openModal}>
            <span>날짜선택</span>
          </QueryReserveBtn>
          <div>
            <Modal
              isOpen={reserveModal}
              onClose={closeModal}
              onSaved={closeModal}
              title={hospitalData.dutyName}
              style={{ width: "60%" }}
            >
              <ModalContentContainer>
                <p>
                  {reserveday.year}. {reserveday.month}. {reserveday.date}. (
                  {reserveday.day})
                </p>
                <ModalContent>
                  <ModalReserveDays
                    year={reserveday.year}
                    month={reserveday.month}
                  ></ModalReserveDays>
                </ModalContent>
              </ModalContentContainer>
            </Modal>
            <ReserveTimes>
              {reserveTimeTable.map((time, index) => (
                <ReserveTime
                  key={index}
                  clicked={index == clickedBtn}
                  onClick={() => {
                    if (checkReserve(time, reserveday)) {
                      return alert("이미 예약된 날짜입니다");
                    } else {
                      hadleBtn(index);
                      setClickedBtnTime(time);
                    }
                  }}
                  when={time}
                  disabled={checkReserve(time, reserveday)}
                >
                  <span>{formatTime(time)}</span>
                </ReserveTime>
              ))}
            </ReserveTimes>
          </div>
          {reserveTimeTable.length > 0 && (
            <ReserveSubmit
              onClick={() => {
                handleSubmit(clickedBtnTime);
              }}
            >
              선택완료
            </ReserveSubmit>
          )}
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
  cursor: pointer;
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
  cursor: pointer;
`;

//스타일 - 메인컨텐츠
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
`;

const UnderLine = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100px;
  border-bottom: 2px solid ${colors.primary};
`;

const BottomContentContainer = styled.div`
  flex-direction: column;
  text-align: center;
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
  text-align: left;
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

const NewButtonStyle = styled.button`
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${(props) => props.borderOutLine};
  border-radius: 5px;
  background-color: ${(props) => props.bgcolor};
  cursor: pointer;
  padding: 1% 3.5% @media screen and (max-width: 800px) {
    display: none;
  }
  &:disabled {
    color: white;
    background-color: ${colors.InputBorderOut};
    border: 1px solid ${colors.InputBorderOut};
    cursor: not-allowed;
  }
`;

const NewCardBoxStyle = styled.div`
  display: flex;
  position: relative;
  border: solid 1px #b2b2b2;
  box-sizing: border-box;
  padding: 2%;
  margin: ${(props) => props.margin};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.borderRad};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgcolor};
  font-weight: 600;

  button {
    position: absolute;
    right: 58px;
    bottom: 22px;
    padding: 0;
    &:hover {
      opacity: 70%;
    }
  }
  &:disabled {
    color: white;
    background-color: #dadada;
    border: 1px solid;
    cursor: not-allowed;
  }
`;

// 모달 디자인
const ModalContentContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  text-align: center;
  flex-direction: column;
  p {
    color: ${colors.primary};
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    padding: 15px 0 15px 0;
    border: 1px solid ${colors.primary};
    border-radius: 15px;
  }
`;

const ModalContent = styled.div``;

const ModalInput = styled.input`
  width: 50%;
  height: 45px;
  background-color: white;
  border: solid 1px #cdcdcd;
  border-radius: 10px;
  font-size: 17px;
  color: #333333;
  margin: 10px 0 20px 0;
  padding: 20px;
  text-align: center;
  &:hover {
    border: solid 1px ${colors.primary};
    color: ${colors.primary};
    opacity: 70%;
  }
`;

// 모달에서 날짜를 선택하고 생성되는 시간
const ReserveTimes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  width: 100%;
  height: 450px;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ReserveTime = styled.button`
  cursor: ${({ disabled }) => {
    if (disabled) {
      return "now-allowed";
    } else {
      return "pointer";
    }
  }};
  width: 100%;
  height: 55px;
  background-color: ${({ clicked, disabled }) => {
    if (disabled) {
      return "gray";
    } else {
      return clicked ? `${colors.primary}` : "white";
    }
  }};
  border: solid 1px #cdcdcd;
  border-radius: 6px;
  font-size: 15px;
  color: ${({ clicked, disabled }) => {
    if (disabled) {
      return "white";
    } else {
      return clicked ? `white` : "#444444";
    }
  }};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 400;
  font-size: 20px;
  &:hover {
    opacity: 50%;
  }
`;

const ReserveSubmit = styled.button`
  cursor: pointer;
  background: #00ad5c;
  border: 1px solid #00a758;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  width: 237px;
  height: 69px;
  font-weight: 700;
  font-size: 30px;
  color: #ffffff;
  margin: 45px 0 130px 0;
  &:hover {
    opacity: 70%;
  }
`;

const QueryReserveBtn = styled.button`
  display: none;
  cursor: pointer;
  margin-bottom: 50px;
  width: 100%;
  height: 55px;
  background-color: ${colors.primary};
  color: white;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid #00a758;
  border-radius: 7px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 800px) {
    display: inline-block;
  }
`;

export default Reserve;
