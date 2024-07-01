import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
// import HistoryIcon from '@mui/icons-material/History';

const HistoryIcon = ({ width = '17', stroke = '#767676' }) => (
  <svg width={width} height={width} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M7.04403 17.8498C10.275 21.0808 15.513 21.0808 18.744 17.8498C21.975 14.6188 21.975 9.38081 18.744 6.14981C15.513 2.91881 10.275 2.91881 7.04403 6.14981L2.83203 10.3618M2.83203 10.3618V5.80081M2.83203 10.3618L7.39303 10.3628M12.886 8.92181V12.7848L15.553 14.0238'
      stroke={stroke}
      stroke-width='1.5'
      stroke-miterlimit='10'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);

export function RecentItem({ children, onRemove, header, onItemClick }) {
  return (
    <DDItems $header={header}>
      <DDItem>
        {children && <HistoryIcon width={header ? '14' : '18'} stroke='#767676' />}
        <RecentLink onClick={() => onItemClick(children)}>
          {/* TODO : ( 최근검색어 글자가 헤더에서 크기 안줄어듬... + hover효과 제외 + 클릭 방지 구현 ) */}
          <DDText $header={header}>{children || '최근 검색어가 없습니다.'}</DDText>
          {children && (
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
