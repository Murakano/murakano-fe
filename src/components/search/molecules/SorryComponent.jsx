import React from 'react';
import styled from 'styled-components';
import SorryText from '../atoms/SorryText';
import AddRequestBtn from '../atoms/AddRequestBtn';
import { Container } from '@mui/material';

export default function SorryComponent() {
    return (
        <Container>
            <SorryText />
            <AddRequestBtn />
        </Container>
    )
}