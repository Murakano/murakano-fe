import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import api from '@/utils/api';
import WordList from '../molecules/WordList';
import SortDropdown from '../molecules/SortDropdown';

export default function WordsSection() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('recent'); // 정렬 (asc, desc, popularity, recent)
  const [hasMore, setHasMore] = useState(true); // 데이터 호출 여부
  const observer = useRef();

  // 단어 클릭 시 검색 결과 페이지로 이동 (URL 인코딩으ㄹ 통해 특수문자 처리)
  const handleWordClick = (name) => {
    if (name) {
      // 공백 및 불필요한 슬래시 제거
      const trimmedName = name.trim();
      // URL 인코딩하여 특수문자가 포함된 단어도 안전하게 처리
      const encodedName = encodeURIComponent(trimmedName);
      router.push(`/search/${encodedName}`);
    }
  };

  // 단어 데이터 요청
  const fetchWords = useCallback(async (sort, page) => {
    setLoading(true);
    try {
      const response = await api.get('/words', {
        sort,
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
    setPage(1);
  }, [sort]);

  // 상태 변경시 단어 데이터 호출
  useEffect(() => {
    fetchWords(sort, page);
  }, [page, sort, fetchWords]);

  // 스크롤 위치 복원
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const isReload = event.currentTarget.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload');

      if (isReload) {
        console.log('Clearing scroll position on reload');
        sessionStorage.removeItem('scrollPosition');
      } else {
        console.log('Saving scroll position on before unload:', window.scrollY);
        sessionStorage.setItem('scrollPosition', window.scrollY);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    console.log('Restoring scroll position:', savedScrollPosition);
    if (savedScrollPosition && savedScrollPosition !== '0') {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }, 10); // 10ms 딜레이
    }
  }, [words]); // 데이터를 불러온 후에 스크롤 위치를 복원

  // 페이지 이동 시 스크롤 위치 저장
  useEffect(() => {
    const handleRouteChange = () => {
      console.log('Saving scroll position on route change:', window.scrollY);
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // 클릭 시 스크롤 위치 저장
  useEffect(() => {
    const handleClick = () => {
      console.log('Saving scroll position on click:', window.scrollY);
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
    setSort(sortValue);
  };

  return (
    <WordBoardContainer>
      <DropdownContainer>
        <SortDropdown onSelect={handleSortChange} />
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
`;

const DropdownContainer = styled.div`
  display: flex;
  width: 691px;
  height: 35px;
  gap: 20px;
  margin-bottom: 10px;
`;

const LoadingMessage = styled.div`
  width: 691px;
  height: 99px;
  padding: 10.5px 36px;
  background: var(--secondary10);
`;
