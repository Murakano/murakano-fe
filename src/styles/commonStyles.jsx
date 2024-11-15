// src/styles/commonStyles.js 공통 스타일 정의
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

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
  @media (max-width: 600px) {
    font-size: 36px;
  }
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
  overflow-y: auto;
  @media (max-width: 600px) {
    margin: ${(props) => (props.$marginTop === '38px' ? '38px' : '70px')} 0 0;
  }
`;

// 검색아이콘
export const StyledSearchOutlined = styled(SearchOutlined)`
  width: ${(props) => (props.related ? '17px' : '32px')};
  height: ${(props) => (props.related ? '17px' : '32px')};
  font-size: 30px;
  color: #666666;
  color: var(--primary60);
  &:hover {
    color: var(--primary);
  }

  @media (max-width: 600px) {
    font-size: 23px;
  }
`;
