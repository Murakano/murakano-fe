import React from 'react';
import styled from 'styled-components';

// Styled component 정의
const ResultContent = styled.span`
  width: 600px;
  height: 20px;
  font-size: 13px;
  font-weight: 300;
  text-align: left;
`;

export default function ResultContentComponent({ children, ...props }) {
  return <ResultContent {...props}>{children}</ResultContent>;
}
