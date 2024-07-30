import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default function AgreementsBox({ agreements, setAgreements }) {
  const agreeAll = agreements.serviceAgree && agreements.privacyAgree;

  const handleAgreeAllChange = () => {
    const newValue = !agreeAll;
    setAgreements({
      serviceAgree: newValue,
      privacyAgree: newValue,
    });
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <AgrBox>
      <PrimaryCheckboxContainer>
        <PrimaryCheckbox
          id='agreeAll'
          type='checkbox'
          name='agreeAll'
          checked={agreeAll}
          onChange={handleAgreeAllChange}
        />
        <PrimaryLabel htmlFor='agreeAll'>모든 약관 사항에 전체 동의합니다.</PrimaryLabel>
      </PrimaryCheckboxContainer>
      <Line />
      <CheckboxContainer>
        <Checkbox
          id='serviceAgree'
          type='checkbox'
          name='serviceAgree'
          checked={agreements.serviceAgree}
          onChange={handleAgreementChange}
        />
        <Label htmlFor='serviceAgree'>서비스 이용 약관 동의 (필수)</Label>
        <Details href='/policy' target='_blank' rel='noopener noreferrer'>
          자세히
        </Details>
      </CheckboxContainer>

      <CheckboxContainer>
        <Checkbox
          id='privacyAgree'
          type='checkbox'
          name='privacyAgree'
          checked={agreements.privacyAgree}
          onChange={handleAgreementChange}
        />
        <Label htmlFor='privacyAgree'>개인정보 수집 및 이용 동의 (필수)</Label>
        <Details href='/policy/privacy' target='_blank' rel='noopener noreferrer'>
          자세히
        </Details>
      </CheckboxContainer>
    </AgrBox>
  );
}
const AgrBox = styled.div`
  width: 100%;
  padding-top: 23px;
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
`;

const CheckboxContainer = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  margin-top: 14px;
  margin-bottom: 11px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 9px;
  border: 2px solid #bababa;
  outline: none;
  appearance: none;
  border-radius: 3px;
  &:checked {
    appearance: checkbox;
  }
`;

const PrimaryCheckboxContainer = styled(CheckboxContainer)`
  margin-top: 0;
  & > input {
    border: 2px solid var(--primary);
  }
`;

const PrimaryCheckbox = styled(Checkbox)`
  border: 2px solid var(--primary);
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #666666;
  flex-grow: 1;
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const PrimaryLabel = styled.label`
  font-weight: 700;
  font-size: 18px;
  color: #666666;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Details = styled(Link)`
  text-decoration: none;
  color: #666666;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  user-select: none;

  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

// sms, email 마케팅 보류 관련 코드*/

// --------------- hook ---------------
// const [showDetails, setShowDetails] = useState(false);

// --------------- component ---------------
{
  /* <CheckboxContainer>
<Checkbox type='checkbox' id='marketingAgree' />
<Label htmlFor='marketingAgree'>마케팅 정보 수신 동의 (선택)</Label>
<Details onClick={() => setShowDetails(!showDetails)}>
    {showDetails ? <Arrow src='/under-arrow.svg' /> : '자세히'}
</Details>
</CheckboxContainer>

{showDetails && (
<SubCheckboxContainer>
    <CheckboxContainer>
    <Checkbox type='checkbox' id='smsAgree' />
    <Label htmlFor='smsAgree'>SMS 수신 동의</Label>
    </CheckboxContainer>

    <CheckboxContainer>
    <Checkbox type='checkbox' id='emailAgree' />
    <Label htmlFor='emailAgree'>이메일 수신 동의</Label>
    </CheckboxContainer>
</SubCheckboxContainer>
)}  */
}

// --------------- style ---------------
// const Arrow = styled.img`
//   width: 11px;
//   height: 5.5px;
// `;

// const SubCheckboxContainer = styled.div`
//   margin-left: 20px;
// `;
