import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/atoms/Button';
import { Column, Row } from '@/styles/commonStyles';

export default function SocialLogin() {
  const kakaoLoginHandler = async () => {
    const response = await fetch('/api/kakaoAuth');
    const kakaoUrl = await response.json();
    window.location.href = kakaoUrl;
  };

  return (
    <SocialLoginBox>
      <ContinueBox>
        <ContinueLine />
        <ContinueText>Or continue with</ContinueText>
        <ContinueLine />
      </ContinueBox>
      <KakaoButton type='button' onClick={kakaoLoginHandler}>
        <LogoBox>
          <Logo src='/kakao.svg' />
          <LogoText>카카오 로그인</LogoText>
        </LogoBox>
      </KakaoButton>
    </SocialLoginBox>
  );
}
const SocialLoginBox = styled(Column)`
  padding-bottom: 30px;
  @media (max-width: 600px) {
    padding: 0;
    width: 100%;
  }
`;

const ContinueText = styled.div`
  font-size: 13px;
  font-weight: 400;
  padding: 30px 0px;
  @media (max-width: 600px) {
    font-size: 11px;
    padding: 20px 0px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ContinueBox = styled(Row)`
  gap: 72px;
  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const ContinueLine = styled.div`
  width: 100px;
  border-top: 1px solid #dbdbdb;
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
`;

const LogoText = styled.div``;

const LogoBox = styled(Row)`
  gap: 5px;
`;

const KakaoButton = styled(Button)`
  height: 45px;
  background-color: #fee500;
  font-size: 14.5px;
  font-weight: 500;
`;
