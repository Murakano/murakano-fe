import React from 'react';
import styled from 'styled-components';
// import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { StyledSearchOutlined } from '@/styles/commonStyles';

export function SearchIcon({ searchTerm, handleSearch }) {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  return (
    <Link href={`/search/${encodedSearchTerm}`}>
      <Icon onClick={handleSearch}>
        <StyledSearchOutlined />
      </Icon>
    </Link>
  );
}

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
