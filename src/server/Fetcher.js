import axios from "axios";

// 토큰이 로컬스토리지에서 getItem 으로 변경될 예정
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwic3ViIjoyLCJpYXQiOjE2ODYyOTAxOTUsImV4cCI6MTcxNzg0Nzc5NX0._vIRMzSEE7L4iXeRabto1_51k0D_7XVNaU1Rmxj4Dak";

// baseURL 은 변수에 공통으로 사용할 경로 설정후 :id 이런식으로 추가하고
// 사용할 때는 ${변수} 이런 방법 예상
export const instance = axios.create({
  baseURL: "http://34.64.69.226:3000/",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export const deleteinstance = axios.create({
  baseURL: "http://34.64.69.226:3000/",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

// 토큰 유무 2개, 폼데이터
