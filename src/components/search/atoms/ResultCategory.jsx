// src/components/search/atoms/ResultCategory.jsx

import React from 'react';
import styled from 'styled-components';

const ResultCategory = () => {
  return (
    <Container>
      <Text>
        카테고리: HTML, 브라우저
      </Text>
    </Container>
  );
};

const Container = styled.div`
  width: 127px;
  height: 29px;
  padding: 10px 0;
  gap: 10px;
  border-bottom: 1px solid #CCCCCC;
`;

const Text = styled.div`
  width: 182px;
  height: 18px;
  gap: 0px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.03em;
  margin-right: auto;
`;

export default ResultCategory;