import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';

import useAuthStore from '@/store/useAuthStore';
import api from '@/utils/api';

import styled from 'styled-components';

function UserDeleteModal({ onClose }) {
  const { clearAuthData } = useAuthStore();
  const router = useRouter();
  const modalRef = useRef();

  //외부 클릭 모달창 닫기
  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  const clickUserDelete = async () => {
    const response = await api.delete('/users');
    console.log(response);
    onClose();
    if (response.message == '회원 탈퇴 성공') {
      alert('회원탈퇴가 완료되었습니다.');
      await clearAuthData();
      router.push('/auth/register');
      return;
    }
    alert('회원탈퇴중 오류가 발생했습니다.');
  };

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
          <ModalTitle>회원 탈퇴</ModalTitle>
        </ModalHeader>
        <ModalContent>
          {/* 머라카노를 탈퇴하면, */}
          <ModalUl>
            <ModalLi>머라카노를 탈퇴하면, 내 요청목록을 조회할 수 없습니다.</ModalLi>
            {/* <ModalLi>내 요청목록을 조회할 수 없습니다.</ModalLi> */}
            <ModalLi>삭제된 모든 정보는 복구할 수 없습니다.</ModalLi>
            <ModalLi>모든 데이터와 활동 이력이 즉시 삭제됩니다.</ModalLi>
            <ModalLi>정말 탈퇴하시겠습니까?</ModalLi>
          </ModalUl>
        </ModalContent>
        <ModalFooter>
          <ButtonGroup>
            <ModalButton onClick={onClose} $isClose={true}>
              닫기
            </ModalButton>
            <ModalButton onClick={clickUserDelete} $isClose={false}>
              탈퇴
            </ModalButton>
          </ButtonGroup>
        </ModalFooter>
      </ModalBody>
    </ModalContainer>
  );
}

export default UserDeleteModal;

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
  height: 360px;
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
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 17px;
`;

const ModalButton = styled.button`
  width: 88px;
  height: 40px;
  border: none;
  border-radius: 30px;
  padding: 8px 30px;
  color: #fff;
  background-color: ${(props) => (props.$isClose === true ? 'rgba(0, 0, 0, 0.25)' : 'var(--primary)')};
  &:hover {
    box-shadow: ${(props) => (props.$isClose === true ? '0px 2px 4px 0px #00000026' : '0px 2px 6px 0px #3C8BFF99')};
  }
`;

const ModalUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const ModalLi = styled.li`
  font-size: 15px;
  gap: 10px;
  font-weight: 600;
`;
