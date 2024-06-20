import React from "react";
import styled from "styled-components";
import { Row } from "@/styles/commonStyles";
import Link from "next/link";

export default function HeaderBtn() {
  return (
    <HeaderRow>
      <Btn>
        <StyledLink href="/words">전체용어</StyledLink>
      </Btn>
      <Btn>
        <StyledLink href="/auth/signup">회원가입</StyledLink>
      </Btn>
      <Btn>
        <StyledLink href="/auth/login">로그인</StyledLink>
      </Btn>
      {/* 임시방편 */}
      <Btn>
        <StyledLink href="/auth/requests">내요청</StyledLink>
      </Btn>
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

const StyledLink = styled(Link)`
  color: #666666;
  font-size: 13px;
  font-weight: 200;
  text-decoration: none;

  &:hover {
    color: #000000;
  }
`;
