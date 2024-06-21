import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';

export default function Callback() {
  const router = useRouter();

  const login = async () => {
    const code = new URL(document.location.toString()).searchParams.get('code');
    const res = await api.post('/users/kakao/login', { code });
    console.log(res);

    if (res.message == '로그인 성공') {
      localStorage.setItem('token', res.token);
      return router.push('/');
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
      router.push('/auth/login');
    }
  };

  useEffect(() => {
    login();
  }, []);

  return <div>callback</div>;
}
