import styled from 'styled-components';

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center; /* 중앙 정렬 */
  &:hover .tooltip {
    visibility: visible;
  }
`;

export default IconContainer;
