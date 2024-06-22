import React, { useState } from 'react';
import styled from 'styled-components';
import { RecentItem } from '../atoms/RecentItem';
import RecentItems from '../molecules/RecentItems';
import { RankItem } from '../atoms/RankItem';

export default function SearchDropdown({ header }) {
  return (
    <DDContainer header={header}>
      <RecentItems header={header} />

      <DDSection>
        <SectionTitle header>인기 검색어</SectionTitle>
        <RankItem header={header} />
      </DDSection>
    </DDContainer>
  );
}

const DDContainer = styled.div`
  width: ${(props) => (props.header ? '460px' : '580px')};
  height: ${(props) => (props.header ? '309px' : '372px')};
  margin: ${(props) => (props.header ? '0' : '23px 0 38px')};
  box-sizing: border-box;
  border-radius: 30px;
  border: 2px solid var(--secondary);
  display: flex;
  background-color: #ffffff;
  position: ${(props) => (props.header ? 'absolute' : 'static')};
  top: ${(props) => (props.header ? '100px' : 'auto')};
`;

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
