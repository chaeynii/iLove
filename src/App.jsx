/* eslint-disable */

import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 공통 컴포넌트 연결해서 테스트함
import { Button } from "./components/Button";
import { NavigationBar } from "./components/NavigationBar";
import { Container } from "./components/Container";
import { Footer } from "./components/Footer";
import { CardBox } from "./components/CardBox";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "./constants/colors";
import fontSize from "./constants/fontSize";

import "./App.css";

function App() {
  const [arr, setArr] = useState();

  console.log(arr);

  useEffect(() => {
    fetch(
      "https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncFullDown?serviceKey=aQFwyyURxZPboOkpSx1uUEC9mvyECY1ClICrCdzJ9lNT9JZC0oGtU%2BKwiY7dSTrZm3wodyTWqkdltlLRwKFafQ%3D%3D&pageNo=1&numOfRows=10"
    )
      .then((res) => res.text())
      .then((data) => {
        const xml = new XMLParser().parseFromString(data);
        setArr(xml.children[1].children[0].children);
      })
      .catch(() => console.log("err"));
  }, []);

  return (
    <>
      <Container>
        <Router>
          <Button
            LinkTo={"https://www.naver.com/"}
            onClick={() => {
              console.log("Button was clicked!");
            }}
            label={"안녕"}
            btnFontSize={fontSize.but}
            btnColor={"white"}
            bgcolor={colors.primary}
            // width={"30px"}
            // height={"90px"}
            borderOutLine={colors.BtnborderOut}
          />
          <CardBox linkTo={"https://www.naver.com/"} children={"안녕"} />
          <NavigationBar />
          <Footer />
        </Router>
      </Container>
    </>
  );
}

export default App;
