import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export const MyComponent = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/hospital/all");
        const data = response.data.data;

        const updatedOptions = data.map((item) => ({
          label: `${item.dutyName}, ${item.dutyAddr}`,
          value: `${item.dutyName}, ${item.dutyAddr}`,
          key: `${item.id}`,
        }));

        setOptions(updatedOptions);
        // console.log("데이터", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    console.log("선택", selectedOption);
  };
  return <Select options={options} onChange={handleSelectChange} />;
};

export default MyComponent;
