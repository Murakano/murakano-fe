import styled from 'styled-components';
import RecentItems from '../molecules/RecentItems';
import { RankItems } from '../molecules/RankItems';
import { StyledSearchOutlined } from '@/styles/commonStyles';
import { useSearchTermStore } from '@/store/useSearchTermStore';

export default function SearchDropdown({ header, onItemClick, ranks, relatedItems }) {
  const { searchTerm } = useSearchTermStore();

  return (
    <DDContainer $header={header}>
      {searchTerm ? (
        <RelatedItems $header={header}>
          {relatedItems &&
            relatedItems.map((item, index) => (
              <RelatedItem $header={header} key={index} onClick={() => onItemClick(item)}>
                <StyledSearchOutlined related='true' />
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
  font-size: ${(props) => (props.$header ? '14px' : '15px')};
  gap: 10px;
  color: #666;
  &:hover {
    color: #000;
    font-size: ${(props) => (props.$header ? '15px' : '16px')};
    cursor: pointer;
    background-color: var(--secondary10);
  }
`;
