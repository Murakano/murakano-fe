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
          // TODO : 이슈 더이상 없다고 생각하는 타이밍에 삭제
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

      silentRefresh: () => {
        // 만료 1분 전
        const expiresIn = get().expiresAt - Date.now() - 60 * 1000;
        if (expiresIn > 0) {
          // 만료 시간이 0~1분이 사이인 경우
          setTimeout(() => {
            get().fetchAuthData();
          }, expiresIn);
        } else if (get().accessToken) {
          // 만료시간이 지난 토큰을 가지고 있는 경우 (사이트를 떠났다가 돌아온 유저)
          get().fetchAuthData();
          // 돌아온 유저가 silentRefresh를 실행을 해야함
          // 최상위 컴포넌트에서 silentRefresh useEffect 빈배열로 실행
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
