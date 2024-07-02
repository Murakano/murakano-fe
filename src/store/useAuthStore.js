import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create(
  persist(
    (set) => ({
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
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
      blacklist: ['accessToken'], // 블랙리스트에 accessToken 추가
    }
  )
);

export default useAuthStore;
