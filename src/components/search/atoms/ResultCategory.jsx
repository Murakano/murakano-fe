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
  border-bottom: 1px solid #CCC;
`;

const Text = styled.div`
  width: 182px;
  height: 18px;
  font-size: 12px;
  margin-right: auto;
`;

export default ResultCategory;