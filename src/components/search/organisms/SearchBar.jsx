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

  const [firstRender, setFirstRender] = useState(true);
  const [relatedItems, setRelatedItems] = useState([]);
  const { searchTerm, setSearchTerm } = useSearchTermStore();
  const [rememberPath, setRememberPath] = useState(router.pathname);
  // 검색어와 드롭다운 표시 여부를 관리하는 상태
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // 인기검색어 props
  const [ranks, setRanks] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1); // 포커스된 아이템의 인덱스

  const fetchRelatedItems = async (term) => {
    try {
      const response = await api.get(`/words/search/related`, { searchTerm: term, limit: 10 });
      response.data ? setRelatedItems(response.data) : setRelatedItems([]);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRanks = async () => {
    try {
      const response = await api.get('/words/rank');
      setRanks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let path = router.pathname;

    if (/^\/search\/[^\/]+$/.test(router.pathname)) {
      path = `/search/${router.query.query}`;
      setDropdownVisible(false);
    }
    setFirstRender(false);
    if (rememberPath !== path) {
      setDropdownVisible(false);
      setRememberPath(path);
      setFirstRender(true);
    }
  }, []);

  // 인기 검색어
  useEffect(() => {
    fetchRanks();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let path = router.pathname;
    if (/^\/search\/[^\/]+$/.test(router.pathname)) {
      path = `/search/${router.query.query}`;
      setFirstRender(false);
      if (rememberPath !== path) {
        setDropdownVisible(false);
        setRememberPath(path);
        setFirstRender(true);
      }
    }
    if (searchTerm) {
      debounceTimeoutRef.current = setTimeout(async () => {
        const data = await fetchRelatedItems(searchTerm);
        if (data?.length && !firstRender) {
          setDropdownVisible(true);
        } else {
          setDropdownVisible(false);
          setFirstRender(false);
        }
      }, 300);
    }

    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [searchTerm, router.query.query]);

  const handleSearch = (e, term) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const searchTermToUse = term || searchTerm;
      setRememberPath(router.query.query);
      setSearchTerm(searchTermToUse); // setSearchTerm 호출
      setFocusedIndex(-1); // 포커스 인덱스 초기화
      router.push(`/search/${encodeURIComponent(searchTermToUse)}`);
      setFirstRender(true);
      setDropdownVisible(false);
    }
  };

  const handleItemClick = (searchTerm) => {
    setSearchTerm(searchTerm);
    setFocusedIndex(-1); // 포커스 인덱스 초기화
    router.push(`/search/${encodeURIComponent(searchTerm)}`);
    setFirstRender(true);
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setDropdownVisible(false);
      setFirstRender(true);
    }
  };

  return (
    <Column ref={searchBarRef}>
      <SearchBox
        header={header}
        handleSearch={handleSearch}
        setDropdownVisible={setDropdownVisible}
        relatedItems={relatedItems}
        focusedIndex={focusedIndex} // 추가
        setFocusedIndex={setFocusedIndex} // 추가
      />
      {dropdownVisible && (
        <SearchDropdown
          header={header}
          onItemClick={handleItemClick}
          ranks={ranks}
          relatedItems={relatedItems}
          dropdownVisible={dropdownVisible}
          focusedIndex={focusedIndex} // 추가
          setFocusedIndex={setFocusedIndex}
          setDropdownVisible={setDropdownVisible} // 추가
        />
      )}
    </Column>
  );
}
