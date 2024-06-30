export const HELPER_TEXT = {
  EMAIL_VALIDATION_FALSE: '* 올바른 이메일 주소 형식을 입력해주세요.',
  EMAIL_EMPTY: '* 이메일을 입력해주세요.',
  EMAIL_DUPLICATE: '* 중복된 이메일 입니다.',
  PASSWORD_EMPTY: '* 비밀번호를 입력해주세요.',
  PASSWORD_VALIDATION_FALSE:
    '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야합니다.',
  PASSWORD_CHECK_EMPTY: '* 비밀번호를 한번 더 입력해주세요.',
  PASSWORD_NOT_SAME: '* 비밀번호가 일치하지 않습니다.',
  NICKNAME_EMPTY: '* 닉네임을 입력해주세요.',
  NICKNAME_VALIDATION_FALSE: '* 띄워쓰기 불가, 10글자 이내',
  NICKNAME_DUPLICATE: '* 중복된 닉네임 입니다.',
  REQUIRED_INPUT_EMPTY: '* 필수 입력 값입니다.',
  ONLY_ENGLISH_INPUT: '* 영어만 입력 가능합니다.',
  ONLY_KOREAN_INPUT: '* 한글만 입력 가능합니다.',
  EXCEED_LENGTH: (maxLength) => `* ${maxLength}글자를 초과할 수 없습니다.`,
};
