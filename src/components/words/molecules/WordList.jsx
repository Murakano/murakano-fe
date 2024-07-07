import React, { useEffect, useRef, useState } from 'react';
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
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부를 나타내는 상태
  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  // 단어 목록 클릭 시 해당 단어 상세 페이지로 이동
  const handleWordClick = (name) => {
    // 스크롤 위치 저장
    sessionStorage.setItem('scrollPosition', window.scrollY);
    if (name) {
      router.push(`/search/${name}`);
    }
  };

  const fetchWords = async (page) => {
    setLoading(true);
    try {
      const response = await api.get('/words', {
        sort: 'recent',
        page: page + 1,
        limit: 10,
      });
      if (response.message === '단어 조회 성공') {
        const data = response.data;

        if (data.length === 0) {
          setHasMore(false); // 더 이상 불러올 데이터가 없음을 설정
        } else {
          setWords((prev) => [...prev, ...data]);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchWords(page);
    }
  }, [page, hasMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
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
  }, [loading, hasMore]);

  return (
    <WordListContainer>
      {words.map((word, index) => (
        <WordListDiv key={word._id || index} onClick={() => handleWordClick(word.word)}>
          <WordItem name={word.word} pron={word.comPron} />
        </WordListDiv>
      ))}
      <div ref={loaderRef} id='loader' style={{ height: '50px', marginTop: '10px' }}>
        {loading ? '불러오는 중' : !hasMore ? '마지막 페이지 입니다!' : ''}
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
  cursor: pointer;
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
