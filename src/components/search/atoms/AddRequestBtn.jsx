// src/components/atoms/EditRequestButton.jsx
import { Container as MuiContainer } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const EditRequestButton = () => {
  return (
    <StyledContainer>
      <CenteredContainer>
        <Button>
          등록 요청하기
        </Button>
      </CenteredContainer>
    </StyledContainer>
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
  text-align: center;
`;

const StyledContainer = styled.div`
  width: 691px;
  height: 61px;
  padding: 0px 0px 0px 10px;

`;

const CenteredContainer = styled(MuiContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: blue;
  padding: 15px 0px 0px 10px;
`;

export default EditRequestButton;
