import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row } from '@/styles/commonStyles';
import Link from 'next/link';
import { Dropdown } from 'antd';
import api from '@/utils/api';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import { MenuOutlined } from '@ant-design/icons';

export default function HeaderBtn() {
  const router = useRouter();
  const { clearAuthData, nickname } = useAuthStore();

  const logout = async () => {
    try {
      const response = await api.post('/users/logout');
      if (response.message == '로그아웃 성공') {
        clearAuthData();
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

  const mobileNotLoggedInItems = [
    {
      key: '1',
      label: <StyledLink href='/words'>전체용어</StyledLink>,
    },
    {
      key: '2',
      label: <StyledLink href='/auth/login'>로그인</StyledLink>,
    },
    {
      key: '3',
      label: <StyledLink href='/auth/register'>회원가입</StyledLink>,
    },
  ];

  const mobileLoggedInItems = [
    {
      key: '1',
      label: <StyledLink href='/words'>전체용어</StyledLink>,
    },
    {
      key: '2',
      label: <StyledLink href='/auth/requests'>요청 페이지</StyledLink>,
    },
    {
      key: '3',
      label: <Logout onClick={logout}>로그아웃</Logout>,
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
          <MobileBtn>
            <Dropdown
              menu={{
                items: mobileLoggedInItems,
              }}
              placement='bottom'
            >
              <MenuOutlined />
            </Dropdown>
          </MobileBtn>
        </>
      ) : (
        <>
          <Btn>
            <StyledLink href='/auth/login'>로그인</StyledLink>
          </Btn>

          <Btn>
            <StyledLink href='/auth/register'>회원가입</StyledLink>
          </Btn>
          <MobileBtn>
            <Dropdown
              menu={{
                items: mobileNotLoggedInItems,
              }}
              placement='bottom'
            >
              <MenuOutlined />
            </Dropdown>
          </MobileBtn>
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
  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileBtn = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    color: #666666;
    font-size: 20px;
    font-weight: 200;
    cursor: pointer;
  }
`;

const HeaderRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 38px;
  gap: 10px;
  @media (max-width: 600px) {
    order: 1;
    width: auto;
    padding: 10px;
    background-color: pink;
    /* display: none; */
  }
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
