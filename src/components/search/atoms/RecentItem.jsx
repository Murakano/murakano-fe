import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

export function RecentItem({ children, onRemove, header, onItemClick }) {
  const router = useRouter();
  const isMessage = children === '로그인이 필요한 기능입니다' || children === '최근 검색어가 없습니다.';
  const handleClick = () => {
    if (isMessage && children === '로그인이 필요한 기능입니다') {
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

const HistoryIcon = ({ width = '17', stroke = '#767676' }) => (
  <svg width={width} height={width} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M7.04403 17.8498C10.275 21.0808 15.513 21.0808 18.744 17.8498C21.975 14.6188 21.975 9.38081 18.744 6.14981C15.513 2.91881 10.275 2.91881 7.04403 6.14981L2.83203 10.3618M2.83203 10.3618V5.80081M2.83203 10.3618L7.39303 10.3628M12.886 8.92181V12.7848L15.553 14.0238'
      stroke={stroke}
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const DDItems = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => (props.$header ? '23px' : '28px')};
  color: #666666;
  overflow: hidden;
  font-size: ${(props) => (props.$header ? '13px' : '15px')};
  font-weight: 400;
  width: 100%;
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
  width: ${(props) => (props.header ? '14px' : '18px')};
  stroke: #767676;

  ${DDItem}:hover & {
    stroke: #000000;
  }
`;

const RecentLink = styled.div`
  flex-grow: 1;
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
