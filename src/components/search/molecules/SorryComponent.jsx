import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SorryText from '../atoms/SorryText';
import AddRequestModal from '@/components/search/organisms/AddRequestModal';
import ActionBtn from '@/components/common/atoms/ActionBtn';

const SorryComponent = ({ query }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValidQuery, setIsValidQuery] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const checkIsValidQuery = (query) => {
      // 한글을 포함한 정규식 패턴
      const koreanPattern = /[가-힣]/;
      console.log(query);
      // 쿼리가 undefined인지 또는 한글을 포함하는지 확인
      if (!query || koreanPattern.test(query)) {
          return setIsValidQuery(false);
      }
      
      return setIsValidQuery(true);
    }
    checkIsValidQuery(query);
  }, [query])

  return (
    <StyledContainer>
      <SorryText query={query} />
      {isValidQuery ? <AddRequestBtn onClick={handleOpenModal}>등록 요청</AddRequestBtn> : null}
      {isModalOpen && <AddRequestModal onClose={handleCloseModal} query={query}/>}
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
  width: 780px;
  padding: 96px 0;
`;

export default SorryComponent;
