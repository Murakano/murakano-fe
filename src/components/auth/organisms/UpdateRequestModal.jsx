import styled from 'styled-components';
import { useEffect, useRef, useState, useCallback } from 'react';

import InputBox from '@/components/common/molecules/InputBox';
import { HELPER_TEXT } from '@/constants/helperText';

import { validateLength, validateDevTerm } from '@/utils/validate';
import { updateState } from '@/utils/stateUtils';
import api from '@/utils/api';

//useRef -> 모달 본체 (modalbody) 참조, 클릭이벤트가 모달 내부인지 외부인지 확인
export default function Modal({ onClose, requestData, userRole, refreshRequests }) {
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    devTerm: requestData ? requestData.word : '',
    commonPron: requestData ? requestData.compron : '',
    awkPron: requestData ? requestData.awkpron : '',
    addInfo: requestData ? requestData.addinfo : '',
  });

  const [helperText, setHelperText] = useState({
    devTermHelper: '',
    commonPronHelper: '',
    awkPronHelper: '',
    addInfoHelper: '',
  });

  const [buttonActive, setButtonActive] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState(false);
  const [rejectRequest, setRejectRequest] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isRequestCompleted = requestData.status === 'app' || requestData.status === 'rej';

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'devTerm' || isRequestCompleted) return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (isRequestCompleted) return;
    
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

    if (formData.commonPron && !validateLength(formData.commonPron, 100)) {
      updateState('commonPronHelper', HELPER_TEXT.EXCEED_LENGTH(100), setHelperText);
      hasError = true;
    } else {
      updateState('commonPronHelper', '', setHelperText);
    }

    if (formData.awkPron && !validateLength(formData.awkPron, 100)) {
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

    setHasError(hasError);
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
    console.log("hasError", hasError)
    if (hasError) {
      return;
    }

    try {
      if (userRole === 'admin') {
        console.log("변경하려는 요청의 userid", requestData)

        const response = await api.post(`/users/requests/${requestData._id}/status`, { status: 'app', formData, requestType: 'mod' });
        if (response.message === '요청 상태 변경 성공') {
          onClose();
          refreshRequests();
          alert("승인되었습니다!");
        }
      } else {
        const response = await api.post(`/users/requests/${requestData._id}`, { formData });

        if (response.message === '요청 수정 성공') {
          onClose();
          refreshRequests();
          alert("수정되었습니다!");
        }
      }
    } catch (error) {
      console.error('처리 중 오류 발생:', error);
      alert('처리 중 오류가 발생했습니다.');
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //삭제버튼 클릭 및 반려버튼
  useEffect(() => {
    if (!deleteRequest && !rejectRequest) return;

    const handleDelete = async () => {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
      if (!confirmDelete) {
        setDeleteRequest(false);
        return;
      }

      try {
        const response = await api.delete(`/users/requests/${requestData.word}`);
        
        console.log("프론트 삭제 response", response.message)

        if (response.message === '요청 삭제 성공') {
          onClose();
          refreshRequests();
          alert("삭제됐습니다");
        }


      } catch (error) {
        console.error("삭제 중 오류 발생:", error);

      } finally {
        setDeleteRequest(false);
      }
    };
    //반려
    const handleReject = async () => {
      const confirmReject = window.confirm("정말 반려하시겠습니까?");
      if (!confirmReject) {
        setRejectRequest(false);
        return;
      }

      try {
        const response = await api.post(`/users/requests/${requestData._id}/status`, { status: 'rej' });

        if (response.message === '요청 상태 변경 성공') {
          onClose();
          refreshRequests();
          alert("반려되었습니다");
        }

      } catch (error) {
        console.error("반려 중 오류 발생:", error);
        alert('반려 중 오류가 발생했습니다.');
      } finally {
        setRejectRequest(false);
      }
    };

    if (deleteRequest) {
      handleDelete();
    } else if (rejectRequest) {
      handleReject();
    }
    
  }, [deleteRequest, rejectRequest, onClose, requestData.word, refreshRequests]);
  

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
            labelText='개발 용어 (영어)'
            input={formData.devTerm}
            setInput={setFormData}
            valid={helperText.devTermHelper ? false : true}
            helperText={helperText.devTermHelper}
            className={'Box'}
            disabled={userRole !== 'admin'} // admin이 아닐 때 disabled
            readOnly={userRole !== 'admin'}
            onBlur={handleBlur}
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
            readOnly = {isRequestCompleted}
            $isRequestCompleted={isRequestCompleted} // 상태 전달
            onBlur={handleBlur}
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
            readOnly = {isRequestCompleted}
            $isRequestCompleted={isRequestCompleted} // 상태 전달
            onBlur={handleBlur}
          />
          <Item>
            <Label>추가정보</Label>
            <TextArea
              name='addInfo'
              value={formData.addInfo}
              onChange={handleChange}
              valid={helperText.addInfoHelper ? false : true} // 유효성 검사 결과에 따라 valid prop 설정추가
              disabled = {isRequestCompleted}
              $isRequestCompleted={isRequestCompleted} // 상태 전달
              onBlur={handleBlur}
            />
            <HelperText>{helperText.addInfoHelper}</HelperText>
          </Item>
        </ModalContent>
        <ModalFooter>
          <ButtonGroup>
            <ModalButton $isClose onClick={onClose}>
              닫기
            </ModalButton>
            {userRole === 'admin' ? (
              <>
                <ModalButton onClick={() => setRejectRequest(true)} disabled={isRequestCompleted}>
                  반려
                </ModalButton>
                <ModalButton onClick={handleSubmit} $active={buttonActive} disabled={isRequestCompleted}>
                  승인
                </ModalButton>
              </>
            ) : (
              <>
                <ModalButton onClick={() => setDeleteRequest(true)}>
                  삭제
                </ModalButton>
                <ModalButton onClick={handleSubmit} $active={buttonActive} disabled={isRequestCompleted}>
                  수정
                </ModalButton>
              </>
            )}
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
  ${(props) =>
      props.$isRequestCompleted &&
      `
      &:hover {
          border-color: var(--secondary); // 상태가 'rej' 또는 'app'이면 호버 시 색상 변경 안함
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
    &::after {
      content: ${(props) => (props.name === 'devTerm' || props.name === 'commonPron' ? "' *'" : "''")};
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
  border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--secondary)')};
  border-radius: 10px;
  padding: 20px;
  &:focus {
    border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--primary)')};
    outline: none;
  }
  &:hover {
    border-color: ${(props) => (!props.valid ? '#ff0808' : 'var(--primary)')};
  }
  resize: none;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  ${(props) =>
      props.$isRequestCompleted &&
      `
      &:hover {
          border-color: var(--secondary); // 상태가 'rej' 또는 'app'이면 호버 시 색상 변경 안함
      }
      &:focus {
        border-color: var(--secondary); // 포커스 시 색상 변경 안함
        outline: none;
      }
  `}
`;

const ModalButton = styled.button`
  width: 88px;
  height: 40px;
  border: none;
  border-radius: 30px;
  padding: 8px 30px;
  color: #fff;
  cursor: ${(props) => (props.$isClose || props.$active ? 'pointer' : 'not-allowed')};
  background-color: ${(props) =>
    props.$isClose ? 'rgba(0, 0, 0, 0.25)' :
    props.$active && !props.disabled ? 'var(--primary)' : 'var(--primary60)'};
  &:hover {
    box-shadow: ${(props) =>
      props.$isClose ? '0px 2px 4px 0px #00000026' :
      props.$active ? '0px 2px 6px 0px #3C8BFF99' :'none'};
    ${(props) =>
      props.disabled &&`box-shadow: none;`}
  }
  &:nth-child(2) {
    background: #FF6B8F;
    cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
    &:hover {
      box-shadow: ${(props) => (!props.disabled ? '0px 2px 8px 0px #FF080899' : 'none')};
      background: ${(props) => (!props.disabled ? '#FF002E' : '#FF6B8F')};
    }
    ${(props) =>
      props.disabled &&`box-shadow: none;`}
  }
  
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #ff0808;
  margin-top: 4px;
`;