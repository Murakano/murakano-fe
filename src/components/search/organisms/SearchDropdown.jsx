import React from 'react';

import styled from 'styled-components';
import RecentItems from '../molecules/RecentItems';
import { RankItems } from '../molecules/RankItems';

export default function SearchDropdown({ header, onItemClick, searchTerm, ranks }) {
  return (
    <DDContainer $header={header}>
      {searchTerm ? (
        // TODO: searchTerm을 사용하여 연관 검색어를 가져옵니다.
        <></>
      ) : (
        <>
          <RecentItems header={header} onItemClick={onItemClick} />
          <Divider />
          <RankItems header={header} onItemClick={onItemClick} ranks={ranks} />
        </>
      )}
    </DDContainer>
  );
}

const DDContainer = styled.div`
  width: ${(props) => (props.$header ? '460px' : '580px')};
  height: ${(props) => (props.$header ? '335px' : '390px')};
  margin: ${(props) => (props.$header ? '0' : '23px 0 38px')};
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: var(--search-shadow);
  display: flex;
  background-color: #ffffff;
  position: ${(props) => (props.$header ? 'absolute' : 'static')};
  top: ${(props) => (props.$header ? '100px' : 'auto')};
`;
const Divider = styled.div`
  width: 1px;
  background-color: rgba(184, 213, 255, 0.3);
  height: 85%; /* 높이를 컨테이너 높이의 80%로 설정 */
  align-self: center; /* 세로 가운데 정렬 */
`;
