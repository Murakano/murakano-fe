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
`;

export default ResultCategory;
