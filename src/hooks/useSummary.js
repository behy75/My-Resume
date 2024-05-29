import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiRequest } from './apiRequest';

export const useUpdateSummary = () => {
  const queryClient = useQueryClient();

  return useMutation(
    'send-summary',
    payload => apiRequest('patch', 'app/summary', payload),
    {
      onSuccess: data => {
        queryClient.setQueryData('summary', oldQueryData => {
          return { ...oldQueryData, summary: data.summary };
        });
      },
    }
  );
};

export const useFetchSummary = () => {
  return useQuery('summary', () => apiRequest('get', 'app/summary'), {
    cacheTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
    staleTime: 1000 * 60 * 60 * 24, // Data is fresh for 24 hours
    refetchOnMount: false, // Do not refetch on mount
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });
};
