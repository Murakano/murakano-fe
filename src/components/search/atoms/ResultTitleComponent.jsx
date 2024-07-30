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
  padding-top: 3px;
  @media (max-width: 600px) {
    width: 100%; // 반응형 정렬 수정
    font-size: 12px;
  }
`;

export default function ResultTitleComponent({ children, ...props }) {
  return <ResultTitle {...props}>{children}</ResultTitle>;
}
