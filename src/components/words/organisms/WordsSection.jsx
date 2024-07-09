import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import api from '@/utils/api';
import WordList from '../molecules/WordList';
import SortDropdown from '../molecules/SortDropdown';
import TopScrollBtn from '@/components/common/atoms/TopScrollBtn';

export default function WordsSection() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('recent'); // 정렬 (asc, desc, popularity, recent)
  const [hasMore, setHasMore] = useState(true); // 데이터 호출 여부
  const observer = useRef();

  // 단어 클릭 시 검색 결과 페이지로 이동
  const handleWordClick = (name) => {
    if (name) {
      router.push(`/search/${name}`);
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
      <ScrollContainer>
        <TopScrollBtn />
      </ScrollContainer>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
    </WordBoardContainer>
  );
}

const WordBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 691px;
`;

const DropdownContainer = styled.div`
  display: flex;
  width: 691px;
  height: 35px;
  gap: 20px;
  margin-bottom: 10px;
`;

const ScrollContainer = styled.div`
  position: fixed;
  z-index: 999;
  right: 275px;
`;

const LoadingMessage = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;
