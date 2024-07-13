// src/components/common/organisms/Header.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from '@/components/search/organisms/SearchBar';
import { LogoText, Row } from '@/styles/commonStyles';
import HeaderBtn from '../molecules/HeaderBtn';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const pathname = router.pathname;

  // 초기 상태 설정
  const isInitialHome = pathname === '/';
  const isInitialCallback = pathname === '/auth/kakao/callback';

  const [isHome, setIsHome] = useState(isInitialHome);
  const [isCallback, setIsCallback] = useState(isInitialCallback);

  // pathname이 변경될 때만 상태 업데이트
  useEffect(() => {
    setIsHome(pathname === '/');
    setIsCallback(pathname === '/auth/kakao/callback');
  }, [pathname]);

  if (isCallback) {
    return (
      <MainContainer $isHome={isHome} $isCallback={isCallback}>
        <Inner>
          <HeaderBtn />
        </Inner>
      </MainContainer>
    );
  }

  return (
    <MainContainer $isHome={isHome}>
      <Inner>
        <HeaderBtn />
        {!isHome && (
          <HeaderRow>
            <SmallLogoText>
              <StyledLink href='/'>머라카노</StyledLink>
            </SmallLogoText>
            <SearchBar header />
          </HeaderRow>
        )}
      </Inner>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  background-color: white;
  top: 0;
  left: 0;
  box-shadow: ${(props) => (props.$isHome || props.$isCallback ? 'none' : 'rgba(0, 0, 0, 0.08) 0px 8px 16px 0px')};
  padding: 0;
  height: ${(props) => (props.$isHome ? '38px' : '130px')};
  width: 100%;
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
