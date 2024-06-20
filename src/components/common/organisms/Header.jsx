// src/components/common/organisms/Header.js
import React from "react";
import styled from "styled-components";
import SearchBar from "@/components/search/atoms/SearchBar";
import { LogoText, Row } from "@/styles/commonStyles";
import HeaderBtn from "../molecules/HeaderBtn";
import Link from "next/link";
import { Container } from "@/styles/commonStyles";

export default function Header({ $isHome }) {
  return (
    <Container $isHome={$isHome}>
      <Inner>
        <HeaderBtn />
        {!$isHome && (
          <HeaderRow>
            <SmallLogoText>
              <StyledLink href="/">머라카노</StyledLink>
            </SmallLogoText>
            <SearchBar header />
          </HeaderRow>
        )}
      </Inner>
    </Container>
  );
}

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
  align-items: center;
`;

const HeaderRow = styled(Row)`
  height: 51px;
  padding: 10px;
  gap: 35px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary);
  text-shadow: 2px 2px 1px rgba(118, 118, 118, 0.2);
  &:hover {
  }
`;
