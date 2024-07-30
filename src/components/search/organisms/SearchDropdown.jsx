import styled, { keyframes } from 'styled-components';
import RecentItems from '../molecules/RecentItems';
import { RankItems } from '../molecules/RankItems';
import { StyledSearchOutlined } from '@/styles/commonStyles';
import { useSearchTermStore } from '@/store/useSearchTermStore';
import { useState, useEffect } from 'react';

export default function SearchDropdown({
  header,
  onItemClick,
  ranks,
  relatedItems,
  dropdownVisible,
  focusedIndex,
  setDropdownVisible,
}) {
  const { searchTerm } = useSearchTermStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setVisible(true);
    } else {
      // setTimeout(() => setVisible(false), 500); // 500ms after animation duration
    }
  }, [searchTerm]);

  return (
    <DDContainer $header={header} $dropdownVisible={dropdownVisible} $visible={visible}>
      {searchTerm ? (
        <RelatedItems $header={header}>
          {relatedItems &&
            relatedItems.map((item, index) => (
              <RelatedItem
                $header={header}
                key={index}
                onClick={() => onItemClick(item)}
                $focused={index === focusedIndex} // 포커스된 아이템 스타일 적용
              >
                <StyledSearchOutlined related='true' />
                {item}
              </RelatedItem>
            ))}
        </RelatedItems>
      ) : (
        <>
          <RecentItems header={header} onItemClick={onItemClick} setDropdownVisible={setDropdownVisible} />
          <Divider $header={header} />
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
  z-index: 10;
  @media (max-width: 600px) {
    width: ${(props) => (props.$header ? 'calc(100% - 145px)' : '330px')};
    height: 300px;
    top: ${(props) => (props.$header ? '65px' : 'auto')};
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: rgba(184, 213, 255, 0.3);
  height: 85%; /* 높이를 컨테이너 높이의 85%로 설정 */
  align-self: center; /* 세로 가운데 정렬 */
  @media (max-width: 600px) {
    display: ${(props) => (props.$header ? 'none' : 'block')};
  }
`;

const RelatedItems = styled.div`
  padding: 25px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$header ? '1px' : '7px')};
  @media (max-width: 600px) {
    padding: 20px;
    gap: 7px;
  }
`;

const RelatedItem = styled.div`
  height: 28px;
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: ${(props) => (props.$header ? '14px' : '15px')};
  background-color: ${(props) => (props.$focused ? 'var(--secondary10)' : 'transparent')}; /* 포커스된 아이템 배경색 */
  gap: 10px;
  color: ${(props) => (props.$focused ? '#000' : '#666')};
  font-size: ${(props) => (props.$focused ? (props.$header ? '15px' : '16px') : props.$header ? '14px' : '15px')};
  cursor: ${(props) => (props.$focused ? 'pointer' : 'default')};

  &:hover {
    color: #000;
    font-size: ${(props) => (props.$header ? '15px' : '16px')};
    cursor: pointer;
    background-color: var(--secondary10);
  }

  @media (max-width: 600px) {
    font-size: 11px;
    padding: 5px;
    height: 20px;
    &:hover {
      color: #000;
      font-size: 12px;
    }
  }
`;
