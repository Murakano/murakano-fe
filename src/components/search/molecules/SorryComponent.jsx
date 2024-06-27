import React from 'react';
import styled from 'styled-components';
import SorryText from '../atoms/SorryText';
import AddRequestBtn from '../atoms/AddRequestBtn';

const SorryComponent = ({ query }) => {
  return (
    <StyledContainer>
      <SorryText query={query} />
      <AddRequestBtn />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: blue;
  width: 780px;
  height: 508px;
  margin: 0px 330px 386px; 330px;
`;

export default SorryComponent;
