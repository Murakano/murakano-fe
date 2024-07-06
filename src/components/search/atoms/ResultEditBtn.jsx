import React, { useState } from 'react';
import styled from 'styled-components';
import EditRequestModal from "@/components/search/organisms/EditRequestModal"; // 여기서 Modal을 EditRequestModal로 변경
import ActionBtn from '@/components/common/atoms/ActionBtn'; 

const ResultEditBtn = ({ searchResult }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddRequestBtn onClick={handleOpenModal}>수정 요청</AddRequestBtn>
      {isModalOpen && <EditRequestModal onClose={handleCloseModal} searchResult={searchResult} />} {/* 여기서 Modal을 EditRequestModal로 변경 */}
    </>
  );
};

const AddRequestBtn = styled(ActionBtn)`
  background-color: var(--primary60);
  &:hover {
        background-color: var(--primary);
       }
`;

export default ResultEditBtn;
