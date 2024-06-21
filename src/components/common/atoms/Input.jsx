import React from 'react';
import styled from 'styled-components';

export default function Input(props) {
  return <DefaultInput {...props} />;
}

const DefaultInput = styled.input`
  width: 448px;
  height: 55px;
  margin-top: 5px;
  padding-left: 10px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.isValid ? '#cccccc' : '#ff0505')};
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 300;
  line-height: 19.5px;
  letter-spacing: -0.03em;
`;
