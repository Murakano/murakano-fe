// src/components/search/organisms/SearchBar.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Column } from '@/styles/commonStyles';
import SearchDropdown from '@/components/search/organisms/SearchDropdown';
import SearchBox from '@/components/search/molecules/SearchBox';

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
      <SearchBox
        header={header}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        setDropdownVisible={setDropdownVisible}
      />
      {isDropdownVisible && <SearchDropdown header={header} onItemClick={handleItemClick} />}
    </Column>
  );
}
