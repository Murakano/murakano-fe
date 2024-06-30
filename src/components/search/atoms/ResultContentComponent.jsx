import React from 'react';
import styled from 'styled-components';

// Styled component 정의
const StyledResultContent = styled.span`
  width: 600px;
  height: 20px;
  font-size: 13px;
  font-weight: 300;
  text-align: left;
`;

const ResultContentComponent = ({ text }) => {
  return <StyledResultContent>{text}</StyledResultContent>;
};

export default ResultContentComponent;