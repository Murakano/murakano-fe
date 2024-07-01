// react
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// style
import styled from 'styled-components';
import { EyeOutlined, EyeInvisibleOutlined, CheckCircleOutlined } from '@ant-design/icons';

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

export default function LoginForm() {
  const router = useRouter();

  // state
  const [view, setView] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [helperText, setHelperText] = useState({
    emailHelper: '',
    passwordHelper: '',
  });
  const [valid, setValid] = useState({
    email: false,
    password: false,
  });

  const [buttonActive, SetButtonActive] = useState(false);

  useEffect(() => {
    if (validateEmail(user.email)) updateState('email', true, setValid);
    else updateState('email', false, setValid);

    if (user.password) updateState('password', true, setValid);
    else updateState('password', false, setValid);
  }, [user]);

  useEffect(() => {
    if (valid.email && valid.password) SetButtonActive(true);
    else SetButtonActive(false);
  }, [valid]);

  // event
  const onEyeClick = () => {
    setView((prev) => !prev);
  };

  const handleLoginButtonClick = async (e) => {
    e.preventDefault();

    const email = user.email;
    const password = user.password;

    if (!email) {
      return updateState('emailHelper', HELPER_TEXT.EMAIL_EMPTY, setHelperText);
    } else if (!validateEmail(email)) {
      return updateState('emailHelper', HELPER_TEXT.EMAIL_VALIDATION_FALSE, setHelperText);
    } else {
      updateState('emailHelper', '', setHelperText);
    }

    if (!password) {
      return updateState('passwordHelper', HELPER_TEXT.PASSWORD_EMPTY, setHelperText);
    }

    const data = {
      email,
      password,
    };

    const response = await api.post('/users/local/login', data);
    if (response?.message == '로그인 성공') {
      return router.push('/');
    }
    alert(ErrorMessage.LOGIN_ERROR);
    router.push('/auth/login');
  };

  const handleRegisterButtonClick = () => {
    router.push('/auth/register');
  };

  return (
    <Form>
      <InputBox
        type='text'
        name='email'
        autoComplete='email'
        placeholder='이메일을 입력해주세요.'
        labelText='이메일'
        input={user.email}
        setInput={setUser}
        helperText={helperText.emailHelper}
        valid={helperText.emailHelper ? false : true}
      />

      <InputBox
        type={view ? 'text' : 'password'}
        name='password'
        autoComplete='current-password'
        placeholder='비밀번호를 입력해주세요.'
        labelText='비밀번호'
        input={user.password}
        setInput={setUser}
        helperText={helperText.passwordHelper}
        valid={helperText.passwordHelper ? false : true}
      >
        <EyeBox onClick={onEyeClick}>
          {view ? <EyeIcon as={EyeOutlined} /> : <EyeIcon as={EyeInvisibleOutlined} />}
        </EyeBox>
      </InputBox>
      <LoginButton onClick={handleLoginButtonClick} $active={buttonActive}>
        로그인
      </LoginButton>
      <RegisterButton onClick={handleRegisterButtonClick}>회원가입</RegisterButton>
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

const EyeBox = styled.div`
  margin-top: -16px;
  position: relative;
  left: 410px;
  top: 40px;
`;

const EyeIcon = styled.div`
  color: #767676b2;
  cursor: pointer;
  &:hover {
    color: #767676;
  }
`;

const LoginButton = styled(Button)`
  color: #ffffff;
  background-color: ${(props) => (props.$active ? 'var(--primary60)' : '#e0e0e0')};
  border: none;
  transition: background-color 0.4s;
  &:hover {
    background-color: ${(props) => (props.$active ? 'var(--primary)' : '#e0e0e0')};
  }
`;

const RegisterButton = styled(Button)`
  color: var(--primary);
  background-color: #ffffff;
  border: 1px solid #cccccc;
`;
