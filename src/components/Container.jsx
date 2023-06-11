import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 834px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 3%; /* 고정 내비게이션과 겹치지 않도록 콘텐츠 하단에 패딩 추가 */
`;
/* [ align-items: center;] 
텍스트만 중앙정렬됨으로 혹시 텍스트가 없는 div나 이미지를 첨부하실 경우
해당 요소에 margin: auto; 를 넣어주세요! */
