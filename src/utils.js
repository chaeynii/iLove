import dayjs from "dayjs";

//시간 형식을 변환하는 함수
export const formatTime = (time) => {
  if (!time) {
    return null;
  }
  const hours = time?.slice(0, 2);
  const minutes = time?.slice(2);
  return `${hours}:${minutes}`;
};

export const formatDay = (date) => {
  if (!date) {
    return null;
  }
  const formatDate = date.slice(4, 9);

  const month = formatDate?.slice(0, 2);
  const day = formatDate?.slice(2);
  return `${month}/${day}`;
};

//URL
export const BE_URL = `http://34.64.69.226:5000/api/`;
export const endpoint_user = `users/`;
export const endpoint_favorite = `favorite/`;
export const endpoint_hospital = `hospital/`;
export const endpoint_reserve = `reservation/`;

//토큰 get
export const getUserToken = () => localStorage.getItem("token");

//디데이계산
export const calculateDday = (activeDate, targetDate) => {
  const diffInDays = dayjs(targetDate).diff(dayjs(activeDate), "day");

  if (diffInDays !== 0) {
    if (diffInDays < 0) {
      return `D+${Math.abs(diffInDays)}`;
    } else {
      return `D-${diffInDays}`;
    }
  } else {
    return "Today";
  }
};
