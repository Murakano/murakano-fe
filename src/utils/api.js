import { ErrorMessage } from '@/constants/errorMessage';
import useAuthStore from '@/store/useAuthStore';

export const apiHeaders = new Headers();
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const setJwt = () => {
  const { accessToken } = useAuthStore.getState(); // useAuthStore.getState()를 호출하여 스토어에 직접 접근
  if (accessToken) apiHeaders.set('Authorization', `Bearer ${accessToken}`);
  else apiHeaders.delete('Authorization');
};

const api = {
  get: async (path, params, options) => {
    try {
      setJwt();
      if (params) {
        const filteredParams = Object.fromEntries(
          Object.entries(params)
            .filter(([_, value]) => (typeof value === 'number' && !isNaN(value)) || value !== undefined)
            .map(([key, value]) => [key, String(value)])
        );
        path += '?' + new URLSearchParams(filteredParams).toString();
      }

      const res = await fetch(`${SERVER_URL}${path}`, {
        method: 'GET',
        headers: apiHeaders,
        credentials: 'include',
        ...options,
      });

      return handleResponse(res);
    } catch (err) {
      throw new Error(ErrorMessage.NETWORK_ERROR);
    }
  },

  post: async (path, params, options) => {
    try {
      const { body } = handleMutateRequest(params);
      const res = await fetch(`${SERVER_URL}${path}`, {
        method: 'POST',
        headers: apiHeaders,
        credentials: 'include',
        body,
        ...options,
      });

      return handleResponse(res);
    } catch (err) {
      throw new Error(ErrorMessage.NETWORK_ERROR);
    }
  },

  patch: async (path, params, options) => {
    try {
      const { body } = handleMutateRequest(params);
      const res = await fetch(`${SERVER_URL}${path}`, {
        method: 'PATCH',
        headers: apiHeaders,
        credentials: 'include',
        body,
        ...options,
      });

      return handleResponse(res);
    } catch (err) {
      throw new Error(ErrorMessage.NETWORK_ERROR);
    }
  },

  put: async (path, params, options) => {
    try {
      const { body } = handleMutateRequest(params);
      const res = await fetch(`${SERVER_URL}${path}`, {
        method: 'PATCH',
        headers: apiHeaders,
        credentials: 'include',
        body,
        ...options,
      });

      return handleResponse(res);
    } catch (err) {
      throw new Error(ErrorMessage.NETWORK_ERROR);
    }
  },

  delete: async (path, params, options) => {
    try {
      const { body } = handleMutateRequest(params);
      const res = await fetch(`${SERVER_URL}${path}`, {
        method: 'DELETE',
        headers: apiHeaders,
        credentials: 'include',
        body,
        ...options,
      });

      return handleResponse(res);
    } catch (err) {
      throw new Error(ErrorMessage.NETWORK_ERROR);
    }
  },
};

export default api;

// params 타입에 따라 formData or json 데이터로 처리
const handleMutateRequest = (params) => {
  const isFormData = params instanceof FormData;
  let body;
  setJwt();
  if (isFormData) {
    apiHeaders.delete('Content-Type');
    body = params;
  } else {
    apiHeaders.set('Content-Type', 'application/json');
    body = JSON.stringify(params);
  }

  return { body };
};

// Content-Type에 따라 응답 데이터 처리
const parseResponseData = (res) => {
  const contentType = res.headers.get('Content-Type');
  if (!contentType) {
    throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR);
  }

  if (contentType.includes('application/json')) {
    return res.json();
  } else if (contentType.includes('text')) {
    return res.text();
  }
  return res.blob();
};

// 응답 status 상태에 따라 return data 혹은 throw Error
const handleResponse = async (res) => {
  try {
    const data = await parseResponseData(res);
    if (res.ok) {
      return data;
    }

    const errorMessage = res.status === 404 ? ErrorMessage.BAD_REQUEST : await data;
    // throw new Error(errorMessage);
    console.log(errorMessage);
    if (errorMessage === '토큰이 만료되었습니다.') {
      fetchAuthData();
    }

    return data;
  } catch (err) {
    if (typeof window !== 'undefined') {
      // throw new CustomHttpError(res.status, err.message);
      console.log(new CustomHttpError(res.status, err.message));
    }
    return res.status;
  }
};

class CustomHttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
