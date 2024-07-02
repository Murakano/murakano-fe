import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row } from '@/styles/commonStyles';
import Link from 'next/link';
import { Dropdown } from 'antd';
import api from '@/utils/api';
import { ErrorMessage } from '@/constants/errorMessage';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';

export default function HeaderBtn({ pathname }) {
  const router = useRouter();
  const { accessToken, setAuthData, nickname, clearAuthData, fetchAuthData } = useAuthStore();
  const [headerNickname, setHeaderNickname] = useState(nickname);

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      console.log('토큰업셔');
      fetchAuthData();
      console.log(1, nickname);
      setHeaderNickname(nickname);
      console.log(2, headerNickname);
    }
  }, [pathname, headerNickname]);

  const logout = async () => {
    try {
      const response = await api.post('/users/logout');
      if (response.message == '로그아웃 성공') {
        clearAuthData();
        setHeaderNickname();
        alert('로그아웃 되었습니다.');
        router.push('/auth/login');
      }
    } catch (err) {
      alert('로그아웃 실패');
      console.log(err);
    }
  };

  const items = [
    {
      key: '1',
      label: <Link href='/auth/requests'>요청 페이지</Link>,
    },
    {
      key: '2',
      label: <Logout onClick={logout}>로그아웃</Logout>,
    },
  ];

  return (
    <HeaderRow>
      <Btn>
        <StyledLink href='/words'>전체용어</StyledLink>
      </Btn>

      {headerNickname ? (
        <>
          <Dropdown
            menu={{
              items,
            }}
            placement='bottomLeft'
          >
            <Btn>{headerNickname}님</Btn>
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

const Logout = styled.div``;
