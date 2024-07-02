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
      isLogin: false,
      setAuthData: (token) => {
        const decoded = jwtDecode(token);
        const nickname = decoded.nickname;
        const expiresAt = decoded.exp * 1000; // JWT의 exp는 초 단위이므로 밀리초로 변환
        set({ accessToken: token, expiresAt, nickname, isLogin: true });
      },
      clearAuthData: () => {
        set({ accessToken: null, expiresAt: null, nickname: null, isLogin: false });
      },
      fetchAuthData: async () => {
        try {
          if (!isLogin) return;
          get().clearAuthData();
          const response = await api.post('/users/refresh');
          console.log(response);
          if (response.message === 'refresh token이 존재하지 않습니다.') return;
          else if (response.message === 'refresh token 검증중 오류가 발생하였습니다.') {
            isLogin = false;
            alert('다시 로그인해주세요.');
            router.push('/auth/login');
          }
          const newAccessToken = response.data.newAccessToken;
          get().setAuthData(newAccessToken);
        } catch (error) {
          console.log(error);
          console.log(ErrorMessage.TOKEN_ERROR);
          return;
        }
      },
      scheduleTokenRefresh: () => {
        const expiresIn = get().expiresAt - Date.now() - 60 * 1000; // 만료 1분 전
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
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
      whitelist: ['nickname', 'expiresAt'], // accessToken은 로컬 스토리지에 저장하지 않음
    }
  )
);

export default useAuthStore;

// import { create } from 'zustand';
// // jwt-decode 모듈 올바르게 import
// import { jwtDecode } from 'jwt-decode';
// import api from '@/utils/api';
// import { ErrorMessage } from '@/constants/errorMessage';
// import { persist } from 'zustand/middleware';

// const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       accessToken: null,
//       nickname: null,
//       setAuthData: (token) => {
//         const decoded = jwtDecode(token);
//         const nickname = decoded.nickname;
//         set({ accessToken: token, nickname });
//       },
//       clearAuthData: () => {
//         set({ accessToken: null, nickname: null });
//       },
//       fetchAuthData: async () => {
//         try {
//           get().clearAuthData();
//           const response = await api.post('/users/refresh');
//           if (response.message == 'refresh token이 존재하지 않습니다.') return;
//           else if (response.message == 'refresh token 검증중 오류가 발생하였습니다.') {
//             alert('다시 로그인해주세요.');
//             router.push('/auth/login');
//           }
//           const newAccessToken = response.newAccessToken;
//           get().setAuthData(newAccessToken);
//         } catch (error) {
//           console.log(error);
//           console.log(ErrorMessage.TOKEN_ERROR);
//           return;
//         }
//       },
//     }),
//     {
//       name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
//       whitelist: ['nickname'], // 블랙리스트에 accessToken 추가
//     }
//   )
// );

// export default useAuthStore;
