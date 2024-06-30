import React from 'react';
import CommDropdown from '@/components/common/molecules/CommDropdown';
import styled from 'styled-components';

export default function RequestDropdown() {
  const labels = ['전체', '등록요청', '수정요청'];
  return (
    <>
      <CommDropdown labels={labels} dropdownName='전체' />
    </>
  );
}
