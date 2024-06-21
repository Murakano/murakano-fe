import styled from 'styled-components';
import React from 'react';

export default function Button(props) {
  return <Btn {...props}>{props.children}</Btn>;
}

const Btn = styled.button`
  font-family: Pretendard;
  width: ${(props) => (props.w ? props.w : '448px')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  font-weight: 700;
  line-height: 24px;
  height: ${(props) => (props.h ? props.h : '55px')};
  margin: 10px 0;
  border: 1px solid #cccccc;
  border-radius: 10px;
  letter-spacing: -0.03em;
  color: ${(props) => (props.color ? props.color : 'black')};
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : 'white')};
  cursor: pointer;
`;
