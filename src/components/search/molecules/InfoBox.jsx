import React from 'react';
import styled from 'styled-components';
import ResultTitleComponent from "@/components/search/atoms/ResultTitleComponent";
import ResultContentComponent from "@/components/search/atoms/ResultContentComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 691px;
  height: 90px;
  padding: 10px 30px 10px 30px;
  border-radius: 30px 30px 30px 30px;
  border: 0px solid transparent;
  border-bottom-width: 1px;
  background: #B8D5FF1A;
`;

export default function InfoBox() {
    return (
        <Container>
            <ResultTitleComponent text="추가 정보" />
            <ResultContentComponent text="일반적인 발음" />
        </Container>
    );
}