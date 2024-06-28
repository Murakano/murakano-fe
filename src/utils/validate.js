import api from './api';

export const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
export const korPronPattern = /^[가-힣\s]*$/;
export const devTermPattern = /^[a-zA-Z0-9\s\-\.,!@#$%^&*()_+=]*$/;

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
  // 띄어쓰기가 없는지 확인
  if (nickname.indexOf(' ') !== -1) return 'NICKNAME_VALIDATION_FALSE_SPACE';
  // 길이가 10글자 이하인지 확인
  if (nickname.length > 10) return 'NICKNAME_VALIDATION_FALSE_LENGTH';
  if (nickname.length === 0) return 'NICKNAME_EMPTY';
  return true;
};

// 모달 인풋 유효성 검증
export const validateDevTerm = (devTerm) => {
  return devTermPattern.test(devTerm);
};

export const validateCommonPron = (commonPron) => {
  return korPronPattern.test(commonPron);
};

export const validateAwkPron = (awkPron) => {
  return korPronPattern.test(awkPron);
};


const duplicateNickname = async (nickname) => {
  const isDuplicate = await api.get('/users/check/nickname', { nickname });
  if (isDuplicate.isExist) {
    return 'NICKNAME_DUPLICATE';
  }
  return true;
};

const duplicateEmail = async (email) => {
  const isDuplicate = await api.get('/users/check/email', { email });
  if (isDuplicate.isExist) {
    return 'EMAIL_DUPLICATE';
  }
  return true;
};
