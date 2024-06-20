import React, { useState } from "react";
import styled from "styled-components";
import { RecentItem } from "../atoms/RecentItem";

export default function SearchDropdown() {
  // TODO : 임시저장, 추후 API 연동
  const [recentSearches, setRecentSearches] = useState([
    "React",
    "ACID",
    "DOM",
    "IDE",
  ]); // 최근 검색어

  const [popularSearches, setPopularSearches] = useState([
    "CSSOM",
    "ACID",
    "ASAP",
    "AZURE",
  ]); // 인기 검색어

  // 검색어를 추가하는 함수
  const addSearchTerm = (term) => {
    setRecentSearches((prevSearches) => [term, ...prevSearches]);
  };

  // 검색어를 삭제하는 함수
  const removeSearchTerm = (term) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((search) => search !== term)
    );
  };

  return (
    <DDContainer>
      <DDSection borderRight>
        <SectionTitle>최근 검색어</SectionTitle>
        <List>
          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => (
              <RecentItem key={index} onRemove={removeSearchTerm}>
                {item}
              </RecentItem> // 각 검색어에 대한 RecentItem 컴포넌트를 생성
            ))
          ) : (
            <RecentItem /> // recentSearches 배열이 비어있을 경우 children prop을 전달하지 않음
          )}
        </List>
      </DDSection>
      <DDSection>
        <SectionTitle>인기 검색어</SectionTitle>
        <List>
          <DDItem>React</DDItem>
          <DDItem>React</DDItem>
          <DDItem>React</DDItem>
          <DDItem>React</DDItem>
        </List>
      </DDSection>
    </DDContainer>
  );
}

const DDContainer = styled.div`
  width: 580px;
  height: 358px;
  margin-top: 23px;
  box-sizing: border-box;
  border-radius: 30px;
  border: 2px solid var(--secondary);
  display: flex;
`;

const DDSection = styled.div`
  padding: 25px 36px;
  border-right: ${(props) =>
    props.borderRight ? "1px solid var(--secondary)" : "none"};
  width: 50%;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  height: 18px;
  line-height: 18px;
  /* background-color: var(--secondary); */
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  gap: 10px;
`;

const DDItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  /* background-color: var(--secondary); */
  color: #666666;
  overflow: hidden;
  font-size: 16px;
  font-weight: 400;
`;

const DDText = styled.div`
  padding-top: 2px;
  width: 190px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
