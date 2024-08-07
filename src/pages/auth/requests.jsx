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

  const refreshRequests = () => {
    fetchRequests();
  };

  if (loading) return <div>Loading...</div>; //로딩중일 때 loading...
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      {requests.length === 0 ? (
        <NoRequestsMessage>요청 내역이 없습니다.</NoRequestsMessage>
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
    </section>
  );
}

const NoRequestsMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 30px;
  font-weight: 600;
  color: #888;
`;

const ScrollContainer = styled.div`
  position: absolute;
  z-index: 10;
  right: 15%;
  bottom: 10%;
`;
