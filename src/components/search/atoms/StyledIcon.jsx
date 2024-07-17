// StyledIcon.jsx
import styled from 'styled-components';
import EditQuestionMarkIcon from '@/components/search/atoms/QuestionMark.svg';

const StyledIcon = styled(EditQuestionMarkIcon)`
  width: 15px;
  height: 14px;
  display: inline-flex; /* 아이콘을 인라인 블록으로 설정 */
  align-items: center; /* 중앙 정렬 */
`;

export default StyledIcon;
