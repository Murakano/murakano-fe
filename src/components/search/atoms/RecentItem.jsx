import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { HistoryIcon } from './HistoryIcon';

export function RecentItem({ children, onRemove, header, onItemClick }) {
  const router = useRouter();
  const isMessage = children === '로그인이 필요한 기능입니다.' || children === '최근 검색어가 없습니다.';
  const handleClick = () => {
    if (isMessage && children === '로그인이 필요한 기능입니다.') {
      router.push('/auth/login');
    } else if (!isMessage) {
      onItemClick(children);
    }
  };

  return (
    <DDItems $header={header}>
      <DDItem>
        {!isMessage && <Icon header={header} />}
        <RecentLink onClick={handleClick}>
          <DDText $header={header}>{children}</DDText>
          {children && !isMessage && (
            <CloseIcon
              onClick={(event) => {
                event.stopPropagation();
                onRemove(children);
              }}
            />
          )}
        </RecentLink>
      </DDItem>
    </DDItems>
  );
}

const DDItems = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => (props.$header ? '23px' : '28px')};
  color: #666666;
  white-space: nowrap;
  font-size: ${(props) => (props.$header ? '13px' : '15px')};
  font-weight: 400;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 11px;
    height: ${(props) => (props.$header ? '23px' : '20px')};
  }
`;

const DDItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
  &:hover {
    color: #000000;
    background-color: var(--secondary10);
  }
`;

const Icon = styled(HistoryIcon)`
  stroke: #767676;

  ${DDItem}:hover & {
    stroke: #000000;
  }
`;

const RecentLink = styled.div`
  flex-grow: 1;
  width: ${(props) => (props.$header ? '128px' : '197.5px')};
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DDText = styled.div`
  padding-top: 2px;
  width: 100%;
  height: ${(props) => (props.$header ? '23px' : '28px')};
  font-size: ${(props) => (props.$header ? '13px' : '15px')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #666666;

  ${DDItem}:hover & {
    color: #000000;
    font-size: ${(props) => (props.$header ? '14px' : '16px')};
  }

  @media (max-width: 600px) {
    font-size: 11px;
    height: ${(props) => (props.$header ? '23px' : '20px')};
  }
`;

const CloseIcon = styled(CloseOutlined)`
  font-size: 10px;
  cursor: pointer;
  visibility: hidden; /* 기본적으로는 숨김 처리 */

  ${RecentLink}:hover & {
    visibility: visible; /* RecentLink에 호버할 때만 CloseIcon을 보이도록 함 */
  }

  &:hover {
    color: #000000;
  }
`;
