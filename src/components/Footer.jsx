import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return (
    <>
      <FooterBox>
        <FooterTitle>[웹사이트 명]</FooterTitle>
        <FooterLink href="https://kdt-gitlab.elice.io/sw_track/class_04/web_2_project/team05/front-end">
          https://kdt-gitlab.elice.io/sw_track/class_04/web_2_project/team05/front-end
        </FooterLink>
        <FooterP>2023-05-26 ~ 2023-06-16</FooterP>
      </FooterBox>
    </>
  );
};

const FooterBox = styled.div`
  font-size: 12px;
  text-align: center;
  color: #606060;
  width: 100%;
  height: 126px;
  background-color: #f3f3f3;
  margin: 0px auto 0px auto;
`;

const FooterTitle = styled.p`
  padding: 5% 0 1% 0;
`;

const FooterLink = styled.a`
  color: #606060;
`;

const FooterP = styled.p`
  padding: 0.6% 0 0 0;
`;
