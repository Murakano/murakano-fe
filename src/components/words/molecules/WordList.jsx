import { React, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import WordItem from '../atoms/WordItem';
import { useRouter } from 'next/router';

const wordDirectory = [
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
  { name: 'DOM', pron: '돔' },
  { name: 'React', pron: '리액트' },
  { name: 'yml', pron: '야믈' },
  { name: 'Linux', pron: '리눅스' },
];

// 무한 스크롤 변수
const pageSize = 10;
const loadMoreThreshold = 300;

export default function WordList() {
  const router = useRouter();
  const [wordDirectory, setWordDirectory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const loader = useRef(null);

  // 단어 목록 클릭 시 해당 단어 상세 페이지로 이동
  const handleWordClick = (name) => {
    if (name) {
      router.push(`/search/${name}`);
    }
  };

  // 무한 스크롤
  useEffect(() => {
    // 초기 데이터 로드
    loadWords(pageNumber);

    // 스크롤 감지
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [pageNumber]);

  const loadWords = (page) => {
    const startIndex = (page - 1) * pageSize;
    const newData = wordDirectory.slice(startIndex, startIndex + pageSize);
    setWordDirectory((prevData) => [...prevData, ...newData]);
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  return (
    <WordListContainer>
      {wordDirectory.map((word, index) => (
        <WordListDiv key={index} onClick={() => handleWordClick(word.name)}>
          <WordItem name={word.name} pron={word.pron} />
        </WordListDiv>
      ))}
      <div ref={loader} style={{ Height: `${loadMoreThreshold}px` }}></div>
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
  padding: 165px 44.5px 10 44.5px;
`;

const WordListDiv = styled.div`
  width: 691px;
  height: auto;
`;
