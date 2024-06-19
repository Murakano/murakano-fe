import React from "react";
import styled from "styled-components";
import { Row } from "@/styles/commonStyles";

export default function HeaderBtn() {
  return (
    <HeaderRow>
      <Btn>전체 용어</Btn>
      <Btn>회원가입</Btn>
      <Btn>로그인</Btn>
    </HeaderRow>
  );
}

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  color: #666666;
  font-size: 13px;
  font-weight: 200;
  cursor: pointer;
`;

const HeaderRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 38px;
  gap: 10px;
`;
