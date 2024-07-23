import { Container } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Contributor = ({ searchResult }) => {
  return (
    <StyledContainer>
      <Text>기여자: {searchResult.suggestedBy}</Text>
    </StyledContainer>
  );
};

const Text = styled.div`
  width: auto;
  height: 20px;
  font-size: 13px;
  margin-right: auto;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const StyledContainer = styled.div`
  justify-content: flex-end;
`;

export default Contributor;
