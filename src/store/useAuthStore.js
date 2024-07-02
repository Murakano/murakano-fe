import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import api from '@/utils/api';
import { ErrorMessage } from '@/constants/errorMessage';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresAt: null,
      nickname: null,
      setAuthData: (token) => {
        const decoded = jwtDecode(token);
        const nickname = decoded.nickname;
        const expiresAt = decoded.exp * 1000;
        set({ accessToken: token, expiresAt, nickname });
      },
      clearAuthData: () => {
        set({ accessToken: null, expiresAt: null, nickname: null });
      },
      fetchAuthData: async () => {
        try {
          get().clearAuthData();
          const response = await api.post('/users/refresh');
          console.log(response);
          if (response.message === 'refresh token이 존재하지 않습니다.') return;
          else if (response.message === 'refresh token 검증중 오류가 발생하였습니다.') {
            alert('다시 로그인해주세요.');
            router.push('/auth/login');
          }
          const newAccessToken = response.data.accessToken;
          get().setAuthData(newAccessToken);
        } catch (error) {
          console.log(error);
          console.log(ErrorMessage.TOKEN_ERROR);
          return;
        }
      },
      scheduleTokenRefresh: () => {
        // 만료 1분 전
        const expiresIn = get().expiresAt - Date.now() - 60 * 1000;
        if (expiresIn > 0) {
          setTimeout(() => {
            get().fetchAuthData().then(get().scheduleTokenRefresh);
          }, expiresIn);
        } else {
          // 토큰이 이미 만료된 경우, 즉시 갱신
          get().fetchAuthData().then(get().scheduleTokenRefresh);
        }
      },
    }),
    {
      name: 'auth-storage',
      // whitelist: ['nickname', 'expiresAt'],
    }
  )
);

export default useAuthStore;
