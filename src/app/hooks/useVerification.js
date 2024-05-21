import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const baseURL = 'http://localhost:4000/auth/';

const register = async data => {
  try {
    const response = await axios.post(
      `${baseURL}register`,
      { ...data },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async data => {
  try {
    const response = await axios.post(
      `${baseURL}login`,
      { ...data },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const protectedRoute = async token => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    if (!token) return {};
    const response = axios.get(`${baseURL}protected`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useLoginUser = () => {
  return useMutation('login', login, {
    onError: error => {
      // Handle the error here
      console.error('Login error:', error);
    },
    onSuccess: data => {
      // Handle successful registration here
      console.log('Login successful:', data);
    },
  });
};

export const useRegisterNewUser = () => {
  return useMutation('register', register, {
    onError: error => {
      // Handle the error here
      console.error('Registration error:', error);
    },
    onSuccess: data => {
      // Handle successful registration here
      console.log('Registration successful:', data);
    },
  });
};

export const useProtectedRoute = token => {
  return useQuery(protectedRoute(token), {
    // cacheTime: 1000 * 60 * 60 * 24,
    // staleTime: false,
    // onSuccess,
    // onError,
  });
};
