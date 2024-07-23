import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import api from '@/utils/api';

import styled from 'styled-components';
import WordList from '../molecules/WordList';
import SortDropdown from '../molecules/SortDropdown';
import { useSortStore } from '@/store/useSortStore';

export default function WordsSection({ referer }) {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 데이터 호출 여부
  const { sortType, setSortType } = useSortStore();
  const observer = useRef();

  const refererParts = referer?.split('/') || '';
  const isWordsPage = refererParts[refererParts.length - 1] === 'words' || false;

  // 단어 클릭 시 검색 결과 페이지로 이동
  const handleWordClick = (name) => {
    if (name) {
      // URL 인코딩하여 특수문자가 포함된 단어도 안전하게 처리
      const encodedName = encodeURIComponent(name);
      router.push(`/search/${encodedName}`);
    }
  };

  // 단어 데이터 요청
  const fetchWords = useCallback(async (sortType, page) => {
    setLoading(true);
    try {
      const response = await api.get('/words', {
        sort: sortType,
        page,
        limit: 10,
      });
      const data = response.data || [];
      if (page === 1) {
        setWords(data);
      } else {
        setWords((prev) => [...prev, ...data]);
      }
      setHasMore(data.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 정렬 변경시 페이지 초기화
  useEffect(() => {
    setWords([]);
    setPage(1);
  }, [sortType]);

  // 상태 변경시 단어 데이터 호출
  useEffect(() => {
    fetchWords(sortType, page);
  }, [page, sortType, fetchWords]);

  useEffect(() => {
    // 스크롤 위치 복원
    const handleBeforeUnload = (event) => {
      const isReload = event.currentTarget.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload');

      if (isReload) {
        sessionStorage.removeItem('scrollPosition');
      } else {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        // setSortType(sort);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    const handleClick = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
      // setSortType(sort);
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // 데이터 불러온 후 스크롤 위치 복원
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition && savedScrollPosition !== '0' && isWordsPage) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }, 0);
      if (window.scrollY > parseInt(savedScrollPosition)) {
        sessionStorage.setItem('scrollPosition', '0');
      }
    }
  }, [words]);

  // 페이지 이동 시 스크롤 위치 저장
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
      // setSortType(sort);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // 무한 스크롤
  const lastWordElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // 정렬 변경시 새로운 정렬 값으로 상태 변경
  const handleSortChange = (sortValue) => {
    setSortType(sortValue);
  };

  return (
    <WordBoardContainer>
      <DropdownContainer>
        <SortDropdown onSelect={handleSortChange} sortType={sortType} />
      </DropdownContainer>
      <WordList words={words} handleWordClick={handleWordClick} lastWordElementRef={lastWordElementRef} />
      {loading && <LoadingMessage></LoadingMessage>}
    </WordBoardContainer>
  );
}

const WordBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 691px;
  height: 100%;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  width: 691px;
  height: 35px;
  gap: 20px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px;
  }
`;

const LoadingMessage = styled.div`
  width: 691px;
  height: 99px;
  padding: 10.5px 36px;
  background: var(--secondary10);
  @media (max-width: 600px) {
    width: 100%;
  }
`;
