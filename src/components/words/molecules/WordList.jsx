import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import WordItem from '../atoms/WordItem';
import { useRouter } from 'next/router';

const wordDirectory = [
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
  { name: 'PostgreSQL', pron: '포스트그래스, 포스트그래스큐엘' },
  { name: 'GUI', pron: '구이' },
  { name: 'deno', pron: '디노' },
  { name: 'nginx', pron: '엔진엑스' },
  { name: 'sudo', pron: '수두' },
  { name: 'qt', pron: '큣' },
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
  { name: 'PostgreSQL', pron: '포스트그래스, 포스트그래스큐엘' },
  { name: 'GUI', pron: '구이' },
  { name: 'deno', pron: '디노' },
  { name: 'nginx', pron: '엔진엑스' },
  { name: 'sudo', pron: '수두' },
  { name: 'qt', pron: '큣' },
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
  { name: 'PostgreSQL', pron: '포스트그래스, 포스트그래스큐엘' },
  { name: 'GUI', pron: '구이' },
  { name: 'deno', pron: '디노' },
  { name: 'nginx', pron: '엔진엑스' },
  { name: 'sudo', pron: '수두' },
  { name: 'qt', pron: '큣' },
];

// 로컬 스토리지에 스크롤 저장 & 호출
const saveScrollPosition = () => {
  localStorage.setItem('scrollPosition', window.scrollY);
};

const loadScrollPosition = () => {
  return parseInt(localStorage.getItem('scrollPosition'), 10) || 0;
};

export default function WordList() {
  const router = useRouter();
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(0);
  const observer = useRef();

  // 단어 목록 클릭 시 해당 단어 상세 페이지로 이동
  const handleWordClick = (name) => {
    if (name) {
      router.push(`/search/${name}`);
    }
  };

  const lastWordElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [page]
  );

  useEffect(() => {
    const newWords = wordDirectory.slice(page * 10, (page + 1) * 10);
    setWords((prev) => [...prev, ...newWords]);
  }, [page]);

  useEffect(() => {
    // 초기 단어 호출
    if (words.length === 0) {
      const newWords = wordDirectory.slice(0, 10);
      setWords(newWords);
    }

    // 스크롤 위치 복구
    window.scrollTo(0, loadScrollPosition());

    return () => {
      saveScrollPosition();
    };
  }, []);

  return (
    <WordListContainer>
      {wordDirectory.map((word, index) => (
        <WordListDiv
          key={index}
          ref={index === words.length - 1 ? lastWordElementRef : null}
          onClick={() => handleWordClick(word.name)}
        >
          <WordItem name={word.name} pron={word.pron} />
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
