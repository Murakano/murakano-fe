import React from 'react';
import CommDropdown from '@/components/common/molecules/CommDropdown';
import styled from 'styled-components';

export default function StateDropdown({onChange}) {
  const labels = ['전체', '반려', '승인 전', '승인완료', ];
  return (
    <>
      <CommDropdown labels={labels} dropdownName='진행 상태' onChange={(value) => onChange(value)} />
    </>
  );
}
