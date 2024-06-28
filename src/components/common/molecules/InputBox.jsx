import React from 'react';
import styled from 'styled-components';
import { Column } from '@/styles/commonStyles';
import { handleInputChange } from '@/utils/stateUtils';
import Input from '../atoms/Input';

export default function InputBox({
  name, className, labelText, children, type, placeholder, input, setInput, helperText,
  valid,
}) {
  return (
    <Box className={className}>
      <Label htmlFor={name} className='Label'>
        {labelText}
      </Label>
      {children}
      <Input
        className='Input'
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={input}
        valid={valid}
        onChange={(event) => handleInputChange(event, setInput)}
      />
      <HelperBox>
        <Helper>{helperText}</Helper>
      </HelperBox>
    </Box>
  );
}

const Box = styled(Column)`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.label`
  padding-top: 1.5px;
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  height: 23px;
`;

const HelperBox = styled.div`
  margin-top: 5px;
  width: 498px;
  height: 25px;
`;

const Helper = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: #ff0808;
`;
