import React from 'react';
import styled from 'styled-components';
import WordItem from '../atoms/WordItem';

export default function WordList({ words = [], handleWordClick, lastWordElementRef }) {
  return (
    <WordListContainer>
      {words.map((word, index) => (
        <WordListDiv
          key={word._id || index}
          onClick={() => handleWordClick(word.word)}
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
  height: auto;
  padding: 10px 44.5px;
`;

const WordListDiv = styled.div`
  width: 691px;
  height: auto;
`;
