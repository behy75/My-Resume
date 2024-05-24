import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiRequest } from './apiRequest';

export const useUpdateSocialNetworks = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    'send-social-networks',
    payload => apiRequest('patch', 'app/social-networks', payload),
    {
      onSuccess: data => {
        queryClient.setQueryData('social-networks', oldQueryData => {
          return { ...oldQueryData, ...data.social_networks };
        });
      },
    }
  );
};

export const useFetchSocialNetworks = () => {
  return useQuery(
    'social-networks',
    () => apiRequest('get', 'app/social-networks'),
    {
      cacheTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
      staleTime: 1000 * 60 * 60 * 24, // Data is fresh for 24 hours
      refetchOnMount: false, // Do not refetch on mount
      refetchOnWindowFocus: false, // Do not refetch on window focus
    }
  );
};
