import Button from "@/components/common/atoms/Button"; 
import { Container as MUIContainer } from "@mui/material";
import React from 'react';
import styled from 'styled-components';

function AddRequestBtn() {
    return (
      <StyledContainer>
        <Button onClick={() => alert('버튼이 클릭되었습니다.')}>
          등록 요청하기
        </Button>
      </StyledContainer>
    );
  }

  const StyledContainer = styled.div`
   padding: 29.29px 298px 7.71px 309px;
   background-color: blue;
  `;
  
  export default AddRequestBtn;