// src/components/search/organisms/SearchBar.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Column } from '@/styles/commonStyles';
import SearchDropdown from '@/components/search/organisms/SearchDropdown';
import SearchBox from '@/components/search/molecules/SearchBox';
import api from '@/utils/api';
import { useSearchTermStore } from '@/store/useSearchTermStore';
import { set } from 'lodash';

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
    console.log(path, rememberPath, searchTerm, firstRender);
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
    }
    console.log(path, rememberPath, searchTerm, firstRender);
    let isInitialRender = firstRender;
    setFirstRender(false);
    if (rememberPath !== path) {
      setDropdownVisible(false);
      setRememberPath(path);
      isInitialRender = true;
      setFirstRender(true);
    }

    if (searchTerm) {
      debounceTimeoutRef.current = setTimeout(async () => {
        const data = await fetchRelatedItems(searchTerm);
        console.log(isInitialRender, 111);

        if (data?.length && !isInitialRender) {
          setDropdownVisible(true);
        } else {
          setDropdownVisible(false);
          setFirstRender(false);
        }
      }, 300);
      if (router.pathname !== `/search/${searchTerm}`) {
        setDropdownVisible(false);
      }
      return () => {
        clearTimeout(debounceTimeoutRef.current);
      };
    } else {
      setDropdownVisible(false);
    }
    console.log(dropdownVisible);
  }, [searchTerm, router.pathname]);

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
