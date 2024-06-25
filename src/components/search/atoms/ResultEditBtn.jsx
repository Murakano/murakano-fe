// src/components/atoms/EditRequestButton.jsx
import { Container as MuiContainer } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const ResultEditBtn = () => {
  return (
      <CenteredContainer>
        <Button>
          수정 요청하기
        </Button>
      </CenteredContainer>
  );
};

const Button = styled.button`
  width: 110px;
  height: 40px;
  border-radius: 30px;
  border: none;
  background-color: #3C8BFF99;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.03em;
`;


const CenteredContainer = styled(MuiContainer)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default ResultEditBtn;
