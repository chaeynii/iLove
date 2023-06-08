import React, { useState } from "react";
import styled from "styled-components";
import IconDown from "../../assets/iconDown.svg";

//검색 정렬 옵션
const SORT_OPTIONS = [
  { name: "인기순", state: "byPopular" },
  { name: "이름순", state: "byName" },
];

const SearchHeader = ({ total, sortOption, onOptionChange }) => {
  const [totalShow, setTotalShow] = useState(total);

  const [option, setOption] = useState(sortOption);

  const [isOpen, setIsOpen] = useState(false);
  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (e) => {
    const selectedOptionState = e.target.value;
    const selectedOption = SORT_OPTIONS.find(
      (option) => option.state === selectedOptionState
    );

    if (selectedOption) {
      setOption(selectedOption);
      setIsOpen(false);
      onOptionChange(selectedOption.state); // 변경된 옵션을 외부 컴포넌트로 전달
    }
  };

  return (
    <Wrapper>
      <Total>총 {totalShow} 개</Total>
      <div>
        <DropdownContainer>
          <DropdownButton isOpen={isOpen} onClick={handleSelectClick}>
            {option.name}
          </DropdownButton>
          <DropdownMenu isOpen={isOpen}>
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.state}
                value={option.state}
                onClick={handleOptionChange}
              >
                {option.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        </DropdownContainer>
        <img alt="icon-down" src={IconDown}></img>
      </div>
    </Wrapper>
  );
};

export default SearchHeader;

const Wrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #121212;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
`;

const Total = styled.span`
  font-size: 20px;
  margin-left: 2%;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  color: #121212;
  padding: 0.5rem;
  border-radius: 4px;
  outline: none;
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
  width: 100%;
`;

const DropdownMenuItem = styled.option`
  margin: 5% 0;
  cursor: pointer;
  font-size: 16px;
`;
