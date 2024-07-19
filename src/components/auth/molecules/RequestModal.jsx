import styled from 'styled-components';
import { useRef, useCallback, useEffect } from 'react';
import ModalTitle from '@/components/auth/atoms/ModalTitle';
import ModalInputBox from '@/components/auth/molecules/ModalInputBox';
import ModalButton from '@/components/auth/atoms/ModalButton';

const RequestModal = ({ title, onClose, requestData = {}, userRole, refreshRequests, inputFieldConfigs, formData, helperText, handleBlur, handleChange, setFormData, isRequestCompleted, handleSubmit, buttonActive, setRejectRequest, setDeleteRequest, customButtons }) => {
    const modalRef = useRef();

  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden'; // 모달이 열릴 때 스크롤 막기

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // 모달이 닫힐 때 스크롤 허용
    };
  }, [handleClickOutside]);

    return (
        <ModalContainer>
            <ModalBody ref={modalRef}>
                <ModalHeader>
                    <ModalTitle title={title} />
                </ModalHeader>
                <ModalContent>
                    {inputFieldConfigs.map((config, index) => (
                        <ModalInputBox
                            key={index}
                            type="text"
                            name={config.name}
                            labelText={config.labelText}
                            input={formData[config.name]}
                            setInput={setFormData}
                            valid={!helperText[`${config.name}Helper`]}
                            helperText={helperText[`${config.name}Helper`]}
                            readOnly={isRequestCompleted || (config.name === 'devTerm' && requestData.type === 'mod'&& userRole !== 'admin')}
                            disabled={isRequestCompleted || (config.name === 'devTerm' && requestData.type === 'mod' && userRole !== 'admin')}
                            onBlur={(e) => handleBlur(e, isRequestCompleted)}
                            $isRequestCompleted={isRequestCompleted}
                            requestType={requestData.type}
                        />
                    ))}
                    <Item>
                        <Label>추가정보</Label>
                        <TextArea
                            name="addInfo"
                            value={formData.addInfo}
                            onChange={handleChange}
                            valid={helperText.addInfoHelper ? false : true}
                            disabled={isRequestCompleted}
                            $isRequestCompleted={isRequestCompleted}
                            onBlur={(e) => handleBlur(e, isRequestCompleted)}
                        />
                        <HelperText>{helperText.addInfoHelper}</HelperText>
                    </Item>
                </ModalContent>
                <ModalFooter>
                  {userRole === 'admin' && (
                      <AdminInfo>
                        <Label>작성자: {requestData.suggestedBy}</Label>
                      </AdminInfo>
                    )}
                    <ButtonGroup>
                        <ModalButton isClose onClick={onClose}>
                            닫기
                        </ModalButton>
                        { customButtons ? customButtons : (
                                userRole === 'admin' ? (
                                <>
                                    <ModalButton onClick={() => setRejectRequest(true)} disabled={isRequestCompleted}>
                                        반려
                                    </ModalButton>
                                    <ModalButton onClick={handleSubmit} active={buttonActive} disabled={isRequestCompleted}>
                                        승인
                                    </ModalButton>
                                </>
                            ) : (
                                <>
                                    <ModalButton onClick={() => setDeleteRequest(true)}>삭제</ModalButton>
                                    {!isRequestCompleted && (
                                        <ModalButton onClick={handleSubmit} active={buttonActive}>
                                            수정
                                        </ModalButton>
                                    )}
                                </>
                            )
                        )}
                    </ButtonGroup>
                </ModalFooter>
            </ModalBody>
        </ModalContainer>
    );
};

export default RequestModal;

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

const ModalContent = styled.section`
  padding: 10px 31px;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  height: 600px;
  overflow: hidden;
`;

const ModalFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 31px;
  height: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-left: auto;
`;

const Item = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-bottom: 31.5px;
  position: relative;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  text-align: left;
  position: relative;
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
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${(props) =>
    props.$isRequestCompleted &&
    `
        &:hover {
            border-color: var(--secondary);
        }
        &:focus {
            border-color: var(--secondary);
            outline: none;
        }
    `}
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #ff0808;
  margin-top: 4px;
`;

const AdminInfo = styled.div`
  font-size: 16px;
  font-weight: 100;
  color: #666666;
  margin-top: 10px;
`;