// IconContainer.jsx
import styled from 'styled-components';

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end; /* 바닥에 정렬 */
  &:hover .tooltip {
    visibility: visible;
  }
`;

export default IconContainer;
