import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from "@/components/search/organisms/EditModal"; 

const ResultEditBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>
        수정 요청하기
      </Button>
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
  cursor: pointer;
`;

export default ResultEditBtn;
