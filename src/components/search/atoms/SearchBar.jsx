// src/components/search/atoms/SearchBar.js
import { useState } from "react";
import { useRouter } from "next/router";
import {
  SearchBarContainer,
  SearchInput,
  Icon,
  StyledSearchOutlined,
} from "@/styles/commonStyles";

export default function SearchBar({ header }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?query=${searchTerm}`);
  };

  return (
    <SearchBarContainer header={header}>
      <SearchInput
        header={header}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="영어 개발 용어를 검색해보세요."
      />
      <Icon onClick={handleSearch}>
        <StyledSearchOutlined />
      </Icon>
    </SearchBarContainer>
  );
}
