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
  const debounceTimeoutRef = useRef(null);

  const [relatedItems, setRelatedItems] = useState([]);
  const { searchTerm } = useSearchTermStore();
  // 검색어와 드롭다운 표시 여부를 관리하는 상태
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // 인기검색어 props
  const [ranks, setRanks] = useState([]);

  const fetchRelatedItems = async (term) => {
    try {
      const response = await api.get(`/words/search/related`, { searchTerm: term, limit: 10 });
      response.data ? setRelatedItems(response.data) : setRelatedItems([]);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    if (searchTerm) {
      // 새로운 타이머를 설정합니다.
      debounceTimeoutRef.current = setTimeout(async () => {
        const data = await fetchRelatedItems(searchTerm);
        if (data.length) {
          setDropdownVisible(true);
        } else {
          setDropdownVisible(false);
        }
      }, 300);

      // cleanup 함수: 컴포넌트가 언마운트되거나 searchTerm이 변경될 때 실행됩니다.
      return () => {
        clearTimeout(debounceTimeoutRef.current);
      };
    }
  }, [searchTerm]);

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
      {dropdownVisible && (
        <SearchDropdown
          header={header}
          onItemClick={handleItemClick}
          ranks={ranks}
          relatedItems={relatedItems}
          dropdownVisible={dropdownVisible}
        />
      )}
    </Column>
  );
}
