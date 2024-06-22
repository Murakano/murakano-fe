import React from 'react';
import styled from 'styled-components';

export default function Input({ valid, ...props }) {
  return <DefaultInput {...props} $valid={valid} />;
}

const DefaultInput = styled.input`
  width: var(--input-width);
  height: 55px;
  margin-top: 5px;
  padding: 17.5px 20px;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.$valid ? '#cccccc' : '#ff0505')};
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  letter-spacing: -0.03em;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;
