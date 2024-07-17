import styled from 'styled-components';
import TouchIcon from '../../../../public/murak_list_icon.svg';
import Image from 'next/image';
import React, { use, useState, useEffect } from 'react';
import StateDropdown from '../molecules/StateDropdown';
import RequestDropdown from '../molecules/RequestDropdown';
import RegisterRequestModal from './RegisterRequestModal';
import ModifyRequestModal from './ModifyRequestModal';

export default function RequestSection({ requests = [], sectionTitle, userRole, refreshRequests }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 모달 타입 상태 추가
  const [selectedRequestData, setSelectedRequestData] = useState(null);
  const [selectedState, setSelectedState] = useState('전체');
  const [selectedRequestType, setSelectedRequestType] = useState('전체');
  const [filteredRequests, setFilteredRequests] = useState(requests);

  const handleRequestItemClick = (type, data) => (e) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
    setModalType(type === '등록 요청' ? 'register' : 'update'); // 모달 타입 설정
    setSelectedRequestData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null); // 모달 타입 초기화
    setSelectedRequestData(null);
    refreshRequests();
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const handleRequestTypeChange = (type) => {
    setSelectedRequestType(type);
  };

  useEffect(() => {
    //드롭다운 요소 필터
    const filtered = requests.filter(({ status, type }) => {
      const stateMatch =
        selectedState === '전체' ||
        (selectedState === '승인완료' && status === 'app') ||
        (selectedState === '반려' && status === 'rej') ||
        (selectedState === '승인 전' && status === 'pend');
      const typeMatch =
        selectedRequestType === '전체' ||
        (selectedRequestType === '등록요청' && type === 'add') ||
        (selectedRequestType === '수정요청' && type === 'mod');
      return stateMatch && typeMatch;
    });

    //요소 정렬
    const sorted = filtered.sort((a, b) => {
      if (a.status === 'pend' && (b.status === 'app' || b.status === 'rej')) return -1;
      if ((a.status === 'app' || a.status === 'rej') && b.status === 'pend') return 1;
      if ((a.status === 'app' || a.status === 'rej') && (b.status === 'app' || b.status === 'rej')) {
        return new Date(b.updatedAt) - new Date(a.updatedAt); // 최신순 정렬
      }
      return 0;
    });

    setFilteredRequests(sorted);
  }, [selectedState, selectedRequestType, requests]);

  return (
    <MainContainer>
      <Inner>
        <SectionTitle>{sectionTitle}</SectionTitle>
        <DropdownContainer>
          <StateDropdown onChange={handleStateChange} />
          <RequestDropdown onChange={handleRequestTypeChange} />
        </DropdownContainer>
        <RequestList>
          {Array.isArray(filteredRequests) &&
            filteredRequests.map(({ _id, type, word, status, awkPron, comPron, info, suggestedBy }, index) => {
              const title = type === 'add' ? '등록 요청' : '수정 요청';
              const subtitle = word;
              const statusText = status === 'pend' ? '승인 전' : status === 'rej' ? '반려' : '승인 완료';
              const addinfo = info;
              const awkpron = awkPron;
              const compron = comPron;
              const requestData = { _id, type, word, status, addinfo, awkpron, compron, suggestedBy };
              return (
                <RequestItem key={index} onClick={handleRequestItemClick(title, requestData)}>
                  <RequestItemInner>
                    <RequestContent>
                      <RequestTitle>{title}</RequestTitle>
                      <RequestSubTitle>{subtitle}</RequestSubTitle>
                    </RequestContent>
                    <ButtonGroup>
                      <Badge $status={statusText}>{statusText}</Badge>
                      <ActionButton>
                        <Image src={TouchIcon} alt='touch-icon' />
                      </ActionButton>
                    </ButtonGroup>
                  </RequestItemInner>
                </RequestItem>
              );
            })}
        </RequestList>
      </Inner>
      {isModalOpen &&
        (modalType === 'register' ? (
          <RegisterRequestModal
            onClose={closeModal}
            requestData={selectedRequestData}
            userRole={userRole}
            refreshRequests={refreshRequests}
          />
        ) : (
          <ModifyRequestModal
            onClose={closeModal}
            requestData={selectedRequestData}
            userRole={userRole}
            refreshRequests={refreshRequests}
          />
        ))}
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 780px;
  min-height: calc(100vh - 198px);
  height: 100%;
  padding-top: 30px;
  box-sizing: border-box;
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
  padding: 33px 86px;
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
    props.$status === '승인 전' ? 'var(--secondary)' : props.$status === '승인 완료' ? 'var(--primary)' : '#A4A4A4'};
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
  width: 691px;
  height: 35px;
  gap: 20px;
  margin-bottom: 20px;
`;
