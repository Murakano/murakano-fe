import React from 'react';
import styled from 'styled-components';
import BadBox from '../molecules/BadBox';

export default function ResultBoxIntegration() {
    return (
      <Container>
          <BadBox />
      </Container>
    );
  }

  const Container = styled.div`
  width: 691px;
  height: 290px;
`;