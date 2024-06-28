import React from "react";
import CommDropdown from "@/components/common/molecules/CommDropdown";
import styled from "styled-components";

export default function StateDropdown() {
  const labels = ['진행중', '승인완료', '반려'];
  return(
    <>
    <CommDropdown labels={labels} dropdownName="진행 상태"/>
    </>
  );
}

