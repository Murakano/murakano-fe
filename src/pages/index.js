// src/pages/index.js
import styled from 'styled-components';
import { LogoText } from '@/styles/commonStyles';
import SearchBar from '@/components/search/organisms/SearchBar';
import router from 'next/router';
import { useEffect } from 'react';
import { useSearchTermStore } from '@/store/useSearchTermStore';

export default function Search() {
  const { setSearchTerm } = useSearchTermStore();

  // 메인 홈 이동
  const redirectToHome = () => {
    router.push('/');
  };

  useEffect(() => {
    setSearchTerm('');
  }, []);

  return (
    <Section>
      <Title onClick={redirectToHome}>
        <Logo />
        <LogoText>머라카노</LogoText>
      </Title>
      <SubText>개발자들을 위한 한국어 발음 검색 서비스</SubText>
      <SearchBar />
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  justify-content: flex-start;
  box-sizing: border-box;
  min-height: calc(100vh - 103px);
  height: 100%;
  max-width: 100vw;
`;

const Logo = styled.div`
  width: 70px;
  height: 70px;
  background-image: url('/murak-logo-removebg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  @media (max-width: 600px) {
    align-items: flex-end;
  }
`;

const SubText = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #666666;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;
