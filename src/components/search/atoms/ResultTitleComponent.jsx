import React from 'react';
import styled from 'styled-components';

// Styled component 정의
const StyledResultTitle = styled.div`
  width: 600px;
  height: 23px;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
`;

const ResultTitleComponent = ({ text }) => {
  return <StyledResultTitle>{text}</StyledResultTitle>;
};

export default ResultTitleComponent;