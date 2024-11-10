import React from 'react';
import styled from 'styled-components';
import WordItem from '../atoms/WordItem';

export default function WordList({ words = [], handleWordClick, lastWordElementRef }) {
  return (
    <WordListContainer>
      {words.map((word, index) => (
        <WordListDiv
          key={`${word._id}-${index}`} // 고유한 키 생성
          onClick={() => handleWordClick(word.word)} // 인덱스를 전달
          ref={words.length === index + 1 ? lastWordElementRef : null}
        >
          <WordItem name={word.word} pron={word.comPron} />
        </WordListDiv>
      ))}
    </WordListContainer>
  );
}

const WordListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 780px;
  height: 100%;
  padding: 10px 44.5px;
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 0;
  }
`;

const WordListDiv = styled.div`
  width: 691px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
