// src/components/search/atoms/SearchBar.js
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchBarContainer, SearchInput, Icon, StyledSearchOutlined, Column } from '@/styles/commonStyles';
import SearchDropdown from '@/components/search/organisms/SearchDropdown';

export default function SearchBar({ header }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const searchBarRef = useRef();

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      router.push(`/search/${searchTerm}`);
      setDropdownVisible(false);
    }
  };

  const handleItemClick = (item) => {
    router.push(`/search/${item}`);
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Column ref={searchBarRef}>
      <SearchBarContainer header={header}>
        <SearchInput
          header={header}
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setDropdownVisible(true)}
          onKeyPress={handleSearch}
          placeholder='발음이 궁금한 영어 개발 용어를 검색해보세요.'
        />
        <Link href={`/search/${searchTerm}`}>
          <Icon onClick={handleSearch}>
            <StyledSearchOutlined />
          </Icon>
        </Link>
      </SearchBarContainer>
      {isDropdownVisible && <SearchDropdown header={header} onItemClick={handleItemClick} />}
    </Column>
  );
}
