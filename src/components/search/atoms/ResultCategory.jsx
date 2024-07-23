// src/components/search/atoms/ResultCategory.jsx

import React from 'react';
import styled from 'styled-components';

const ResultCategory = () => {
  return (
    <Container>
      <Text>카테고리: 개발</Text>
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: 29px;
  padding: 10px 0;
  gap: 10px;
`;

const Text = styled.div`
  width: auto;
  height: 18px;
  font-size: 12px;
  margin-right: auto;
  border-bottom: 1px solid #ccc;
  white-space: nowrap; // 텍스트가 한 줄로 유지되도록 함
`;

export default ResultCategory;
