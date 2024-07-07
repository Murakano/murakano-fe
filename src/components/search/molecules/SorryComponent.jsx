import React, { useState } from 'react';
import styled from 'styled-components';
import SorryText from '../atoms/SorryText';
import AddRequestModal from '@/components/search/organisms/AddRequestModal';
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
      {isModalOpen && <AddRequestModal onClose={handleCloseModal} />}
    </StyledContainer>
  );
  z;
};

const AddRequestBtn = styled(ActionBtn)`
  background-color: var(--primary60);
  margin-top: 71px;
  height: 40px;
  &:hover {
    background-color: var(--primary);
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  text-align: center;
  width: 780px;
  padding: 96px 0;
`;

export default SorryComponent;
