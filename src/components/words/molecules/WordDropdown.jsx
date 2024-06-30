import React from 'react';
import CommDropdown from '@/components/common/molecules/CommDropdown';

export default function WordDropdown() {
  const labels = ['리눅스', '네트워크', '논리회로', '알고리즘'];
  return (
    <>
      <CommDropdown labels={labels} dropdownName='카테고리' />
    </>
  );
}
