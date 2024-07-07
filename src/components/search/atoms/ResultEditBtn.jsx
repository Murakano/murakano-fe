import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from "@/components/auth/organisms/RegisterRequestModal";
import ActionBtn from '@/components/common/atoms/ActionBtn'; 

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
      <AddRequestBtn onClick={handleOpenModal}>수정 요청</AddRequestBtn>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

const AddRequestBtn = styled(ActionBtn)`
  background-color: var(--primary60);
  &:hover {
        background-color: var(--primary);
       }
`;

export default ResultEditBtn;
