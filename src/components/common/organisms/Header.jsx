// src/components/common/organisms/Header.js
import React from "react";
import styled from "styled-components";
import SearchBar from "@/components/search/atoms/SearchBar";
import { LogoText, Row } from "@/styles/commonStyles";
import HeaderBtn from "../molecules/HeaderBtn";

export default function Header({ isHome }) {
  return (
    <Container isHome={isHome}>
      <Inner>
        <HeaderBtn />
        {!isHome && (
          <HeaderRow>
            <SmallLogoText>머라카노</SmallLogoText>
            <SearchBar header />
          </HeaderRow>
        )}
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 100vw;
  border-bottom: ${(props) => (props.isHome ? "none" : "1px solid #cccccc")};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 780px;
  height: 100%;
`;

const SmallLogoText = styled(LogoText)`
  width: 130px;
  font-size: 30px;
  text-shadow: 2px 2px 1px rgba(118, 118, 118, 0.2);
  align-items: center;
`;

const HeaderRow = styled(Row)`
  height: 51px;
  padding: 10px;
  gap: 35px;
`;
