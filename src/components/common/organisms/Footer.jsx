import Link from 'next/link';
import { useState } from 'react';

import useAuthStore from '@/store/useAuthStore';

import styled from 'styled-components';
import UserDeleteModal from '@/components/auth/molecules/UserDeleteModal';

export default function Footer() {
  const { nickname } = useAuthStore();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <Logo />
          <Name>© 2024 Murak, Inc.</Name>
        </FooterLogo>

        <FooterLink href='/policy/privacy'>
          <FooterBtn>개인정보처리방침</FooterBtn>
        </FooterLink>
        <FooterLink href='/policy'>
          <FooterBtn>이용약관</FooterBtn>
        </FooterLink>
        {nickname && <FooterBtn onClick={() => setModalOpen(true)}>회원탈퇴</FooterBtn>}
        {isModalOpen && (
          <UserDeleteModal onClick={() => isModalOpen(true)} onClose={() => setModalOpen(false)}></UserDeleteModal>
        )}
      </FooterContent>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  max-width: 780px;
  width: 100%;
  margin-top: 10px;
  padding: 20px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  width: 15px;
  height: 15px;
  background-image: url('/murak-logo-removebg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Name = styled.div`
  font-size: 12px;
  color: #333;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
`;

const FooterBtn = styled.div`
  color: #333;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #000;
  }
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
