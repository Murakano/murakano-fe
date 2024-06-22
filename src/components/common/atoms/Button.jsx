import styled from 'styled-components';
import React from 'react';

export default function Button({ children, ...props }) {
  return <Btn {...props}>{children}</Btn>;
}

const Btn = styled.button`
  width: var(--input-width);
  height: 55px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  margin: 10px 0;
  padding: 8px 30px;
  border-radius: 10px;
  border: none;
  color: black;
  letter-spacing: -0.03em;
  cursor: pointer;
`;
