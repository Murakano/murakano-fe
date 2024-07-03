import styled from "styled-components";
import TouchIcon from "../../../../public/murak_list_icon.svg"; 
import Image from "next/image";
import RegisterRequestModal from "./RegisterRequestModal";
import UpdateRequestModal from "./UpdateRequestModal";
import React, { useState } from "react";
import StateDropdown from "../molecules/StateDropdown";
import RequestDropdown from "../molecules/RequestDropdown";


export default function RequestSection({requests = []}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 모달 타입 상태 추가
  const [selectedSubtitle, setSelectedSubtitle] = useState(''); // selectedSubtitle 상태 추가

  const handleRequestItemClick = (type, subtitle) => (e) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
    setModalType(type === "등록 요청" ? "register" : "update"); // 모달 타입 설정
    setModalOpen(true);
    setSelectedSubtitle(subtitle); // 수정요청 모달에 들어갈 개발용어
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null); // 모달 타입 초기화
  }; 


  return (
    <MainContainer >
      <Inner>
        <SectionTitle>내 요청 내역</SectionTitle>
        <DropdownContainer>
          <StateDropdown />
          <RequestDropdown />
        </DropdownContainer>
        <RequestList>
          {Array.isArray(requests) && requests.map(({ type, word, status }, index) => {
            const title = type === 'add' ? '등록 요청' : '수정 요청';
            const subtitle = word;
            const statusText = status === 'ped' ? '승인 전' : status === 'rej' ? '반려' : '승인 완료';
            return (
              <RequestItem key={index} onClick={handleRequestItemClick(title, subtitle)}>
                <RequestItemInner>
                  <RequestContent>
                    <RequestTitle>{title}</RequestTitle>
                    <RequestSubTitle>{subtitle}</RequestSubTitle>
                  </RequestContent>
                  <ButtonGroup>
                    <Badge $status={statusText}>{statusText}</Badge>
                    <ActionButton>
                      <Image src={TouchIcon} alt="touch-icon" />
                    </ActionButton>
                  </ButtonGroup>
                </RequestItemInner>
              </RequestItem>
            );
          })}
        </RequestList>
      </Inner>
      {isModalOpen && (
        modalType === "register" ? (
          <RegisterRequestModal onClose={closeModal} />
        ) : (
          <UpdateRequestModal onClose={closeModal} subtitle={selectedSubtitle}/>
        )
      )}
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

const RequestList = styled.section`
  display: flex;
  align-items: center;
  width: 691px;
  flex-direction: column;
  gap: 0px;
`;

const RequestItem = styled.div`
  width: 691px;
  height: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  &:hover {
    background-color: var(--secondary10);
    cursor: pointer;
  }
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
  width: 70px;
  height: 27px;
  font-size: 13px;
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

const DropdownContainer = styled.div`
    display: flex;
    flex-start: left;
    width: 691px;
    height: 35px;
    gap: 20px;
    margin-bottom: 20px;

`;