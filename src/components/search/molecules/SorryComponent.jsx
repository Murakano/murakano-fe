import React from 'react';
import styled from 'styled-components';
import SorryText from '../atoms/SorryText';
import AddRequestBtn from '../atoms/AddRequestBtn';
import { Container } from '@mui/material';

export default function SorryComponent() {
    return (
        <StyledContainer>
            <SorryText />
            <AddRequestBtn />
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
 margin: 0px 330px 386px 330px;
`;