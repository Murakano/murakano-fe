// LabelWithTooltip.jsx
import React from 'react';
import LabelWithIcon from '@/components/search/molecules/LabelWithIcon';
import IconContainer from '@/components/search/molecules/IconContainer';
import Tooltip from '@/components/search/atoms/Tooltip';
import StyledIcon from '@/components/search/atoms/StyledIcon';

const LabelWithTooltip = () => (
  <LabelWithIcon>
    개발 용어 (영어)
    <IconContainer>
      <StyledIcon />
      <Tooltip className="tooltip">개발 용어 표기 수정을 원하는 경우, 추가 정보에 입력해주세요.</Tooltip>
    </IconContainer>
  </LabelWithIcon>
);

export default LabelWithTooltip;
