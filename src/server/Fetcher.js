export const fetchList = async () => {
  const res = await fetch(`admin/get/generelclient`, {
    headers: {
      Accept: "application / json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwic3ViIjoxLCJpYXQiOjE2ODYxMDg4MzksImV4cCI6MTcxNzY2NjQzOX0.KoXifXgRmenLuMXmJ_RP1ZJnjinLlyhjD-HN1GAXc5A",
    },
  });

  const list = await res.json();
  console.log(list);
  return list;
};
