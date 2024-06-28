import React from "react";
import ComDropdown from "@/components/common/molecules/ComDropdown";

export default function SortDropdown() {
  const labels = ['A-Z', 'Z-A', '인기순', '최신순'];
  return(
    <>
    <ComDropdown labels={labels} dropdownName="전체"/>
    </>
  );
}