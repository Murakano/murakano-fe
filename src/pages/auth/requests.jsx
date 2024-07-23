import { useEffect, useState } from 'react';
import RequestSection from '@/components/auth/organisms/RequestSection';
import api from '@/utils/api';
import useAuthStore from '@/store/useAuthStore';
import TopScrollBtn from '@/components/common/atoms/TopScrollBtn';
import styled from 'styled-components';

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionTitle, setSectionTitle] = useState('내 요청 페이지');
  const [userRole, setUserRole] = useState(null);
  const { accessToken } = useAuthStore();

  const fetchRequests = async () => {
    if (!accessToken) return;
    try {
      const roleResponse = await api.get('/users/role');
      const role = roleResponse.data.role;
      setUserRole(role); // 사용자 역할 설정

      let requestsResponse;
      if (role === 'user') {
        setSectionTitle('내 요청 페이지');
        requestsResponse = await api.get('/users/requests');
      } else if (role === 'admin') {
        setSectionTitle('모든 요청 페이지');
        requestsResponse = await api.get('/users/requests/all');
        console.log(
          '모든 요청 정보',
          requestsResponse.data.requests.map((request) => request._id)
        );
      } else {
        throw new Error('Invalid user role');
      }
      console.log('API Raw Response:', requestsResponse.data.requests);
      setRequests(requestsResponse.data.requests);
    } catch (err) {
      setError(err.message);
      console.log('접근실패');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [accessToken]);

  useEffect(() => {
    if (requests.length === 0) {
      document.body.style.overflow = 'hidden'; // 요청 내역이 없을 때 스크롤 막기
    } else {
      document.body.style.overflow = 'auto'; // 요청 내역이 있을 때 스크롤 허용
    }
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 허용
    };
  }, [requests]);

  const refreshRequests = () => {
    fetchRequests();
  };

  if (loading) return <div>Loading...</div>; //로딩중일 때 loading...
  if (error) return <div>Error: {error}</div>;

  return (
    <Section>
      {requests.length === 0 ? (
        <>
          <SectionTitle>{sectionTitle}</SectionTitle>
          <NoRequestsContainer>
            <Logo />
            <NoRequestsMessage>요청한 내역이 없습니다.</NoRequestsMessage>
          </NoRequestsContainer>
        </>
      ) : (
        <RequestSection
          requests={requests}
          sectionTitle={sectionTitle}
          userRole={userRole}
          refreshRequests={refreshRequests}
        />
      )}
      <ScrollContainer>
        <TopScrollBtn />
      </ScrollContainer>
    </Section>
  );
}

const Section = styled.div`
  height: calc(100vh - 195px);
  @media (max-width: 600px) {
    height: calc(100vh - 165px);
  }
`;

const Logo = styled.div`
  width: 35px;
  height: 35px;
  background-image: url('/murak-logo-removebg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 10px;
`;

const NoRequestsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 340px;
`;

const SectionTitle = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  margin: 63px 0 180px;
  @media (max-width: 600px) {
    margin: 40px 0 50px;
  }
`;

const NoRequestsMessage = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #555252;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const ScrollContainer = styled.div`
  position: absolute;
  z-index: 10;
  right: 15%;
  bottom: 10%;
`;
