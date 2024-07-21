import { React, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SearchIcon } from '../atoms/SearchIcon';
import { useRouter } from 'next/router';
import { useSearchTermStore } from '@/store/useSearchTermStore';
import { CloseOutlined } from '@ant-design/icons';

export default function SearchBox({
  header,
  handleSearch,
  setDropdownVisible,
  relatedItems,
  focusedIndex,
  setFocusedIndex,
}) {
  const router = useRouter();
  const { query } = router.query;
  const { searchTerm, setSearchTerm } = useSearchTermStore();

  const handleeCloseIconClick = () => {
    setSearchTerm('');
  };

  const checkSearchTerm = () => {
    // 검색어가 없거나 연관검색어가 있을 경우 dropdown 표시
    if (searchTerm === '' || relatedItems.length) {
      setDropdownVisible(true);
    }
  };

  useEffect(() => {
    // 경로가 /search/:word인 경우 검색어를 set
    if (query) {
      setSearchTerm(query);
    } else {
      // 경로가 /search/:word가 아닌 경우 검색어 초기화
      setSearchTerm('');
    }
  }, [query]);

  const handleKeyDown = (e) => {
    if (relatedItems?.length) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setDropdownVisible(true);
        setFocusedIndex((prevIndex) => (prevIndex + 1) % relatedItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prevIndex) => (prevIndex - 1 + relatedItems.length) % relatedItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedTerm = focusedIndex === -1 ? searchTerm : relatedItems[focusedIndex];
        handleSearch(e, selectedTerm); // 포커스된 아이템을 handleSearch로 전달
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e, searchTerm);
    }
  };

  return (
    <SearchBarContainer $header={header}>
      <SearchInput
        $header={header}
        type='text'
        maxLength={50}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          checkSearchTerm();
        }}
        onClick={() => {
          // 연관검색어가 있거나 검색어가 없는 경우 dropdown 표시
          checkSearchTerm();
        }}
        onKeyDown={handleKeyDown}
        placeholder='발음이 궁금한 영어 개발 용어를 검색해보세요.'
      />
      {searchTerm && <CloseIcon onClick={handleeCloseIconClick} />}
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
  box-shadow: var(--search-shadow);
  border-radius: 50px;
  padding-right: 20px;
  gap: 5px;
  @media (max-width: 600px) {
    width: ${(props) => (props.$header ? '460px' : '350px')};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px 0 30px;
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

const CloseIcon = styled(CloseOutlined)`
  font-size: 20px;
  cursor: pointer;
  color: #666666;
  &:hover {
    color: #000000;
  }
  /* color: var(--secondary);
  &:hover {
    color: var(--primary60);
  } */
`;
