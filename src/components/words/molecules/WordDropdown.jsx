import React from "react";
import ComDropdown from "@/components/common/molecules/ComDropdown";

export default function WordDropdown() {
  const labels = ['네트워크', '리눅스', '논리회로', '알고리즘'];
  return(
    <>
    <ComDropdown labels={labels} dropdownName="카테고리"/>
    </>
  );
}