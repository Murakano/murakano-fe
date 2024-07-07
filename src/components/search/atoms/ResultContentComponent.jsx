import React from 'react';
import styled from 'styled-components';

// Styled component 정의
const ResultContent = styled.span`
  width: 600px;
  height: ${({ children }) => (children ? 'auto' : '20px')};
  font-size: 13px;
  padding: 3.5px 0;
  font-weight: 300;
  line-height: 150%;
  text-align: left;
  display: flex;
  align-items: center; // 텍스트 수직 정렬
`;

export default function ResultContentComponent({ children, ...props }) {
  return <ResultContent {...props}>{children}</ResultContent>;
}
