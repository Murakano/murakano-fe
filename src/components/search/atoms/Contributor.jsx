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
  width: 110px;
  height: 20px;
  font-size: 13px;
  letter-spacing: -0.03em;
  margin-right: auto;
`;

const StyledContainer = styled.div`
  justify-content: flex-end;
`;

export default Contributor;
