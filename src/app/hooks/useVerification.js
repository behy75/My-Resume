import axios from 'axios';
import { useMutation } from 'react-query';

const baseURL = 'http://localhost:3001/';

const register = async data => {
  debugger;
  try {
    const response = await axios.post(
      `${baseURL}/register`,
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

export const useRegisterNewUser = () => {
  return useMutation(register);
};
