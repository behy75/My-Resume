import { useMutation, useQuery } from 'react-query';
import { apiRequest } from './apiRequest';

export const useLoginUser = () => {
  return useMutation(
    'login',
    payload => apiRequest('post', 'auth/login', payload),
    {
      onError: error => {
        // Handle the error here
        console.error('Login error:', error);
      },
      onSuccess: data => {
        // Handle successful registration here
        console.log('Login successful:', data);
      },
    }
  );
};

export const useRegisterNewUser = () => {
  return useMutation(
    'register',
    payload => apiRequest('post', 'auth/register', payload),
    {
      onError: error => {
        // Handle the error here
        console.error('Registration error:', error);
      },
      onSuccess: data => {
        // Handle successful registration here
        console.log('Registration successful:', data);
      },
    }
  );
};

export const useProtectedToken = () => {
  const fetchProtectedData = () => apiRequest('get', 'auth/protected');

  return useQuery('protected', fetchProtectedData, {
    initialData: { tokenIsProtected: false },
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: false,
    // onSuccess,
    // onError,
  });
};
