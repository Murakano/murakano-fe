// src/components/search/organisms/SearchBar.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Column } from '@/styles/commonStyles';
import SearchDropdown from '@/components/search/organisms/SearchDropdown';
import SearchBox from '@/components/search/molecules/SearchBox';
import api from '@/utils/api';
import { getCookie } from '@/utils/getCookie';

export default function SearchBar({ header }) {
  const router = useRouter();
  const searchBarRef = useRef();
  // 검색어와 드롭다운 표시 여부를 관리하는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 입력중인 검색어
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // 최근검색어 props
  const [recentSearches, setRecentSearches] = useState();
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(true);
  // 인기검색어 props
  const [ranks, setRanks] = useState([]);

  const fetchRecentSearches = async () => {
    const accessToken = getCookie(); // 쿠키에서 access 토큰을 가져옴
    if (!accessToken) {
      // access 토큰이 없는 경우
      setLogin(false);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/users/recent');
      setRecentSearches(response.data.recentSearches);
      setLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 설정
      setLogin(true);
    } catch (error) {
      setLoading(false); // 오류 발생 시에도 로딩 상태를 false로 설정
    }
  };

  // 최근 검색어
  useEffect(() => {
    fetchRecentSearches();
  }, []);

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
      <SearchBox
        header={header}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        setDropdownVisible={setDropdownVisible}
      />
      {isDropdownVisible && (
        <SearchDropdown
          header={header}
          onItemClick={handleItemClick}
          searchTerm={searchTerm}
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
          login={login}
          loading={loading}
          ranks={ranks}
        />
      )}
    </Column>
  );
}
