import styled from 'styled-components';
import React from 'react';
import VectorIcon from '/public/Vector.svg';

export default function TopScrollBtn() {
  // 스크롤 상단으로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BtnContainer onClick={scrollToTop}>
      <BtnDiv>
        <ArrowDirectionContainer>
          <ArrowDirectionDiv>
            <VectorIcon />
          </ArrowDirectionDiv>
        </ArrowDirectionContainer>
      </BtnDiv>
    </BtnContainer>
  );
}

const BtnContainer = styled.div`
  width: 40px;
  height: 40px;
  padding : 10px
  gap: 10px;
  align-items: right;
  justify-content: right;
`;

const BtnDiv = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid #cccccc;
  padding: 7px;
  cursor: pointer;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0px 2px 4px 0px #00000040;
  }
`;

const ArrowDirectionContainer = styled.div`
  width: 26px;
  height: 26px;
  padding: 6.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowDirectionDiv = styled(VectorIcon)`
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
