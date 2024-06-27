import styled from "styled-components";
import { useEffect, useRef } from "react";

//useRef -> 모달 본체 (modalbody) 참조, 클릭이벤트가 모달 내부인지 외부인지 확인
export default function Modal({ onClose }) {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); //모달 닫기
    }
  };

  //클릭감지, mousedown이 click보다 먼저 감지
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalBody ref={modalRef}>
        <ModalHeader>
          <ModalTitle>등록 요청</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <Item>
            <Label>개발 용어(영어)</Label>
            <Input />
          </Item>
          <Item>
            <Label>일반적인 발음 (한글)</Label>
            <Input />
          </Item>
          <Item>
            <Label>어색한 발음 (한글)</Label>
            <Input />
          </Item>
          <Item>
            <Label>추가정보</Label>
            <TextArea />
          </Item>
        </ModalContent>
        <ModalFooter>
          <ButtonGroup>
            <ModalButton isClose onClick={onClose}>
              닫기
            </ModalButton>
            <ModalButton>제출</ModalButton>
          </ButtonGroup>
        </ModalFooter>
      </ModalBody>
    </ModalContainer>
  );
}
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1C19191A;
  z-index: 101;
`;

const ModalBody = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560px;
  height: 792px;
  background-color: #fff;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 66.5px 0;
  border-radius: 20px;
  border: 1px solid var(--secondary);
`;
const ModalHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const ModalTitle = styled.h1`
  width: 163px;
  height: 56px;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.03em;
  text-align: center;
`;
const ModalContent = styled.section`
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalFooter = styled.footer`
  display: flex;
  height: 80px;
  justify-content: center;
  padding: 0 12px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-right: 17px;
`;

const Item = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-bottom: 31.5px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  text-align: left;
  position: relative;
  &::after {
    content: " *";
    color: #ff0808;
    position: aboslute;
    right: 5%;
    top: 0;
  }
`;

const Input = styled.input`
  width: 498px;
  height: 55px;
  padding: 10px 20px;
  gap: 0px;
  border: 1px solid var(--secondary);
  border-radius: 10px;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 498px;
  height: 123px;
  border: 1px solid var(--secondary);
  border-radius: 10px;
  padding: 20px;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const ModalButton = styled.button`
  width: 88px;
  height: 40px;
  border: none;
  border-radius: 30px;
  padding: 8px 30px;
  color: #fff;
  cursor: pointer;
  background-color: ${(props) =>
    props.isClose ? "rgba(0, 0, 0, 0.25)" : "var(--primary60)"};
`;
