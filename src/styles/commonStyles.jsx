// src/styles/commonStyles.js 공통 스타일 정의
import styled from 'styled-components';

// 머라카노 로고 텍스트
export const LogoText = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 70px;
  font-weight: 700;
  text-align: center;
  text-shadow: 3px 4px 1px rgba(118, 118, 118, 0.2);
  color: var(--primary);
  margin-left: 10px;
  font-size: 50px;
`;

// flex-direction: row
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// flex-direction: column
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  margin: ${(props) => props.$marginTop || '130px'} 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  overflow: auto;
`;

// 검색창 스타일
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$header ? '460px' : '580px')};
  height: ${(props) => (props.$header ? '48px' : '64px')};
  left: ${(props) => (props.$header ? '0px' : 'auto')};
  top: ${(props) => (props.$header ? '0px' : 'auto')};
  border: 2px solid var(--secondary);
  border-radius: 50px;
  padding-right: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 30px;
  font-size: ${(props) => (props.$header ? '14px' : '18px')};
  font-weight: 400;
  color: #666666;
  background-color: transparent;
  border: none;
  outline: none;
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export const StyledSearchOutlined = styled(SearchOutlined)`
  width: 32px;
  height: 32px;
  font-size: 30px;
  color: #666666;
`;

export const ResetLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;
