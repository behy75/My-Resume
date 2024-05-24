import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiRequest } from './apiRequest';

export const useUpdatePersonalInformation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    'send-personal-information',
    payload => apiRequest('patch', 'app/personal-information', payload),
    {
      onSuccess: data => {
        queryClient.setQueryData('personal-information', oldQueryData => {
          return { ...oldQueryData, ...data.personal_information };
        });
      },
    }
  );
};

export const useFetchPersonalInformation = () => {
  return useQuery(
    'personal-information',
    () => apiRequest('get', 'app/personal-information'),
    {
      cacheTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
      staleTime: 1000 * 60 * 60 * 24, // Data is fresh for 24 hours
      refetchOnMount: false, // Do not refetch on mount
      refetchOnWindowFocus: false, // Do not refetch on window focus
    }
  );
};
