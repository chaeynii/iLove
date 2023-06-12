//시간 형식을 변환하는 함수
export const formatTime = (time) => {
  if (!time) {
    return null;
  }
  const hours = time?.slice(0, 2);
  const minutes = time?.slice(2);
  return `${hours}:${minutes}`;
};
