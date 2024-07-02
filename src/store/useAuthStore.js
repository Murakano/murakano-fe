import { create } from 'zustand';
// jwt-decode 모듈 올바르게 import
import { jwtDecode } from 'jwt-decode';
import api from '@/utils/api';
import { ErrorMessage } from '@/constants/errorMessage';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      nickname: null,
      setAuthData: (token) => {
        const decoded = jwtDecode(token);
        const nickname = decoded.nickname;
        set({ accessToken: token, nickname });
      },
      clearAuthData: () => {
        set({ accessToken: null, nickname: null });
      },
      fetchAuthData: async () => {
        try {
          get().clearAuthData();
          const response = await api.post('/users/refresh');
          if (response.message == 'refresh token이 존재하지 않습니다.') return;
          else if (response.message == 'refresh token 검증중 오류가 발생하였습니다.') {
            alert('다시 로그인해주세요.');
            router.push('/auth/login');
          }
          const newAccessToken = response.newAccessToken;
          get().setAuthData(newAccessToken);
        } catch (error) {
          console.log(error);
          console.log(ErrorMessage.TOKEN_ERROR);
          return;
        }
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
      whitelist: ['nickname'], // 블랙리스트에 accessToken 추가
    }
  )
);

export default useAuthStore;
