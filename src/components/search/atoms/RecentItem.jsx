import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { ResetLink } from '@/styles/commonStyles';

export function RecentItem({ children, onRemove, header, onItemClick }) {
  return (
    <DDItem $header={header}>
      <RecentLink onClick={() => onItemClick(children)}>
        <DDText $header={header}>{children || '최근 검색어가 없습니다.'}</DDText>
      </RecentLink>

      {children && <CloseIcon onClick={() => onRemove(children)} />}
    </DDItem>
  );
}

const DDItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => (props.$header ? '23px' : '28px')};
  color: #666666;
  overflow: hidden;
  font-size: ${(props) => (props.$header ? '13px' : '16px')};
  font-weight: 400;
  width: 100%;
`;

const RecentLink = styled.div`
  flex-grow: 1;
  cursor: pointer;
`;

const DDText = styled.div`
  padding-top: 2px;
  width: 100%;
  height: ${(props) => (props.$header ? '23px' : '28px')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #666666;

  &:hover {
    color: #000000;
    background-color: var(--secondary10);
  }
`;

const CloseIcon = styled(CloseOutlined)`
  font-size: 10px;
  cursor: pointer;
  &:hover {
    color: #000000;
  }
`;
