import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row } from '@/styles/commonStyles';
import Link from 'next/link';
import { Dropdown } from 'antd';
import { jwtDecode } from 'jwt-decode';
import api from '@/utils/api';
import { ErrorMessage } from '@/constants/errorMessage';
import { useRouter } from 'next/router';

export default function HeaderBtn({ pathname }) {
  const router = useRouter();

  const [nickname, setNickname] = useState('');

  const refreshAccessToken = async () => {
    try {
      const response = await api.post('/users/refresh');

      if (response.message == 'refresh token이 존재하지 않습니다.') return;
      else if (response.message == 'refresh token 검증중 오류가 발생하였습니다.') {
        alert('다시 로그인해주세요.');
        router.push('/auth/login');
      }
      const newAccessToken = response.newAccessToken;
      return newAccessToken;
    } catch (error) {
      console.log(ErrorMessage.TOKEN_ERROR);
      return;
    }
  };

  const setUserNickname = async () => {
    let token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];
    if (!token) {
      token = await refreshAccessToken();
    }
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setNickname(decoded.nickname);
      } catch (err) {
        document.cookie = 'accessToken=; Max-Age=0; path=/';
      }
    }
  };

  useEffect(() => {
    setUserNickname();
  }, [pathname]);

  const logout = async () => {
    await api.post('/users/logout');
    setNickname('');
    alert('로그아웃 되었습니다.');
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
            <Btn>{nickname}님</Btn>
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
