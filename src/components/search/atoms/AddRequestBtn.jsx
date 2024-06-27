import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '@/components/search/organisms/AddModal'; // 모달 컴포넌트 경로를 맞게 수정하세요.

const AddRequestBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledContainer>
        <CenteredContainer>
          <Button onClick={handleOpenModal}>
            등록 요청하기
          </Button>
        </CenteredContainer>
      </StyledContainer>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

const Button = styled.button`
  width: 110px;
  height: 40px;
  border-radius: 30px;
  border: none;
  background-color: #3C8BFF99;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.03em;
  text-align: center;
  cursor: pointer;
`;

const StyledContainer = styled.div`
  width: 691px;
  height: 61px;
  margin: 30px 44.5px 136.04px 44.5px;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  height: 100%;
`;

export default AddRequestBtn;
