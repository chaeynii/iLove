import { useState } from "react";
import * as Style from "./ModalStyle";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";

export const Modal = ({
  title = "모달제목",
  isOpen,
  onClose,
  children,
  onSaved,
}) => {
  const onSaveHandler = () => {
    console.log("Save button clicked");
    onSaved(); // onSaved 함수 호출
    onClose(); // onClose 함수 호출
  };

  const ModalBtnProps = {
    btnFontSize: `${fontSize.h2}`,
    bgcolor: `${colors.primary} !important`,
    borderOutLine: `${colors.BtnborderOut} !important`,
    width: "fit-content",
    height: "fit-content",
    color: "white",
  };

  const closeModalHandler = () => {
    onClose(); // onClose 함수 호출
  };

  return (
    <>
      <Style.ModalContainer>
        {isOpen && (
          <Style.ModalBackdrop onClick={closeModalHandler}>
            <Style.ModalView onClick={(e) => e.stopPropagation()}>
              <Style.ModalTitle>
                <span>{title}</span>
              </Style.ModalTitle>
              <div>{children}</div>
              <div>
                <Style.ModalBtn
                  {...ModalBtnProps}
                  label={"닫기"}
                  onClick={closeModalHandler}
                >
                  닫기
                </Style.ModalBtn>
                <Style.ModalBtn
                  {...ModalBtnProps}
                  label={"확인"}
                  onClick={onSaveHandler}
                >
                  확인
                </Style.ModalBtn>
              </div>
            </Style.ModalView>
          </Style.ModalBackdrop>
        )}
      </Style.ModalContainer>
    </>
  );
};
