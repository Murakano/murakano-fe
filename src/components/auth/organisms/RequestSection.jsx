import styled from "styled-components";
import TouchIcon from "../../../../public/murak_list_icon.svg"; 
import Image from "next/image";
import Modal from "./Modal";
import React, { useState } from "react";

const DUMMY_REQUEST_ITEM_LIST = [
  {
    title: "수정 요청",
    subtitle: "DOM",
    status: "승인 전",
  },
  {
    title: "등록 요청",
    subtitle: "CSSOM",
    status: "승인 완료",
  },
  {
    title: "수정 요청",
    subtitle: "ASAP",
    status: "승인 전",
  },
  {
    title: "등록 요청",
    subtitle: "SQL",
    status: "승인 전",
  },
  {
    title: "등록 요청",
    subtitle: "DOM",
    status: "반려",
  },
  {
    title: "등록 요청",
    subtitle: "DOM",
    status: "승인 전",
  },
];


export default function RequestSection() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleActionButtonClick = (e) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <MainContainer >
      <Inner>
        <SectionTitle>내 요청 내역</SectionTitle>
        <SelectorContainer>
          <ProgressSelector>
            <option>진행 상태</option>
            <option>진행 중</option>
            <option>승인 완료</option>
            <option>반려</option>
          </ProgressSelector>
          <TypeSelector>
            <option>전체</option>
            <option>수정 요청</option>
            <option>등록 요청</option>
          </TypeSelector>
        </SelectorContainer>
        <RequestList>
          {DUMMY_REQUEST_ITEM_LIST.map(({ title, subtitle, status }, index) => (
            <RequestItem key={index}>
              <RequestItemInner>
                <RequestContent>
                  <RequestTitle>{title}</RequestTitle>
                  <RequestSubTitle>{subtitle}</RequestSubTitle>
                </RequestContent>
                <ButtonGroup>
                  <Badge $status={status}>{status}</Badge>
                  <ActionButton onClick={handleActionButtonClick}>
                    <Image src={TouchIcon} alt="touch-icon" />
                  </ActionButton>
                </ButtonGroup>
              </RequestItemInner>
            </RequestItem>
          ))}
        </RequestList>
      </Inner>
      {isModalOpen && <Modal onClose={closeModal} />}
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 780px;
  height: 890px;
  padding-top: 30px;
`;

const Inner = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 780px;
  height: 100%;
`;

const SectionTitle = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  width: 447px;
  height: 86px;
  padding: 20px, 86px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectorContainer = styled.section`
  display: flex;
  width: 691px;
  gap: 20px;
  margin-bottom: 10px;
`;

const Selector = styled.select`
  border: 1px solid var(--secondary);
  border-radius: 10px;
  width: 94px;
  height: 29px;
  padding: 0px 10px;
  color: #666666;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  text-align: center;
`;

const ProgressSelector = styled(Selector)``; // todo: rhea 꺼로 변경

const TypeSelector = styled(Selector)``;

const RequestList = styled.section`
  display: flex;
  align-items: center;
  width: 691px;
  flex-direction: column;
  gap: 10px;
`;

const RequestItem = styled.div`
  width: 691px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #cccccc;
`;

const RequestItemInner = styled.div`
  width: 617px;
  display: flex;
  justify-content: space-between;
`;

const RequestContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const RequestTitle = styled.h1`
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  text-align: left;
`;

const RequestSubTitle = styled.div`
  font-size: 13px;
  font-weight: 300;
  line-height: 19.5px;
  letter-spacing: -0.03em;
  text-align: left;
`;

const ButtonGroup = styled.aside`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: ${(props) =>
    props.$status === "승인 전"
      ? "var(--secondary)"
      : props.$status === "승인 완료"
      ? "var(--primary)"
      : "#A4A4A4"};
  width: 58px;
  height: 24px;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.03em;
  text-align: center;
  color: white;
`;

const ActionButton = styled(TouchIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
