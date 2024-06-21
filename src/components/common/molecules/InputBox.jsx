import React from 'react';
import styled from 'styled-components';
import { Column } from '@/styles/commonStyles';
import { handleInputChange } from '@/utils/stateUtils';
import Input from '../atoms/Input';

export default function InputBox({
  name,
  labelText,
  children,
  type,
  placeholder,
  input,
  setInput,
  helperText,
  isValid,
}) {
  return (
    <Box>
      <Label htmlFor={name}>{labelText}</Label>
      {children}
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={input}
        isValid={isValid}
        onChange={(event) => handleInputChange(event, setInput)}
      />
      <HelperBox>
        <Helper>{helperText}</Helper>
      </HelperBox>
    </Box>
  );
}

const Box = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 10px;
`;

const Label = styled.label`
  font-family: Pretendard;
  padding-top: 1.5px;
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  height: 23px;
`;

const HelperBox = styled.div`
  margin-top: 5px;
  width: 448px;
  height: 23px;
`;

const Helper = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 300;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: #ff0808;
`;
