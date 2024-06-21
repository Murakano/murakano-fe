import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();
  const hasMounted = useRef(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      handleLogout();
    }
  }, []);
  return <></>;
}
