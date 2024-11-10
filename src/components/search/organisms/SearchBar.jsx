// src/components/search/organisms/SearchBar.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Column } from '@/styles/commonStyles';
import SearchDropdown from '@/components/search/organisms/SearchDropdown';
import SearchBox from '@/components/search/molecules/SearchBox';
import api from '@/utils/api';
import { useSearchTermStore } from '@/store/useSearchTermStore';
import jsLevenshtein from 'js-levenshtein';
import styled from 'styled-components';

export default function SearchBar({ header }) {
  const router = useRouter();
  const searchBarRef = useRef();
  const debounceTimeoutRef = useRef(null);
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
      const words = response.data;
      const primaryMatch = [];
      const otherMatches = [];

      words.forEach((word) => {
        if (word.toLowerCase().startsWith(term[0])) {
          primaryMatch.push(word);
        } else {
          otherMatches.push(word);
        }
      });

      // primaryMatch를 Levenshtein 거리와 기존 인덱스로 정렬
      // term과의 유사성을 우선으로 하되, 유사성이 같은 경우에는 기존의 조회순(낮은 인덱스가 높은 조회수)을 유지하여 단어를 정렬
      // 1.각 단어에 대해 term과의 Levenshtein 거리를 계산
      // 2.Levenshtein 거리가 다른 경우, 거리가 더 작은 단어가 앞에 오도록 정렬합니다.
      // 3.Levenshtein 거리가 같은 경우, 기존 인덱스를 기준으로 정렬하여 기존 순서를 유지
      primaryMatch.sort((a, b) => {
        const distanceA = jsLevenshtein(term, a);
        const distanceB = jsLevenshtein(term, b);
        if (distanceA !== distanceB) {
          return distanceA - distanceB;
        }
        return words.indexOf(a) - words.indexOf(b);
      });
      console.log('primaryMatch: ' + primaryMatch);

      // otherMatches를 Levenshtein 거리와 기존 인덱스로 정렬
      otherMatches.sort((a, b) => {
        const distanceA = jsLevenshtein(term, a);
        const distanceB = jsLevenshtein(term, b);
        if (distanceA !== distanceB) {
          return distanceA - distanceB;
        }
        return words.indexOf(a) - words.indexOf(b);
      });

      // 최종 정렬된 배열
      setRelatedItems([...primaryMatch, ...otherMatches]);
      return [...primaryMatch, ...otherMatches];
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
    if (rememberPath !== path) {
      setDropdownVisible(false);
      setRememberPath(path);
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
      if (rememberPath !== path) {
        setDropdownVisible(false);
        setRememberPath(path);
      }
    }
    if (searchTerm) {
      debounceTimeoutRef.current = setTimeout(async () => {
        console.log(searchTerm);
        const data = await fetchRelatedItems(searchTerm);
        if (data?.length) {
          // setDropdownVisible(true);
        } else {
          setDropdownVisible(false);
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
      setDropdownVisible(false);
    }
  };

  const handleItemClick = (searchTerm) => {
    setSearchTerm(searchTerm);
    setFocusedIndex(-1); // 포커스 인덱스 초기화
    router.push(`/search/${encodeURIComponent(searchTerm)}`);
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  return (
    <SearchColumn ref={searchBarRef}>
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
    </SearchColumn>
  );
}
const SearchColumn = styled(Column)`
  flex-grow: 1;
  justify-content: flex-start;
`;
