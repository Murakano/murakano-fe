import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import WordItem from '../atoms/WordItem';
import { useRouter } from 'next/router';
import TopScrollBtn from '@/components/common/atoms/TopScrollBtn';
import api from '@/utils/api';

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
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  // 단어 목록 클릭 시 해당 단어 상세 페이지로 이동
  const handleWordClick = (name) => {
    if (name) {
      saveScrollPosition(); // 단어 항목 클릭시, 스크롤 위치 저장
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
    const fetchWords = async () => {
      setLoading(true);
      try {
        const data = await api.get('/word', {
          Sort: 'recent',
          page: page + 1,
          limit: 10,
        });
        setWords((prev) => [...prev, ...data]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, [page]);

  useEffect(() => {
    // 스크롤 위치 복구
    const savedScrollPosition = loadScrollPosition();
    window.scrollTo(0, savedScrollPosition);

    // 페이지 언로드 직전에 스크롤위치 저장
    const savePositionHandler = () => saveScrollPosition();
    window.addEventListener('beforeunload', savePositionHandler);

    const popStateHandler = () => {
      const savedScrollPosition = loadScrollPosition();
      window.scrollTo(0, savedScrollPosition);
    };
    window.addEventListener('popstate', popStateHandler);

    // visibility API , 페이지가 숨겨지거나 다시 보여질 때 스크롤 위치 저장 및 복구
    const visiblitySaveHandler = () => {
      if (document.visibilityState === 'hidden') {
        saveScrollPosition();
      } else {
        const savedScrollPosition = loadScrollPosition();
        window.scrollTo(0, savedScrollPosition);
      }
    };
    document.addEventListener('visibilitychange', visiblitySaveHandler);

    return () => {
      window.removeEventListener('beforeunload', savePositionHandler);
      window.removeEventListener('popstate', popStateHandler);
      document.removeEventListener('visibilitychange', visiblitySaveHandler);
    };
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <WordListContainer>
      {words.map((word, index) => (
        <WordListDiv
          key={word._id}
          ref={index === words.length - 1 ? lastWordElementRef : null}
          onClick={() => handleWordClick(word.word)}
        >
          <WordItem name={word.word} pron={word.comPron} />
        </WordListDiv>
      ))}
      {loading && <p>Loading</p>}
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
