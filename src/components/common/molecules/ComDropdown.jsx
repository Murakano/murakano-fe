
import React from 'react';
import styled from "styled-components";
import DownOutlined from '/public/murak_dropdown_chevron-down.svg';
import { Button, Dropdown, message} from 'antd';

// 카테고리 드롭다운 
const items = [
  {
    label: '메뉴1',
    key: '1',
  },
  {
    label: '메뉴2',
    key: '2',
  },
  {
    label: '메뉴3',
    key: '3',
  },
  {
    label: '메뉴4',
    key: '4',
  },
];



export default function ComDropdown() {

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  

  return (
    <DropdownContainer>
    <DropdownBtn menu={menuProps}>
      <Button>
        <NameSpace>
          <NameDiv>dropdown</NameDiv>
          <DownOutlinedDiv>
            <DownOutlined />
          </DownOutlinedDiv>
        </NameSpace>
      </Button>
    </DropdownBtn>
  </DropdownContainer>
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

const DropdownBtn = styled(Dropdown)`
  width: auto;
  height: 35px;
  padding: 10px 3px;
  border-radius: 13px;
  border: 1px solid var(--secondary); 
  cursor: pointer;
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
