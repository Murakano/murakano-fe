import React from 'react';
import styled from 'styled-components';
import ResultCategory from '../atoms/ResultCategory';
import ResultEditDate from '../atoms/ResultEditDate';

export default function CategoryDate() {
    return (
      <Container>
          <ResultCategory />
          <ResultEditDate />
      </Container>
    );
  }

const Container = styled.div`
  width: 782px;
  height: 30.71px;
  padding: 0px 51.5px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


