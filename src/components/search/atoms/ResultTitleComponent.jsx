import React from 'react';
import styled from 'styled-components';

// Styled component 정의
const ResultTitle = styled.span`
  width: 600px;
  height: 23px;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  display: flex;
  align-items: center; // 텍스트 수직 정렬
`;

export default function ResultTitleComponent({ children, ...props }) {
  return <ResultTitle {...props}>{children}</ResultTitle>;
}