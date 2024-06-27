import { React } from 'react';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SearchIcon } from '../atoms/SearchIcon';

export default function SearchBox({ header, searchTerm, setSearchTerm, handleSearch, setDropdownVisible }) {
  return (
    <SearchBarContainer $header={header}>
      <SearchInput
        $header={header}
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => setDropdownVisible(true)}
        onKeyPress={handleSearch}
        placeholder='발음이 궁금한 영어 개발 용어를 검색해보세요.'
      />
      <SearchIcon searchTerm={searchTerm} handleSearch={handleSearch} />
    </SearchBarContainer>
  );
}

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$header ? '460px' : '580px')};
  height: ${(props) => (props.$header ? '48px' : '64px')};
  left: ${(props) => (props.$header ? '0px' : 'auto')};
  top: ${(props) => (props.$header ? '0px' : 'auto')};
  border: 2px solid var(--secondary);
  border-radius: 50px;
  padding-right: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 30px;
  font-size: ${(props) => (props.$header ? '14px' : '18px')};
  font-weight: 400;
  color: #666666;
  background-color: transparent;
  border: none;
  outline: none;
`;

export const ResetLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;
