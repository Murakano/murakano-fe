// src/components/atoms/AddRequestBtn.jsx
import React from 'react';
import styled from 'styled-components';

const AddRequestBtn = () => {
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
  margin: 30px 44.5px 136.04px 44.5px;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  height: 100%;
`;

export default AddRequestBtn;
