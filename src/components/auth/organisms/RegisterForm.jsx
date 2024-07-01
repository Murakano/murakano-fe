import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { EyeOutlined, EyeInvisibleOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { ErrorMessage } from '@/constants/errorMessage';
import { updateState } from '@/utils/stateUtils';
import { validateInput } from '@/utils/validate';
import api from '@/utils/api';

import Button from '@/components/common/atoms/Button';
import InputBox from '@/components/common/molecules/InputBox';
import AgreementsBox from '../molecules/AgreementsBox';

export default function RegisterForm() {
  const router = useRouter();
  const [passwordEye, setPasswordEye] = useState(false);
  const [passwordCheckEye, setPasswordCheckEye] = useState(false);
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });
  const [helperText, setHelperText] = useState({
    emailHelper: '',
    nicknameHelper: '',
    passwordHelper: '',
    passwordCheckHelper: '',
  });
  const [valid, setValid] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordCheck: false,
  });
  const [buttonActive, SetButtonActive] = useState(false);
  const [agreements, setAgreements] = useState({
    serviceAgree: false,
    privacyAgree: false,
  });

  useEffect(() => {
    setValid({
      email: user.email && !helperText.emailHelper,
      nickname: user.nickname && !helperText.nicknameHelper,
      password: user.password && !helperText.passwordHelper,
      passwordCheck: user.passwordCheck && !helperText.passwordCheckHelper,
    });
  }, [helperText]);
  let isValid =
    valid.email &&
    valid.password &&
    valid.passwordCheck &&
    valid.nickname &&
    agreements.serviceAgree &&
    agreements.privacyAgree;
  useEffect(() => {
    if (isValid) {
      SetButtonActive(true);
    } else {
      SetButtonActive(false);
    }
  }, [valid, agreements]);

  const passwordEyeClick = () => {
    setPasswordEye((prev) => !prev);
  };
  const passwordCheckEyeClick = () => {
    setPasswordCheckEye((prev) => !prev);
  };

  const handleBlur = (e) => {
    validateInput[e.target.name](e.target.value, updateState, setHelperText);
  };

  const handlePasswordChangeBlur = (e) => {
    validateInput.passwordCheck(user.password, e.target.value, updateState, setHelperText);
  };

  const goLogin = () => {
    router.push('/auth/login');
  };

  // 가입테스트 할 차례
  const handleRegisterButtonClick = async (e) => {
    e.preventDefault();
    if (isValid) {
      const response = await api.post('/users/register', {
        email: user.email,
        nickname: user.nickname,
        password: user.password,
      });
      if (response.message == '회원가입 성공') {
        alert('회원가입이 완료되었습니다.');
        router.push('/auth/login');
      } else {
        console.log(response);
        alert(ErrorMessage.REGISTER_ERROR);
      }
    }
  };

  return (
    <Form>
      <InputBox
        type='text'
        name='email'
        placeholder='이메일을 입력해주세요.'
        labelText='이메일'
        input={user.email}
        onBlur={handleBlur}
        setInput={setUser}
        helperText={helperText.emailHelper}
        valid={helperText.emailHelper ? false : true}
      />
      {valid.email && (
        <CheckIconBox>
          <CheckIcon as={CheckCircleOutlined} />
        </CheckIconBox>
      )}
      {helperText.emailHelper && (
        <CheckIconBox>
          <InfoIcon as={InfoCircleOutlined} />
        </CheckIconBox>
      )}
      <InputBox
        name='nickname'
        placeholder='닉네임을 입력해주세요.'
        labelText='닉네임'
        input={user.nickname}
        onBlur={handleBlur}
        setInput={setUser}
        helperText={helperText.nicknameHelper}
        valid={helperText.nicknameHelper ? false : true}
      ></InputBox>
      {valid.nickname && (
        <CheckIconBox>
          <CheckIcon as={CheckCircleOutlined} />
        </CheckIconBox>
      )}
      {helperText.nicknameHelper && (
        <CheckIconBox>
          <InfoIcon as={InfoCircleOutlined} />
        </CheckIconBox>
      )}
      <InputBox
        type={passwordEye ? 'text' : 'password'}
        name='password'
        placeholder='비밀번호를 입력해주세요.'
        labelText='비밀번호'
        input={user.password}
        onBlur={handleBlur}
        setInput={setUser}
        helperText={helperText.passwordHelper}
        valid={helperText.passwordHelper ? false : true}
      ></InputBox>
      <EyeBox onClick={passwordEyeClick}>
        {passwordEye ? <EyeIcon as={EyeOutlined} /> : <EyeIcon as={EyeInvisibleOutlined} />}
      </EyeBox>
      <InputBox
        type={passwordCheckEye ? 'text' : 'password'}
        name='passwordCheck'
        placeholder='비밀번호를 한번 더 입력해주세요.'
        labelText='비밀번호 확인'
        input={user.passwordCheck}
        onBlur={handlePasswordChangeBlur}
        setInput={setUser}
        helperText={helperText.passwordCheckHelper}
        valid={helperText.passwordCheckHelper ? false : true}
      ></InputBox>
      <EyeBox onClick={passwordCheckEyeClick}>
        {passwordCheckEye ? <EyeIcon as={EyeOutlined} /> : <EyeIcon as={EyeInvisibleOutlined} />}
      </EyeBox>
      <AgreementsBox agreements={agreements} setAgreements={setAgreements} />
      <ButtonContainer>
        <RegisterButton onClick={handleRegisterButtonClick} $active={buttonActive}>
          회원가입
        </RegisterButton>
      </ButtonContainer>
      <LoginText onClick={goLogin}>계정이 이미 있으신가요?</LoginText>
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

const CheckIconBox = styled.div`
  margin-top: -16px;
  position: relative;
  left: 195px;
  top: -50px;
`;

const CheckIcon = styled.div`
  color: #25a971;
`;

const InfoIcon = styled.div`
  color: #ff0752;
`;

const RegisterButton = styled(Button)`
  color: #ffffff;
  background-color: ${(props) => (props.$active ? 'var(--primary60)' : '#e0e0e0')};
  border: none;
  transition: background-color 0.4s;
  &:hover {
    background-color: ${(props) => (props.$active ? 'var(--primary)' : '#e0e0e0')};
  }
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
