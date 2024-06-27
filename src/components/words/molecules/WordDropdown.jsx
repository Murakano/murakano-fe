import React, { useState } from 'react';
import styled from "styled-components";
import DownOutlined from '../../../../public/murak_dropdown_chevron-down.svg';
import { Button, Dropdown, Menu, message } from 'antd';
import WordItem from "../atoms/WordItem";

// 카테고리 드롭다운 
const items = [
  {
    label: '전체',
    key: '0',
  },
  {
    label: '브라우저',
    key: '1',
  },
  {
    label: '프레임워크',
    key: '2',
  },
  {
    label: '형식',
    key: '3',
  },
  {
    label: 'OS',
    key: '4',
  },
];

const wordDirectory = [
  { name: "DOM", pron: "돔", Category: "브라우저" },
  { name: "React", pron: "리액트", Category: "프레임워크" },
  { name: "yml", pron: "야믈", Category: "형식" },
  { name: "Linux", pron: "리눅스", Category: "OS" },
];

export default function WordDropdown() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleMenuClick = (e) => {
    const selectedLabel = items.find(item => item.key === e.key).label;
    setSelectedCategory(selectedLabel);
    message.info(`${selectedLabel} 카테고리 선택됨.`);
    console.log('click', e);
  };

  const filteredWords = selectedCategory === "전체"
    ? wordDirectory
    : wordDirectory.filter(word => word.Category === selectedCategory);

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map(item => (
        <Menu.Item key={item.key}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <DropdownContainer>
        <Dropdown overlay={menu}>
          <Button>
            <NameSpace>
              <NameDiv>
                {selectedCategory}
              </NameDiv>
              <DownOutlinedDiv>
                <DownOutlined />
              </DownOutlinedDiv>
            </NameSpace>
          </Button>
        </Dropdown>
      </DropdownContainer>
    </div>
  );
}

const DropdownContainer = styled.div`
  width: auto;
  height: 35px;
  display: flex;
  gap: 10px;
`;

const NameSpace = styled.div`
  width: auto;
  height: 18px;
  margin: 5.5px 5.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NameDiv = styled.div`
  width: 100%;
  height: 18px;
  margin: 5.5px 9.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownOutlinedDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  box-sizing: border-box; 
`;

const WordListDiv = styled.div`
  width: 691px;
  height: auto;
`;
