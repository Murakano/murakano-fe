import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RecentItem } from '../atoms/RecentItem';
import { Column } from '@/styles/commonStyles';
import api from '@/utils/api';

export default function RecentItems({ header, onItemClick }) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const response = await api.get('/users/recent');
        setRecentSearches(response.data.recentSearches);
        setLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 설정
      } catch (error) {
        console.error(error);
        setLoading(false); // 오류 발생 시에도 로딩 상태를 false로 설정
      }
    };
    fetchRecentSearches();
  }, []);

  // 검색어를 삭제하는 함수
  const removeSearchTerm = async (index) => {
    const termToRemove = recentSearches[index];
    try {
      await api.delete(`/users/${termToRemove}`);
      setRecentSearches((prevSearches) => prevSearches.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DDSection>
      <SectionTitle $header={header}>최근 검색어</SectionTitle>
      <ColumnGap>
        {loading ? (
          <></>
        ) : recentSearches && recentSearches.length > 0 ? (
          recentSearches.map((item, index) => (
            <RecentItem header={header} key={index} onRemove={() => removeSearchTerm(index)} onItemClick={onItemClick}>
              {item}
            </RecentItem>
          ))
        ) : (
          <RecentItem header={header}>최근 검색어가 없습니다.</RecentItem>
        )}
      </ColumnGap>
    </DDSection>
  );
}

const DDSection = styled.div`
  padding: 25px 36px;
  width: 50%;
`;

const SectionTitle = styled.div`
  font-size: ${(props) => (props.$header ? '14px' : '16px')};
  font-weight: 600;
  margin-bottom: ${(props) => (props.$header ? '13px' : '15px')};
  height: ${(props) => (props.$header ? '12px' : '18px')};
  line-height: 18px;
`;

const ColumnGap = styled(Column)`
  gap: 3px;
`;
