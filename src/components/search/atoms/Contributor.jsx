import { Container } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Contributor = () => {
    return (
      <>
      <Container>
        <Text>
          기여자: 행복한 토마토
        </Text>
        </Container>
      </>
    );
  };

  const Text = styled.div`
  width: 110px;
  height: 20px;
  gap: 0px;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  letter-spacing: -0.03em;
  margin-right;
`;


export default Contributor;