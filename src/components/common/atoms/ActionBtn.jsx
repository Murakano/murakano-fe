import styled from 'styled-components';
import React from 'react';

export default function ActionBtn({ children, ...props }) {
  return <ActionButton {...props}>{children}</ActionButton>;
}

// 배경색 기본 값 - 취소 버튼
const ActionButton = styled.button`
  width: 88px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  gap: 10px;
  border-radius: 30px;
  border: none;
  color: white;
  letter-spacing: -0.03em;
  cursor: pointer;
  background-color: #00000040;
`;

// 사용 예시

{
  /* <CancelBtn>취소</CancelBtn>
<RejectBtn>반려</RejectBtn>
<SubmitBtn>제출</SubmitBtn> */
}

// const CancelBtn = styled(ActionBtn)``;
// const RejectBtn = styled(ActionBtn)`
//   background-color: #a4a4a4;
// `;
// const SubmitBtn = styled(ActionBtn)`
//   background-color: var(--main-60, #3c8bff99);
//   &:hover {
//     background-color: var(--primary);
//   }
// `;
