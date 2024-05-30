import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiRequest } from './apiRequest';
import { convertEpochToFormattedDate } from '@/utils/common';

export const useUpdateColleges = () => {
  const queryClient = useQueryClient();

  return useMutation(
    'send-colleges',
    payload => apiRequest('patch', 'app/colleges', payload),
    {
      onSuccess: data => {
        queryClient.setQueryData('colleges', oldQueryData => {
          return [...data.colleges];
        });
      },
    }
  );
};

export const useDeleteColleges = () => {
  const queryClient = useQueryClient();

  return useMutation(
    'delete-college',
    payload => apiRequest('delete', 'app/colleges', payload)
    // {
    //   onSuccess: data => {
    //     queryClient.setQueryData('colleges', oldQueryData => {
    //       return [...data.colleges];
    //     });
    //   },
    // }
  );
};

export const useFetchColleges = () => {
  return useQuery('colleges', () => apiRequest('get', 'app/colleges'), {
    cacheTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
    staleTime: 1000 * 60 * 60 * 24, // Data is fresh for 24 hours
    refetchOnMount: false, // Do not refetch on mount
    refetchOnWindowFocus: false, // Do not refetch on window focus
    select: data => {
      return Array.isArray(data)
        ? data.map(college => ({
            nameOfCollege: college.name_of_college,
            arrivalDate: convertEpochToFormattedDate(college.arrival_date),
            departureDate: convertEpochToFormattedDate(college.departure_date),
            field: college.field,
            major: college.major,
            minor: college.minor,
            grade: college.grade,
            skills: college.skills,
          }))
        : [];
    },
  });
};
