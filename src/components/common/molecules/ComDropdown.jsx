
import React from 'react';
import styled from "styled-components";
import DownOutlined from '/public/murak_dropdown_chevron-down.svg';
import { Button, Dropdown, message} from 'antd';

// label 리스트 받아서 items로 변환 
const generateItems = (labels) => {
    return labels.map((label, index) => ({
        label,
        key: `${index + 1},`
    }));
};

export default function ComDropdown({labels, dropdownName}) {
    const items = generateItems(labels);

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
                        <NameDiv>{dropdownName}</NameDiv>
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
