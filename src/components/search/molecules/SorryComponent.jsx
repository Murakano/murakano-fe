import React, { useState } from 'react';
import styled from 'styled-components';
import SorryText from '../atoms/SorryText';
import Modal from '@/components/auth/organisms/Modal';
import ActionBtn from '@/components/common/atoms/ActionBtn';

const SorryComponent = ({ query }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <StyledContainer>
      <SorryText query={query} />
      <AddRequestBtn onClick={handleOpenModal}>등록 요청</AddRequestBtn>
      {isModalOpen && <Modal onClose={handleCloseModal} />}

    </StyledContainer>
  );
};

const AddRequestBtn = styled(ActionBtn)`
  background-color: var(--primary60);
  &:hover {
        background-color: var(--primary);
       }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  width: 780px;
  height: 508px;
  margin: 0px 330px 386px 330px;
`;

export default SorryComponent;
