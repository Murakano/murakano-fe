import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import WordItem from '../atoms/WordItem';
import { useRouter } from 'next/router';
import TopScrollBtn from '@/components/common/atoms/TopScrollBtn';

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

// 스크롤 위치를 로컬 스토리지에 저장
const saveScrollPosition = () => {
  localStorage.setItem('scrollPosition', window.scrollY);
};

// 로컬 스토리지에서 스크롤 위치를 불러오기
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
      saveScrollPosition();
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
      const initialWords = wordDirectory.slice(0, 10);
      setWords(initialWords);
    }

    // 스크롤 위치 복구
    const savedScrollPosition = loadScrollPosition();
    window.scrollTo(0, savedScrollPosition);

    return () => {
      saveScrollPosition();
    };
  }, []);

  useEffect(() => {
    const savePositionHandler = () => saveScrollPosition();
    window.addEventListener('beforeunload', savePositionHandler);

    const popStateHandler = () => {
      const savedScrollPosition = loadScrollPosition();
      window.scrollTo(0, savedScrollPosition);
    };
    window.addEventListener('popstate', popStateHandler);

    return () => {
      window.removeEventListener('beforeunload', savePositionHandler);
      window.removeEventListener('popstate', popStateHandler);
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
      <ScrollContainer>
        <TopScrollBtn />
      </ScrollContainer>
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

const ScrollContainer = styled.div`
  position: fixed;
  z-index: 999;
  right: 275px;
`;
