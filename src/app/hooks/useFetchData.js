import axios from 'axios';
import { useQuery } from 'react-query';

const baseURL = 'http://localhost:4001/';

const fetchData = async targetDataName => {
  const response = await axios.get(`${baseURL}${targetDataName}`);
  return response.data;
};

export const useFetchData = targetDataName => {
  return useQuery(targetDataName, () => fetchData(targetDataName), {
    cacheTime: 1000 * 60 * 60 * 24, // Cache data for 1 day
    // The amount of time (in milliseconds) to cache the query result data.
    // If set to a positive number, the cached data will be considered fresh until this duration has passed.

    staleTime: false,
    // The amount of time (in milliseconds) after which the data is considered stale.
    // After this time has passed, if the query is refetched, React Query will show the stale data while fetching new data in the background.

    refetchOnMount: true,
    // Whether to refetch the query data when the component mounts.

    refetchOnWindowFocus: true,
    // Whether to refetch the query data when the window regains focus.

    // refetchInterval: 2000,
    // The interval (in milliseconds) at which to automatically refetch the query data.
    // This option will cause the query to be refetched at regular intervals, regardless of whether the component is mounted or the window is focused.

    // refetchIntervalInBackground: true,
    // Whether to continue automatic refetching when the tab is in the background.
    // If set to true, automatic refetching will continue even if the tab is not active.

    // onSuccess,
    // A function that will be called when the query is successful.
    // You can use this callback to perform additional actions after the data is successfully fetched.

    // onError,
    // A function that will be called when the query encounters an error.
    // You can use this callback to handle errors or perform error-specific actions.

    // select: data => data,
    // A selector function that allows you to transform or select specific data from the query result.
    // By default, React Query will store the entire query result object, but you can use this option to store only the data you need.
  });
};
