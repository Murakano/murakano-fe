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
  width: 447px;
  height: 86px;
  padding: 20px 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 166.5px 10px 166.5px;
`;

const PageName = styled.div`
  width: 275.03px;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;
