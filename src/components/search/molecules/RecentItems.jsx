import React, { useState } from 'react';
import styled from 'styled-components';
import { RecentItem } from '../atoms/RecentItem';
import { Column } from '@/styles/commonStyles';

export default function RecentItems({ header, onItemClick }) {
  // TODO : 임시저장, 추후 API 연동
  const [recentSearches, setRecentSearches] = useState([
    'React',
    'ACID',
    'DOM',
    'IDE',
    'React',
    'ACID',
    'DOM',
    'IDE',
    'dfd',
    'djfd',
  ]); // 최근 검색어

  // 검색어를 추가하는 함수
  const addSearchTerm = (term) => {
    setRecentSearches((prevSearches) => [term, ...prevSearches]);
  };
  // 검색어를 삭제하는 함수
  const removeSearchTerm = (index) => {
    setRecentSearches((prevSearches) => prevSearches.filter((_, i) => i !== index));
  };

  return (
    <DDSection borderRight>
      <SectionTitle header={header}>최근 검색어</SectionTitle>
      <Column>
        {recentSearches.length > 0 ? (
          recentSearches.map((item, index) => (
            <RecentItem header={header} key={index} onRemove={() => removeSearchTerm(index)} onItemClick={onItemClick}>
              {item}
            </RecentItem> // 각 검색어에 대한 RecentItem 컴포넌트를 생성
          ))
        ) : (
          <RecentItem /> // recentSearches 배열이 비어있을 경우 children prop을 전달하지 않음
        )}
      </Column>
    </DDSection>
  );
}

const DDSection = styled.div`
  padding: 25px 36px;
  border-right: ${(props) => (props.borderRight ? '1px solid var(--secondary)' : 'none')};
  width: 50%;
`;

const SectionTitle = styled.div`
  font-size: ${(props) => (props.header ? '14px' : '16px')};
  font-weight: 600;
  margin-bottom: ${(props) => (props.header ? '13px' : '20px')};
  height: ${(props) => (props.header ? '12px' : '18px')};
  line-height: 18px;
`;
