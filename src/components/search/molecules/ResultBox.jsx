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
  padding: 10px 30px;
  margin-bottom: 10px;
  border-radius: 30px;
  background: #B8D5FF1A;
`;

const StyledContainer = styled.div`
width: 691px;
height: 290px;
`;

export default function ResultBox() {
    return (
        <StyledContainer>
            <Container>
                <ResultTitleComponent>일반적인 발음</ResultTitleComponent>
                <ResultContentComponent>일반적인 발음에 대한 내용</ResultContentComponent>
            </Container>
            <Container>
                <ResultTitleComponent>어색한 발음</ResultTitleComponent>
                <ResultContentComponent>어색한 발음에 대한 내용</ResultContentComponent>
            </Container>
            <Container>
                <ResultTitleComponent>추가 정보</ResultTitleComponent>
                <ResultContentComponent>추가 정보에 대한 내용</ResultContentComponent>
            </Container>
        </StyledContainer>
    );
}