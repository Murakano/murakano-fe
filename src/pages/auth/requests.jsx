import { useEffect, useState } from 'react';
import RequestSection from '@/components/auth/organisms/RequestSection';
import api from '@/utils/api';
import useAuthStore from '@/store/useAuthStore';

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionTitle, setSectionTitle] = useState('내 요청 페이지');
  const [userRole, setUserRole] = useState(null);
  const {accessToken} = useAuthStore();

  const fetchRequests = async () => {
    if (!accessToken) return;
    try {
      const roleResponse = await api.get('/users/role');
      console.log("roleResponse.data : ", roleResponse.data.role)
      setUserRole(roleResponse.data.role); // 사용자 역할 설정

      let requestsResponse;
      if (roleResponse.data.role === 'admin') {
          setSectionTitle('모든 요청 페이지');
          requestsResponse = await api.get('/users/requests/all');
      }
      else {
          setSectionTitle('내 요청 페이지');
          requestsResponse = await api.get('/users/requests');
      }
      console.log("API Raw Response:", requestsResponse.data.requests)
      setRequests(requestsResponse.data.requests);

    } catch (err) {
      setError(err.message);
      console.log("접근실패")

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

  return <RequestSection requests={requests} sectionTitle={sectionTitle} userRole={userRole} refreshRequests={refreshRequests} />;
}
