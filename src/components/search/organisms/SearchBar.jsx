// src/components/search/organisms/SearchBar.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Column } from '@/styles/commonStyles';
import SearchDropdown from '@/components/search/organisms/SearchDropdown';
import SearchBox from '@/components/search/molecules/SearchBox';
import api from '@/utils/api';
import { useSearchTermStore } from '@/store/useSearchTermStore';
import { first, set } from 'lodash';

export default function SearchBar({ header }) {
  const router = useRouter();
  const searchBarRef = useRef();
  const debounceTimeoutRef = useRef(null);

  const [firstRender, setFirstRender] = useState(true);
  const [relatedItems, setRelatedItems] = useState([]);
  const { searchTerm } = useSearchTermStore();
  const [rememberPath, setRememberPath] = useState(router.pathname);
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
    }
    console.log(firstRender);
    setFirstRender(false);
    if (rememberPath !== path) {
      console.log(2);
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
    console.log(3);
    if (/^\/search\/[^\/]+$/.test(router.pathname)) {
      path = `/search/${router.query.query}`;
    }
    let isInitialRender = firstRender;
    console.log(4);
    setFirstRender(false);
    console.log(rememberPath, path, isInitialRender, 33);
    if (rememberPath !== path) {
      setDropdownVisible(false);
      setRememberPath(path);
      isInitialRender = true;
      console.log(5);
      setFirstRender(true);
    }

    if (searchTerm) {
      debounceTimeoutRef.current = setTimeout(async () => {
        const data = await fetchRelatedItems(searchTerm);

        if (data?.length && !isInitialRender) {
          setDropdownVisible(true);
        } else {
          console.log(6);
          setDropdownVisible(false);
          setFirstRender(false);
        }
      }, 200);

      return () => {
        clearTimeout(debounceTimeoutRef.current);
      };
    } else if (!isInitialRender) {
      setDropdownVisible(true);
    }
  }, [searchTerm, router.pathname]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setRememberPath(router.query.query);
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
      console.log(rememberPath, searchTerm, 1);
      setFirstRender(true);
      setDropdownVisible(false);
    }
  };

  const handleItemClick = (searchTerm) => {
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
      />
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
