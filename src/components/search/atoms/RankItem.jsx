import styled from 'styled-components';
import { Column, ResetLink } from '@/styles/commonStyles';
import React, { useState } from 'react';

export function RankItem({ children, header }) {
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
    <Column>
      {ranks.map((item, index) => (
        <DDItem header={header} key={index}>
          <Rank header={header}>{index + 1}.</Rank>
          <RankLink header={header} href={`/search/${item}`}>
            {item}
          </RankLink>
        </DDItem>
      ))}
    </Column>
  );
}

const DDItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => (props.header ? '23px' : '28px')};
  color: #666666;
  overflow: hidden;
  font-size: ${(props) => (props.header ? '13px' : '16px')};
  font-weight: 400;
  width: 100%;
  gap: ${(props) => (props.header ? '4px' : '8px')};
  cursor: pointer;

  &:hover {
    color: #000000;
    background-color: var(--secondary10);
  }
`;

const RankLink = styled(ResetLink)`
  flex-grow: 1;
  color: #666666;

  &:hover {
    color: #000000;
  }
`;

const Rank = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 23px;
`;
