import React from "react";
import CommDropdown from "@/components/common/molecules/CommDropdown";

export default function SortDropdown() {
  const labels = ['A-Z', 'Z-A', '인기순', '최신순'];
  return(
    <>
    <CommDropdown labels={labels} dropdownName="전체"/>
    </>
  );
}