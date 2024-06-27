import styled from 'styled-components';
import React from 'react';

export function RankItem({ children, header, index, onItemClick }) {
  return (
    <DDItem $header={header} onClick={() => onItemClick(children)}>
      <Rank $header={header}>{index + 1}.</Rank>
      <RankLink $header={header}>{children}</RankLink>
    </DDItem>
  );
}

const DDItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => (props.$header ? '23px' : '28px')};
  color: #666666;
  overflow: hidden;
  font-size: ${(props) => (props.$header ? '13px' : '16px')};
  font-weight: 400;
  gap: ${(props) => (props.$header ? '4px' : '8px')};
  cursor: pointer;

  &:hover {
    color: #000000;
    background-color: var(--secondary10);
  }
`;

const RankLink = styled.div`
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
