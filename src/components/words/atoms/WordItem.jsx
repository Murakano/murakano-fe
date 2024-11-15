// src/components/words/atoms/WordItem.js
import React from 'react';
import styled from 'styled-components';
import WordListIcon from '/public/murak_list_icon.svg';

// 전체 단어 목록
export default function WordItem({ name, pron }) {
  return (
    <ListContainer>
      <ListInnerContainer>
        <WordContents>
          <WordName>
            <div>{name}</div>
          </WordName>
          <WordPron>
            <div>{pron}</div>
          </WordPron>
        </WordContents>
        <WordListIconContainer>
          <WordListIconDiv>
            <WordListIcon />
          </WordListIconDiv>
        </WordListIconContainer>
      </ListInnerContainer>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 691px;
  height: 99px;
  padding: 10.5px 36px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);

  &:hover {
    background: var(--secondary10);
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ListInnerContainer = styled.div`
  display: inline-block;
  width: 617px;
  height: 79px;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const WordContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: -5px;
  width: auto;
  height: 79px;
  gap: 10px;
`;

const WordName = styled.div`
  height: 17px;
  width: 580px;
  margin: 5px 0 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const WordPron = styled.div`
  height: 20px;
  width: 580px;
  font-size: 13px;
  font-weight: 300;
  line-height: 19.5px;
  letter-spacing: -0.03em;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const WordListIconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 24px;
  height: 44px;
  margin: 17.5px 10px 17.5px 0;
  padding: 10px 0;
  position: relative;
  top: -88px;
  left: 590px;
  @media (max-width: 600px) {
    margin: 0;
    top: -70px;
    left: 90%;
  }
`;

const WordListIconDiv = styled.div`
  width: 24px;
  height: 24px;
  margin: 10px 0;
`;
