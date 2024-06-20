// src/components/search/atoms/SearchBar.js
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import {
  SearchBarContainer,
  SearchInput,
  Icon,
  StyledSearchOutlined,
  Column,
} from "@/styles/commonStyles";
import SearchDropdown from "@/components/search/molecules/SearchDropdown";

export default function SearchBar({ header }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const searchBarRef = useRef();

  const handleSearch = () => {
    router.push(`/search?query=${searchTerm}`);
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Column ref={searchBarRef}>
      <SearchBarContainer header={header}>
        <SearchInput
          header={header}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setDropdownVisible(true)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="발음이 궁금한 영어 개발 용어를 검색해보세요."
        />
        <Icon onClick={handleSearch}>
          <StyledSearchOutlined />
        </Icon>
      </SearchBarContainer>
      {isDropdownVisible && <SearchDropdown header={header} />}
    </Column>
  );
}
