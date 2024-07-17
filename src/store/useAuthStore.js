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
          const response = await api.post('/users/refresh');
          if (response.message === '비로그인 상태입니다.') {
            get().clearAuthData();
            return;
          }
          // user RT와 redis RT가 다른 경우
          else if (response.message === '유효하지 않은 Refresh Token입니다.') {
            get().clearAuthData();
            alert('다시 로그인해주세요.');
            return;
          } else if (response.message === 'refresh token 검증중 오류가 발생하였습니다.') {
            alert('다시 로그인해주세요.');
            return;
          }
          const newAccessToken = response.data.accessToken;
          get().setAuthData(newAccessToken);
        } catch (error) {
          console.log(error);
          console.log(ErrorMessage.TOKEN_ERROR);
          return;
        }
      },

      silentRefresh: () => {
        // 만료 1분 전
        const silentRefreshTime = get().expiresAt - Date.now() - 595 * 1000;
        if (silentRefreshTime > 0) {
          setTimeout(() => {
            get().fetchAuthData();
          }, silentRefreshTime);
        } else if (get().accessToken) {
          // 만료시간이 지난 토큰을 가지고 있거나 만료시간이 1분 이내로 남은 경우
          get().fetchAuthData();
          // accessToken이 변경 될 때 마다 silentRefresh를 실행해줘야함 ( base.jsx )
        }
      },
    }),

    {
      name: 'auth-storage',
      partialize: (state) => ({ nickname: state.nickname, expiresAt: state.expiresAt }),
    }
  )
);

export default useAuthStore;
