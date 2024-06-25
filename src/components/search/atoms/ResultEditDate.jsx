// src/components/search/atoms/ResultEditDate.jsx

import React from 'react';
import styled from 'styled-components';

const ResultEditDate = () => {
  return (
    <Container>
      <Text>
        마지막 수정 일자: 24.06.22
      </Text>
    </Container>
  );
};

const Container = styled.div`
  width: 320.5px;
  height: 29px;
  padding: 10px 0;
  gap: 10px;
  transform: rotate(0.31deg);
  
`;

const Text = styled.div`
  width: 121px;
  height: 18px;
  gap: 0;
  font-size: 12px;
  font-weight: 200;
  line-height: 18px;
  letter-spacing: -0.03em;
  text-align: right;
  margin-left;
`;

export default ResultEditDate;