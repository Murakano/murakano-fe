import styled from 'styled-components';
import { Column, ResetLink } from '@/styles/commonStyles';
import React, { useState } from 'react';
import { RankItem } from '../atoms/RankItem';

export function RankItems({ children, header, onItemClick }) {
  // TODO : 임시저장, 추후 API 연동
  const [ranks, setRanks] = useState([
    'CSSOM',
    'ACID',
    'ASAP',
    'AZURE',
    'CSSOM',
    'ACID',
    'ASAP',
    'AZURE',
    'CSSOM',
    'ACID',
  ]); // 인기 검색어

  return (
    <DDSection>
      <SectionTitle header={header}>인기 검색어</SectionTitle>

      {ranks.map((item, index) => (
        <RankItem key={`rank ${index}`} header={header} index={index} onItemClick={onItemClick}>
          {item}
        </RankItem>
      ))}
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
