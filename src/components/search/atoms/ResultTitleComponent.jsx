import React from 'react';
import styled from 'styled-components';

// Styled component 정의
const StyledResultTitle = styled.span`
  width: 600px;
  height: 23px;
  gap: 0px;
  opacity: 0px;
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  text-align: left;
`;

const ResultTitleComponent = ({ text }) => {
  return <StyledResultTitle>{text}</StyledResultTitle>;
};

export default ResultTitleComponent;