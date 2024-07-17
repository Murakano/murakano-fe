// Tooltip.jsx
import styled from 'styled-components';

const Tooltip = styled.div`
  visibility: hidden;
  color: #ff0808; /* 글자 색상 */
  text-align: left;
  padding: 0;
  position: absolute;
  z-index: 1;
  left: 100%; /* 아이콘 오른쪽에 나타나도록 위치 설정 */
  margin-left: 3px; /* 아이콘과의 간격 */
  font-size: 9px; /* 글자 크기 */
  line-height: 13.5px; /* 줄 간격 */
  white-space: nowrap; /* 일렬로 표시 */
`;

export default Tooltip;
