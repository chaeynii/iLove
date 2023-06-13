//시간 형식을 변환하는 함수
export const formatTime = (time) => {
  if (!time) {
    return null;
  }
  const hours = time?.slice(0, 2);
  const minutes = time?.slice(2);
  return `${hours}:${minutes}`;
};

//URL
export const BE_URL = `http://34.64.69.226:5000/api/`;
export const endpoint_user = `users/`;
export const endpoint_favorite = `favorite/`;
export const endpoint_hospital = `hospital/`;
