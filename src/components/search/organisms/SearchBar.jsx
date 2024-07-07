// src/components/search/organisms/SearchBar.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Column } from '@/styles/commonStyles';
import SearchDropdown from '@/components/search/organisms/SearchDropdown';
import SearchBox from '@/components/search/molecules/SearchBox';
import api from '@/utils/api';
import { useSearchTermStore } from '@/store/useSearchTermStore';

export default function SearchBar({ header }) {
  const router = useRouter();
  const searchBarRef = useRef();
  const { searchTerm } = useSearchTermStore();
  // 검색어와 드롭다운 표시 여부를 관리하는 상태
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // 인기검색어 props
  const [ranks, setRanks] = useState([]);

  // 인기 검색어
  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const response = await api.get('/words/rank');
        setRanks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRanks();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
      setDropdownVisible(false);
    }
  };

  const handleItemClick = (searchTerm) => {
    router.push(`/search/${encodeURIComponent(searchTerm)}`);
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
      <SearchBox header={header} handleSearch={handleSearch} setDropdownVisible={setDropdownVisible} />
      {isDropdownVisible && (
        <SearchDropdown
          header={header}
          onItemClick={handleItemClick}
          ranks={ranks}
          setDropdownVisible={setDropdownVisible}
        />
      )}
    </Column>
  );
}
