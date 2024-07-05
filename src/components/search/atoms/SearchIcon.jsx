import React from 'react';
import styled from 'styled-components';
// import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { StyledSearchOutlined } from '@/styles/commonStyles';

export function SearchIcon({ searchTerm, handleSearch }) {
  return (
    <Link href={`/search/${searchTerm}`}>
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

// export const StyledSearchOutlined = styled(SearchOutlined)`
//   width: 32px;
//   height: 32px;
//   font-size: 30px;
//   color: #666666;
// `;
