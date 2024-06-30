import styled from 'styled-components';
import { useEffect, useRef, useState, useCallback } from 'react';

import InputBox from '@/components/common/molecules/InputBox';
import { HELPER_TEXT } from '@/constants/helperText';

import { validateDevTerm, validateCommonPron, validateAwkPron, validateLength } from '@/utils/validate';
import { updateState } from '@/utils/stateUtils';

//useRef -> 모달 본체 (modalbody) 참조, 클릭이벤트가 모달 내부인지 외부인지 확인
export default function Modal({ onClose }) {
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    devTerm: '',
    commonPron: '',
    awkPron: '',
    addInfo: '',
  });

  const [helperText, setHelperText] = useState({
    devTermHelper: '',
    commonPronHelper: '',
    awkPronHelper: '',
  });

  const [buttonActive, setButtonActive] = useState(false);

  // 모든 유효성 검사
  useEffect(() => {
    if (
      validateDevTerm(formData.devTerm) &&
      validateCommonPron(formData.commonPron) &&
      validateAwkPron(formData.awkPron) &&
      validateLength(formData.devTerm, 50) &&
      validateLength(formData.commonPron, 100) &&
      validateLength(formData.awkPron, 1000) &&
      formData.devTerm &&
      formData.commonPron &&
      formData.awkPron
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [formData]);

  // 제출 시 유효성 검사
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.devTerm) {
      updateState('devTermHelper', HELPER_TEXT.ONLY_ENGLISH_INPUT, setHelperText);
      hasError = true;
    } else if (!validateDevTerm(formData.devTerm)) {
      updateState('devTermHelper', HELPER_TEXT.ONLY_ENGLISH_INPUT, setHelperText);
      hasError = true;
    } else if (!validateLength(formData.devTerm, 50)) {
      updateState('devTermHelper', HELPER_TEXT.EXCEED_LENGTH(50), setHelperText);
      hasError = true;
    } else {
      updateState('devTermHelper', '', setHelperText);
    }

    if (!formData.commonPron) {
      updateState('commonPronHelper', HELPER_TEXT.ONLY_KOREAN_INPUT, setHelperText);
      hasError = true;
    } else if (!validateCommonPron(formData.commonPron)) {
      updateState('commonPronHelper', HELPER_TEXT.ONLY_KOREAN_INPUT, setHelperText);
      hasError = true;
    } else if (!validateLength(formData.commonPron, 100)) {
      updateState('commonPronHelper', HELPER_TEXT.EXCEED_LENGTH(100), setHelperText);
      hasError = true;
    } else {
      updateState('commonPronHelper', '', setHelperText);
    }

    if (!formData.awkPron) {
      updateState('awkPronHelper', HELPER_TEXT.ONLY_KOREAN_INPUT, setHelperText);
      hasError = true;
    } else if (!validateAwkPron(formData.awkPron)) {
      updateState('awkPronHelper', HELPER_TEXT.ONLY_KOREAN_INPUT, setHelperText);
      hasError = true;
    } else if (!validateLength(formData.awkPron, 1000)) {
      updateState('awkPronHelper', HELPER_TEXT.EXCEED_LENGTH(1000), setHelperText);
      hasError = true;
    } else {
      updateState('awkPronHelper', '', setHelperText);
    }

    if (hasError) {
      return;
    }

    alert('제출되었습니다');
    onClose();
  };

  //외부 클릭 모달창 닫기
  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); //모달 닫기
      }
    },
    [onClose]
  );
  
  //클릭감지, mousedown이 click보다 먼 감지
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalBody ref={modalRef}>
        <ModalHeader>
          <ModalTitle>등록 요청</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <StyledInputBox
            type='text'
            name='devTerm'
            labelText='개발 용어 (영어)'
            input={formData.devTerm}
            setInput={setFormData}
            valid={helperText.devTermHelper ? false : true}
            helperText={helperText.devTermHelper}
            className={'Box'}
          />
          <StyledInputBox
            type='text'
            name='commonPron'
            labelText='일반적인 발음 (한글)'
            input={formData.commonPron}
            setInput={setFormData}
            valid={helperText.commonPronHelper ? false : true}
            helperText={helperText.commonPronHelper}
            className={'Box'} 

          />
          <StyledInputBox
            type='text'
            name='awkPron'
            labelText='어색한 발음 (한글)'
            input={formData.awkPron}
            setInput={setFormData}
            valid={helperText.awkPronHelper ? false : true}
            helperText={helperText.awkPronHelper}
            className={'Box'}
          />
          <Item>
            <Label>추가정보</Label>
            <TextArea
              name='addInfo'
              input={formData.addInfo}
              setInput={setFormData}
              />
          </Item>
        </ModalContent>
        <ModalFooter>
          <ButtonGroup>
            <ModalButton isClose onClick={onClose}>
              닫기
            </ModalButton>
            <ModalButton onClick={handleSubmit} $active={buttonActive}>
              제출
            </ModalButton>
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
  background-color: #1c19191a;
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
`;

const StyledInputBox = styled(InputBox)`
  &&&.Box {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  Input {
    width: 498px;
    height: 55px;
    padding: 10px 20px;
    border: 1px solid var(--secondary);
    border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--secondary)')};
    &:focus {
      border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--primary)')};
      outline: none;
    }
    &:hover {
      border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--primary)')};
    }
    
  }
  Label {
    width: 498px;
    font-size: 15px;
    font-weight: 600;
    line-height: 22.5px;
    letter-spacing: -0.03em;
    text-align: left;
    position: relative;
    &::after {
      content: ' *';
      color: #ff0808;
      position: aboslute;
      right: 5%;
      top: 0;
    }
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
  &:hover {
    border-color: var(--primary);
  }
`;

const ModalButton = styled.button`
  width: 88px;
  height: 40px;
  border: none;
  border-radius: 30px;
  padding: 8px 30px;
  color: #fff;
  cursor: ${(props) => (props.isClose || props.$active ? 'pointer' : 'not-allowed')};
  background-color: ${(props) => 
    props.isClose ? 'rgba(0, 0, 0, 0.25)' : 
    props.$active ? 'var(--primary)' : 'var(--primary60)'};
`;
