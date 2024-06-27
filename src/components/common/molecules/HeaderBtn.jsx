import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row } from '@/styles/commonStyles';
import Link from 'next/link';
import { Dropdown } from 'antd';
import { useRouter } from 'next/router';

export default function HeaderBtn() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  useEffect(() => {
    setNickname(localStorage.getItem('nickname'));
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/auth/login');
  };

  const items = [
    {
      key: '1',
      label: <Link href='/words'>요청 페이지</Link>,
    },
    {
      key: '2',
      label: (
        <Link href='/auth/login' onClick={logout}>
          로그아웃
        </Link>
      ),
    },
  ];

  return (
    <HeaderRow>
      <Btn>
        <StyledLink href='/words'>전체용어</StyledLink>
      </Btn>

      {nickname ? (
        <>
          <Dropdown
            menu={{
              items,
            }}
            placement='bottomLeft'
          >
            <Btn Btn>{nickname}님</Btn>
          </Dropdown>
        </>
      ) : (
        <>
          <Btn>
            <StyledLink href='/auth/login'>로그인</StyledLink>
          </Btn>

          <Btn>
            <StyledLink href='/auth/register'>회원가입</StyledLink>
          </Btn>
        </>
      )}
    </HeaderRow>
  );
}

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  color: #666666;
  font-size: 13px;
  font-weight: 200;
  cursor: pointer;

  &:hover {
    color: #000000;
  }
`;

const HeaderRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 38px;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  color: #666666;
  font-size: 13px;
  font-weight: 200;
  text-decoration: none;

  &:hover {
    color: #000000;
  }
`;
