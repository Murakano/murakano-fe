// src/pages/index.js
import styled from 'styled-components';
import { LogoText } from '@/styles/commonStyles';
import SearchBar from '@/components/search/organisms/SearchBar';
import router from 'next/router';
import { useEffect } from 'react';
import { useSearchTermStore } from '@/store/useSearchTermStore';
import Image from 'next/image';

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
        <LogoContainer>
          <Image
            src='/murak-logo-removebg.png'
            alt='머라카노 로고'
            width={70}
            height={70}
            priority
            quality={75}
            sizes='(max-width: 600px) 40px, 70px'
          />
        </LogoContainer>
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
  @media (max-width: 600px) {
    padding-top: 40px;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
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
