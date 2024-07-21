import styled from 'styled-components';
import { useEffect, useRef, useState, useCallback } from 'react';

import InputBox from '@/components/common/molecules/InputBox';
import { HELPER_TEXT } from '@/constants/helperText';

import { validateLength, validateDevTerm } from '@/utils/validate';
import { updateState } from '@/utils/stateUtils';
import api from '@/utils/api';

import LabelWithTooltip from '@/components/search/organisms/LabelWithTooltip';

import useAuthStore from '@/store/useAuthStore';

//useRef -> 모달 본체 (modalbody) 참조, 클릭이벤트가 모달 내부인지 외부인지 확인
export default function Modal({ onClose, searchResult }) {
  const modalRef = useRef();
  const { nickname } = useAuthStore();

  const [formData, setFormData] = useState({
    devTerm: searchResult ? searchResult.word : '',
    commonPron: searchResult ? searchResult.comPron : '',
    awkPron: searchResult ? searchResult.awkPron : '',
    addInfo: searchResult ? searchResult.info : '',
  });

  const [helperText, setHelperText] = useState({
    devTermHelper: '',
    commonPronHelper: '',
    awkPronHelper: '',
    addInfoHelper: '',
  });

  const [buttonActive, setButtonActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'devTerm') return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 모든 유효성 검사
  useEffect(() => {
    if (
      validateLength(formData.devTerm, 50) &&
      validateLength(formData.commonPron, 100) &&
      validateLength(formData.awkPron, 100) &&
      validateLength(formData.addInfo, 1000) &&
      validateDevTerm(formData.devTerm) &&
      formData.devTerm &&
      formData.commonPron
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
      updateState('devTermHelper', HELPER_TEXT.REQUIRED_INPUT_EMPTY, setHelperText);
      hasError = true;
    } else if (!validateDevTerm(formData.devTerm)) {
      updateState('devTermHelper', HELPER_TEXT.INVALID_DEVTERM, setHelperText);
      hasError = true;
    } else if (!validateLength(formData.devTerm, 50)) {
      updateState('devTermHelper', HELPER_TEXT.EXCEED_LENGTH(50), setHelperText);
      hasError = true;
    } else {
      updateState('devTermHelper', '', setHelperText);
    }

    if (!formData.commonPron) {
      updateState('commonPronHelper', HELPER_TEXT.REQUIRED_INPUT_EMPTY, setHelperText);
      hasError = true;
    } else if (!validateLength(formData.commonPron, 100)) {
      updateState('commonPronHelper', HELPER_TEXT.EXCEED_LENGTH(100), setHelperText);
      hasError = true;
    } else {
      updateState('commonPronHelper', '', setHelperText);
    }

    if (!validateLength(formData.awkPron, 100)) {
      updateState('awkPronHelper', HELPER_TEXT.EXCEED_LENGTH(100), setHelperText);
      hasError = true;
    } else {
      updateState('awkPronHelper', '', setHelperText);
    }

    if (!validateLength(formData.addInfo, 1000)) {
      updateState('addInfoHelper', HELPER_TEXT.EXCEED_LENGTH(1000), setHelperText);
      hasError = true;
    } else {
      updateState('addInfoHelper', '', setHelperText);
    }

    if (hasError) {
      return;
    }

    const type = 'mod'; // 수정 요청
    const requestData = {
      word: formData.devTerm,
      formData,
      type,
      nickname,
    };

    console.log('Sending request data:', requestData);
    try {
      const response = await api.post(`/users/requests/new`, requestData);
      console.log('Response:', response);

      if (response.message === '등록 요청 성공') {
        alert('수정 요청이 제출되었습니다');
      } else if (response === '같은 단어에 대한 요청이 존재합니다.') {
        alert('같은 단어의 대한 요청이 존재합니다.');
      } else {
        alert('수정 요청 중 오류가 발생했습니다.');
      }

      onClose();
    } catch (error) {
      console.error('수정 요청 중 오류가 발생하였습니다:', error);
      alert('수정 요청 중 오류가 발생했습니다.');
    }
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalContainer>
      <ModalBody ref={modalRef}>
        <ModalHeader>
          <ModalTitle>수정 요청</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <StyledInputBox
            type='text'
            name='devTerm'
            labelText={<LabelWithTooltip />} // 수정된 부분
            input={formData.devTerm}
            setInput={setFormData}
            valid={helperText.devTermHelper ? false : true}
            helperText={helperText.devTermHelper}
            className={'Box'}
            placeholder='개발 용어를 입력해주세요.'
            disabled
            readOnly
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
            placeholder='일반적으로 쓰이는 발음을 입력해주세요.'
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
            placeholder='어색한 발음을 입력해주세요.'
          />
          <Item>
            <Label>추가정보</Label>
            <TextArea
              name='addInfo'
              value={formData.addInfo}
              onChange={handleChange}
              valid={helperText.addInfoHelper ? false : true} // 유효성 검사 결과에 따라 valid prop 설정추가
              placeholder='추가 정보를 입력해주세요.'
            />
            <HelperText>{helperText.addInfoHelper}</HelperText>
          </Item>
        </ModalContent>
        <ModalFooter>
          <ButtonGroup>
            <ModalButton $isClose onClick={onClose}>
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
    ${(props) =>
    props.name === 'devTerm' &&
    `
      &:hover {
          border-color: var(--secondary); // 호버 시 색상 변경 안함
      }
      &:focus {
          border-color: var(--secondary); // 포커스 시 색상 변경 안함
          outline: none;
      }
  `}
  }
  Label {
    width: 498px;
    font-size: 15px;
    font-weight: 600;
    line-height: 22.5px;
    letter-spacing: -0.03em;
    text-align: left;
    position: relative;
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
  resize: none;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ModalButton = styled.button`
  width: 88px;
  height: 40px;
  border: none;
  border-radius: 30px;
  padding: 8px 30px;
  color: #fff;
  cursor: ${(props) => (props.$isClose || props.$active ? 'pointer' : 'not-allowed')}; // 프리픽스 적용
  background-color: ${(props) =>
    props.$isClose
      ? 'rgba(0, 0, 0, 0.25)' // 프리픽스 적용
      : props.$active
        ? 'var(--primary)'
        : 'var(--primary60)'}; // 프리픽스 적용
  &:hover {
    box-shadow: ${(props) =>
    props.$isClose
      ? '0px 2px 4px 0px #00000026' // 프리픽스 적용
      : props.$active
        ? '0px 2px 6px 0px #3C8BFF99' // 프리픽스 적용
        : 'none'};
  }
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #ff0808;
  margin-top: 4px;
`;
