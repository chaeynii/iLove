export const fetchList = async (token) => {
  const res = await fetch(`http://localhost:9999/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const list = await res.json();

  return list;
};
