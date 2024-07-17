import React, { useState } from 'react';
import styled from 'styled-components';
import EditRequestModal from '@/components/search/organisms/EditRequestModal';
import ActionBtn from '@/components/common/atoms/ActionBtn';
import useAuthStore from '@/store/useAuthStore'; // 수정: useAuthStore를 임포트하여 사용

const ResultEditBtn = ({ searchResult }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => !!state.accessToken); // 수정: 로그인 상태를 가져옴

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      // 수정: 로그인 여부 확인
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <EditRequestBtn onClick={handleOpenModal}>수정 요청</EditRequestBtn>
      {isModalOpen && <EditRequestModal onClose={handleCloseModal} searchResult={searchResult} />}
    </>
  );
};

const EditRequestBtn = styled(ActionBtn)`
  background-color: var(--primary60);
  &:hover {
    background-color: var(--primary);
  }
`;

export default ResultEditBtn;
