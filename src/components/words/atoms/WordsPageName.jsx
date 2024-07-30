import React from 'react';
import styled from 'styled-components';
import router from 'next/router';

export default function WordsPageName() {
  const redirectToWords = () => {
    router.reload();
  };

  return (
    <NameContainer>
      <PageName onClick={redirectToWords}>전체 단어 목록</PageName>
    </NameContainer>
  );
}

const NameContainer = styled.div`
  width: 100%;
  height: 86px;
  padding: 20px 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 166.5px 10px 166.5px;
  @media (max-width: 600px) {
    margin: 0;
    padding: 20px 0 10px;
    height: 70px;
  }
`;

const PageName = styled.div`
  min-width: 115px;
  width: auto;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
