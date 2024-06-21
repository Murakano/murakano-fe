import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Button from '@/components/common/atoms/Button';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import InputBox from '@/components/common/molecules/InputBox';
import { updateState } from '@/utils/stateUtils';
import { validateEmail } from '@/utils/validate';
import { HELPER_TEXT } from '@/constants/helperText';
import api from '@/utils/api';

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

  // event
  const onEyeClick = () => {
    setView((prev) => !prev);
  };

  const handleSubmit = async (e) => {
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
    console.log(response);
    if (response?.message == '로그인 성공') {
      localStorage.setItem('token', response.token);
      return router.push('/');
    }
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
    router.push('/auth/login');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputBox
        type='text'
        name='email'
        placeholder='아이디'
        labelText='아이디'
        input={user.email}
        setInput={setUser}
        helperText={helperText.emailHelper}
        isValid={helperText.emailHelper ? false : true}
      />
      <InputBox
        type={view ? 'text' : 'password'}
        name='password'
        placeholder='비밀번호'
        labelText='비밀번호'
        input={user.password}
        setInput={setUser}
        helperText={helperText.passwordHelper}
        isValid={helperText.passwordHelper ? false : true}
      >
        <EyeBox onClick={onEyeClick}>
          {view ? (
            <EyeOutlined style={{ color: '#767676B2', cursor: 'pointer' }} />
          ) : (
            <EyeInvisibleOutlined style={{ color: '#767676B2', cursor: 'pointer' }} />
          )}
        </EyeBox>
      </InputBox>
      <Button bgcolor='var(--primary60)' color='white'>
        로그인
      </Button>
      <Button bgcolor='white' color='var(--primary)'>
        회원가입
      </Button>
    </Form>
  );
}

const Form = styled.form`
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
