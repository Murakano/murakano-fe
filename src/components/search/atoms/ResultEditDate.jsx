// src/components/search/atoms/ResultEditDate.jsx
import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../../utils/formatDate';

const ResultEditDate = ({ searchResult }) => {
  const formattedDate = formatDate(searchResult.updatedAt);

  return (
    <Container>
      <Text>마지막 수정 일자: {formattedDate}</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 320.5px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: 200;
  line-height: 18px;
  letter-spacing: -0.03em;
  text-align: center;
  white-space: nowrap;
`;

export default ResultEditDate;
