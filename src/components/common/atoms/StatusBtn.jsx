import styled from 'styled-components';

export default function StatusBtn({ children, ...props }) {
  return <StatusButton {...props}>{children}</StatusButton>;
}

const StatusButton = styled.button`
  width: 58px;
  height: 24px;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  gap: 10px;
  border-radius: 30px;
  border: none;
  color: #ffffff;
  letter-spacing: -0.03em;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? 'var(--primary)' : '#b8d5ff')};
`;

// 사용 예시

// <StatusBtn>승인 전</StatusBtn>
// <StatusBtn $active={true}>승인 완료</StatusBtn>
