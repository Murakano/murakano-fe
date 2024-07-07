WordList.jsx;

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import WordItem from '../atoms/WordItem';
import { useRouter } from 'next/router';
import TopScrollBtn from '@/components/common/atoms/TopScrollBtn';
import api from '@/utils/api';

export default function WordList() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  // 단어 목록 클릭 시 해당 단어 상세 페이지로 이동
  const handleWordClick = (name) => {
    if (name) {
      router.push(`/search/${name}`);
    }
  };

  const fetchWords = async (page) => {
    setLoading(true);
    try {
      const response = await api.get('/words', {
        Sort: 'recent',
        page: page + 1,
        limit: 10,
      });
      const data = response.data;
      setWords((prev) => [...prev, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords(page);
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    observerRef.current = observer;

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading]);

  return (
    <WordListContainer>
      {words.map((word, index) => (
        <WordListDiv key={word._id || index} onClick={() => handleWordClick(word.word)}>
          <WordItem name={word.word} pron={word.comPron} />
        </WordListDiv>
      ))}
      <div ref={loaderRef} id='loader' style={{ height: '50px', marginTop: '10px' }}>
        {loading ? 'Loading...' : ''}
      </div>
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
