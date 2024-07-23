import React from 'react';
import styled from 'styled-components';
import ResultCategory from '../atoms/ResultCategory';
import ResultEditDate from '../atoms/ResultEditDate';

export default function CategoryDate({ searchResult }) {
  return (
    <Container>
      <ResultCategory />
      <ResultEditDate searchResult={searchResult} />
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
  @media (max-width: 600px) {
    /* max-width: 350px;
    width: 100%;
    padding: 0; */
    display: none;
  }
`;
