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
        <WordListIconDiv>
          <WordListIcon />
        </WordListIconDiv>
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
`;

const ListInnerContainer = styled.div`
  display: inline-block;
  width: 617px;
  height: 79px;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
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
  margin: 5px 0 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: -0.03em;
`;

const WordPron = styled.div`
  height: 20px;
  font-size: 13px;
  font-weight: 300;
  line-height: 19.5px;
  letter-spacing: -0.03em;
`;

const WordListIconDiv = styled.div`
  width: 24px;
  height: 44px;
  margin: 17.5px 10px 17.5px 0;
  padding: 10px 0;
  position: relative;
  top: -80px;
  left: 590px;
`;
