import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RecentItems from '../molecules/RecentItems';
import { RankItems } from '../molecules/RankItems';
import { StyledSearchOutlined } from '@/styles/commonStyles';
import api from '@/utils/api';
import { debounce } from 'lodash';

export default function SearchDropdown({ header, related, onItemClick, searchTerm, ranks }) {
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      // 검색어가 변경될 때마다 API 요청을 보내기 위해 debounce 적용 - 300ms
      const fetchRelatedItems = debounce(async () => {
        try {
          const response = await api.get(`/words/keyword`, { keyword: searchTerm, limit: 10 });
          response.data ? setRelatedItems(response.data) : setRelatedItems([searchTerm]);
        } catch (error) {
          console.error(error);
        }
      }, 300);

      fetchRelatedItems();
    }
  }, [searchTerm]);

  return (
    <DDContainer $header={header}>
      {searchTerm ? (
        <RelatedItems $header={header}>
          {relatedItems &&
            relatedItems.map((item, index) => (
              <RelatedItem $header={header} key={index} onClick={() => onItemClick(item)}>
                <StyledSearchOutlined $header={header} related={related} />
                {item}
              </RelatedItem>
            ))}
        </RelatedItems>
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

const RelatedItems = styled.div`
  padding: 25px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$header ? '1px' : '7px')};
`;

const RelatedItem = styled.div`
  height: 28px;
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: ${(props) => (props.$header ? '14px' : '17px')};
  gap: 10px;
  color: #666;
  &:hover {
    color: #000;
    font-size: ${(props) => (props.$header ? '15px' : '18px')};
    cursor: pointer;
    background-color: var(--secondary10);
  }
`;
