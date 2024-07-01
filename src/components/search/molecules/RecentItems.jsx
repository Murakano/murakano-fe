import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RecentItem } from '../atoms/RecentItem';
import { Column } from '@/styles/commonStyles';
import api from '@/utils/api';

export default function RecentItems({ header, onItemClick, recentSearches, setRecentSearches, loading, login }) {
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
        {!login ? (
          <RecentItem header={header}>로그인이 필요한 기능입니다</RecentItem>
        ) : loading ? (
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
