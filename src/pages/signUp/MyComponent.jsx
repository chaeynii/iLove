import React, { useState, useEffect } from "react";
import VirtualScroll from "./VirtualScroll";
import { instance } from "../../server/Fetcher";
import styled from "styled-components";

export const MyComponent = ({
  hospitalNameInput,
  setHpId,
  setHospitalNameInput,
}) => {
  const [scrollData, setScrollData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const Elem = ({ i, style }) => {
    //div를 button 같은 것으로 바꾸어 줍니다.
    //onClick 함수를 만들어줍니다.
    const buttonOnClick = (e) => {
      e.preventDefault();
      setHpId(scrollData[i].id);
      setHospitalNameInput(scrollData[i].dutyName);
    };

    return (
      <>
        <button
          onClick={buttonOnClick}
          style={{
            ...style,

            backgroundColor: "#fff",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            margin: "10px 0",
            marginLeft: "6%",
            height: "50px",
            fontSize: "15px",

            border: "0px",
            borderBottom: "1px solid green",
          }}
        >
          <div>
            <div>{scrollData[i].dutyAddr2Depth}</div>
            <div style={{ padding: "6% 0" }}> {scrollData[i].dutyName}</div>
          </div>
        </button>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (hospitalNameInput) {
          const response = await instance.get(
            `/hospital/hp10/${hospitalNameInput}?size=10&page=1`
          );

          if (response.data.success) {
            setScrollData(response.data.data);
          }
        }
      } catch (error) {}
    };

    fetchData();
  }, [hospitalNameInput]);

  useEffect(() => {
    if (!hospitalNameInput) {
      setScrollData([]);
    }
  }, [hospitalNameInput]);

  const fetchMoreData = async () => {
    let page = 0;
    if (hospitalNameInput) {
      try {
        page = Math.ceil(scrollData.length / 10) + 1;
        const newScrollData = await instance.get(
          `/hospital/hp10/${hospitalNameInput}?size=10&page=${page}`
        );

        if (newScrollData.data.success) {
          const nextScrollData = scrollData.concat(newScrollData.data.data);
          setScrollData(nextScrollData);
        }
      } catch (error) {
        // 에러 처리
      }
    }
  };

  // 데이터 리미트
  useEffect(() => {
    if (scrollData.length >= 100) {
      setHasMore(false);
    }
  }, [scrollData.length]);

  const rowRenderer = ({ index, key, style }) => (
    <Elem key={key} i={index} style={style} />
  );

  /*지정된 병원을 div 같은 것으로 심어주면 될 것 같습니다.
  여기서 div 같은 걸로 심는 것 보다는 가입 페이지에
  인풋 태그나 그런걸 하나 만들어서 거기에 담아주는 편이 좋을 것 같네요.*/
  return (
    <>
      <VirtualScroll
        dataLength={scrollData.length}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            loading...
          </div>
        }
        height={300}
        elementHeight={70} // 새로 추가
        rowRenderer={rowRenderer}
        children={scrollData}
      />
    </>
  );
};

/*이런 식으로 심어둔 selectedHospital을 로그인 페이지에 담아서
AJAX 통신으로 보내주면 우리가 원하던 병원의 id를 같이
보내 줄 수 있을거라 생각됩니다.*/

export default MyComponent;
