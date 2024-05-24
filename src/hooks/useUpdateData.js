import axios from 'axios';
import { useMutation } from 'react-query';

const baseURL = 'http://localhost:4001/';

const updateData = async data => {
  try {
    const response = await axios.patch(
      `${baseURL}${data.targetDataName}`,
      { ...data.updatedData },
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

export const useUpdateData = () => {
  return useMutation(updateData);
};
