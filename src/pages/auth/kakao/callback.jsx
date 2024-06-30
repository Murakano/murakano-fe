import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';

export default function Callback() {
  const router = useRouter();
  const hasMounted = useRef(false);

  const login = async () => {
    const code = new URL(document.location.toString()).searchParams.get('code');
    const res = await api.post('/users/kakao/login', { code });
    if (res.message === '로그인 성공') {
      return router.push('/');
    } else {
      alert('로그인 실패');
      router.push('/auth/login');
    }
  };

  // NOTE : strict mode 때문에, 2번 실행 되어서 카카오 인증 서버에서 동일 코드 사용에 대한 에러가 발생,
  // useRef를 사용해 마운트 상태 추적해서 strict mode에서도 한 번만 실행되게 함
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      login();
    }
  }, []);

  return <></>;
}
