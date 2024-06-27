import React, { useState } from 'react';
import styled from 'styled-components';
import RecentItems from '../molecules/RecentItems';
import { RankItems } from '../molecules/RankItems';

export default function SearchDropdown({ header, onItemClick }) {
  return (
    <DDContainer $header={header}>
      <RecentItems header={header} onItemClick={onItemClick} />
      <RankItems header={header} onItemClick={onItemClick} />
    </DDContainer>
  );
}

const DDContainer = styled.div`
  width: ${(props) => (props.$header ? '460px' : '580px')};
  height: ${(props) => (props.$header ? '309px' : '372px')};
  margin: ${(props) => (props.$header ? '0' : '23px 0 38px')};
  box-sizing: border-box;
  border-radius: 30px;
  border: 2px solid var(--secondary);
  display: flex;
  background-color: #ffffff;
  position: ${(props) => (props.$header ? 'absolute' : 'static')};
  top: ${(props) => (props.$header ? '100px' : 'auto')};
`;
