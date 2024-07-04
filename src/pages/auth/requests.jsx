import { useEffect, useState } from 'react';
import RequestSection from '@/components/auth/organisms/RequestSection';
import api from '@/utils/api';
import useAuthStore from '@/store/useAuthStore';

const DUMMY_REQUEST_ITEM_LIST = [
  {
    type: "add",
    word: "DOM",
    status: "ped",
  },
  {
    type: "add",
    word: "CSSOM",
    status: "app",
  },
  {
    type: "mod",
    word: "ASAP",
    status: "ped",
  },
  {
    type: "add",
    word: "SQL",
    status: "ped",
  },
  {
    type: "add",
    word: "DOM",
    status: "rej",
  },
  {
    type: "mod",
    word: "DOM",
    status: "app",
  },
];

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {accessToken} = useAuthStore();


  useEffect(() => {
    const fetchRequests = async () => {
      if (!accessToken) return;
      try {
        const response = await api.get('/users/requests');
        console.log("API Raw Response:", response.data.requests)

        setRequests(response.data.requests);

      } catch (err) {
        setError(err.message);
        console.log("접근실패")

      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>; //로딩중일 때 loading...
  if (error) return <div>Error: {error}</div>;

  return <RequestSection requests={requests} />;
}
