import React from 'react';
import styled from 'styled-components';

// Styled component 정의
const StyledResultContent = styled.span`
  width: 600px;
  height: 20px;
  gap: 0px;
  opacity: 0px;
  font-size: 13px;
  font-weight: 300;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  text-align: left;
`;

const ResultContentComponent = ({ text }) => {
  return <StyledResultContent>{text}</StyledResultContent>;
};

export default ResultContentComponent;