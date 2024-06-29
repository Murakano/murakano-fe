import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import DownOutlined from '/public/murak_dropdown_chevron-down.svg';

const generateItems = (labels) => {
  return labels.map((label, index) => ({
    value: label.toLowerCase(),
    label: label,
    key: `${index + 1}`,
  }));
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function CommDropdown({ labels = [], dropdownName = '드롭다운' }) {
  const items = generateItems(labels);

  return (
    <DropdownContainer>
      <CustomSelect
        defaultValue={dropdownName}
        onChange={handleChange}
        options={items}
        suffixIcon={<DownIcon />}
        dropdownRender={(menu) => <StyledDropdown>{menu}</StyledDropdown>}
      />
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomSelect = styled(Select)`
  width: 94px;
  && .ant-select-selector {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 13px;
    border: 1px solid var(--secondary);
    transition: border-color 0.3s;
    &:hover {
      border: 1px solid var(--primary);
    }
  }

  .ant-select-selector {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .ant-select-selection-search {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && .ant-select-selection-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; /* 선택된 항목을 selector 안에서 중앙에 배치 */
    text-align: center; /* 선택된 항목 텍스트 중앙 정렬 */
    padding-left: 18px; /* 패딩 추가 중앙 정렬 */
  }

  .ant-select-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const DownIcon = styled(DownOutlined)`
  width: 10px;
  height: 10px;
`;

const StyledDropdown = styled.div`
  .ant-select-dropdown {
    background-color: #f0f0f0; /* 드롭다운 배경색 변경 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 드롭다운 그림자 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    padding: 0px 11px 0px 11px;
    border-radius: 10px;
  }
  .ant-select-item {
    width: auto;
    height: auto;
    padding: 0px 10px;
    gap: 10px;
    &:hover {
      background-color: var(--secondary10);
    }
  }
  .ant-select-item-option-selected {
    background-color: var(--secondary);
  }
  .ant-select-item-option-content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-align: left;
  }
`;
