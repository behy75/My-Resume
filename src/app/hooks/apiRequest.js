import axios from 'axios';

const baseURL = 'http://localhost:4000/';

export const apiRequest = async (method, url, payload = {}) => {
  try {
    const userStore = localStorage.getItem('user');
    const userData = JSON.parse(userStore);
    const token = userData?.token;
    const email = userData?.email;
    let newPayload = { ...payload };

    if (!!email) {
      newPayload = { ...payload, email };
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      method: method,
      url: `${baseURL}${url}`,
      headers: headers,
    };

    if (method.toLowerCase() === 'get') {
      config.params = newPayload; // Use params for GET requests
    } else {
      config.data = newPayload; // Use data for other request types
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
