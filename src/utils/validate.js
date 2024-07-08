import api from './api';
import { HELPER_TEXT } from '@/constants/helperText';

export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// 이메일 유효성 검증
export const validateEmail = (email) => {
  return emailPattern.test(email);
};

// 비밀번호 유효성 검증
export const validatePassword = (password) => {
  return passwordPattern.test(password);
};

// 닉네임 유효성 검증
export const validateNickname = (nickname) => {
  if (nickname.indexOf(' ') !== -1 || nickname.length > 10) return 'NICKNAME_VALIDATION_FALSE';
  if (nickname.length === 0) return 'NICKNAME_EMPTY';
  return true;
};

// 모달 인풋 유효성 검증
export const validateLength = (input, maxLength) => {
  return input?.length <= maxLength;
};

const duplicateNickname = async (nickname) => {
  const isDuplicate = await api.get('/users/check/nickname', { nickname });
  if (isDuplicate?.data?.isUserExist) {
    return 'NICKNAME_DUPLICATE';
  }
  if (isDuplicate?.type) {
    return 'NICKNAME_VALIDATION_WRONG';
  }
  return true;
};

const duplicateEmail = async (email) => {
  const isDuplicate = await api.get('/users/check/email', { email });
  if (isDuplicate?.data.isUserExist) {
    return 'EMAIL_DUPLICATE';
  }
  return true;
};

export const validateInput = {
  email: async (email, setState, setHelperText) => {
    if (email === '') return setState('emailHelper', HELPER_TEXT.EMAIL_EMPTY, setHelperText);
    if (validateEmail(email)) {
      let isDuplicate = await duplicateEmail(email);
      if (isDuplicate !== true) {
        return setState('emailHelper', HELPER_TEXT[isDuplicate], setHelperText);
      }
      return setState('emailHelper', '', setHelperText);
    }
    setState('emailHelper', HELPER_TEXT.EMAIL_VALIDATION_FALSE, setHelperText);
  },
  password: (password, setState, setHelperText) => {
    if (password === '') setState('passwordHelper', HELPER_TEXT.PASSWORD_EMPTY, setHelperText);
    else {
      validatePassword(password)
        ? setState('passwordHelper', '', setHelperText)
        : setState('passwordHelper', HELPER_TEXT.PASSWORD_VALIDATION_FALSE, setHelperText);
    }
  },
  passwordCheck: (password, passwordCheck, setState, setHelperText) => {
    if (passwordCheck === '') return setState('passwordCheckHelper', HELPER_TEXT.PASSWORD_CHECK_EMPTY, setHelperText);
    if (!validatePassword(passwordCheck))
      return setState('passwordCheckHelper', HELPER_TEXT.PASSWORD_VALIDATION_FALSE, setHelperText);
    else {
      password === passwordCheck
        ? setState('passwordCheckHelper', '', setHelperText)
        : setState('passwordCheckHelper', HELPER_TEXT.PASSWORD_NOT_SAME, setHelperText);
    }
  },
  nickname: async (nickname, setState, setHelperText) => {
    if (nickname === '') setState('nicknameHelper', HELPER_TEXT.NICKNAME_EMPTY, setHelperText);
    else {
      let isValidate = validateNickname(nickname);
      console.log(isValidate);
      if (isValidate === true) {
        let isDuplicate = await duplicateNickname(nickname);
        if (isDuplicate !== true) {
          return setState('nicknameHelper', HELPER_TEXT[isDuplicate], setHelperText);
        }
        setState('nicknameHelper', '', setHelperText);
        return true;
      }
      return setState('nicknameHelper', HELPER_TEXT[isValidate], setHelperText);
    }
  },
};
