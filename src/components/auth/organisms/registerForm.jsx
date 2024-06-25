// react
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// style
import styled from 'styled-components';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// constants
import { HELPER_TEXT } from '@/constants/helperText';
import { ErrorMessage } from '@/constants/errorMessage';

// utils
import { updateState } from '@/utils/stateUtils';
import { validateEmail } from '@/utils/validate';
import api from '@/utils/api';

// components
import Button from '@/components/common/atoms/Button';
import InputBox from '@/components/common/molecules/InputBox';
import AgreementsBox from '../molecules/AgreementsBox';

export default function RegisterForm() {
  const router = useRouter();

  // state
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const [helperText, setHelperText] = useState({
    emailHelper: '',
    passwordHelper: '',
    passwordCheckHelper: '',
    nicknameHelper: '',
  });

  const [buttonActive, SetButtonActive] = useState(false);

  // event
  const onEyeClick1 = () => {
    setEye1((prev) => !prev);
  };
  const onEyeClick2 = () => {
    setEye2((prev) => !prev);
  };

  const handleRegisterButtonClick = () => {};

  return (
    <Form>
      <InputBox
        type='text'
        name='email'
        placeholder='이메일을 입력해주세요.'
        labelText='이메일'
        input={user.email}
        setInput={setUser}
        helperText={helperText.emailHelper}
        valid={helperText.emailHelper ? false : true}
      />
      <InputBox
        type={eye1 ? 'text' : 'password'}
        name='password'
        placeholder='비밀번호를 입력해주세요.'
        labelText='비밀번호'
        input={user.password}
        setInput={setUser}
        helperText={helperText.passwordHelper}
        valid={helperText.passwordHelper ? false : true}
      ></InputBox>
      <EyeBox1 onClick={onEyeClick1}>
        {eye1 ? <EyeIcon as={EyeOutlined} /> : <EyeIcon as={EyeInvisibleOutlined} />}
      </EyeBox1>
      <InputBox
        type={eye2 ? 'text' : 'password'}
        name='passwordCheck'
        placeholder='비밀번호를 한번 더 입력해주세요.'
        labelText='비밀번호 확인'
        input={user.passwordCheck}
        setInput={setUser}
        helperText={helperText.passwordCheckHelper}
        valid={helperText.passwordCheckHelper ? false : true}
      ></InputBox>
      <EyeBox1 onClick={onEyeClick2}>
        {eye2 ? <EyeIcon as={EyeOutlined} /> : <EyeIcon as={EyeInvisibleOutlined} />}
      </EyeBox1>
      <InputBox
        name='nickname'
        placeholder='닉네임을 입력해주세요.'
        labelText='닉네임'
        input={user.nickname}
        setInput={setUser}
        helperText={helperText.nicknameHelper}
        valid={helperText.nicknameHelper ? false : true}
      ></InputBox>
      <AgreementsBox />
      <ButtonContainer>
        <RegisterButton onClick={handleRegisterButtonClick}>회원가입</RegisterButton>
      </ButtonContainer>
      <LoginText>계정이 이미 있으신가요?</LoginText>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EyeBox1 = styled.div`
  margin-top: -16px;
  position: relative;
  left: 195px;
  top: -51px;
`;

const EyeIcon = styled.div`
  color: #767676b2;
  cursor: pointer;
  &:hover {
    color: #767676;
  }
`;

const RegisterButton = styled(Button)`
  color: white;
  background-color: #e0e0e0;
  border: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px 0px;
`;

const LoginText = styled.div`
  cursor: pointer;
  padding: 11.5px 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #666666;
  letter-spacing: -0.03%;
`;
