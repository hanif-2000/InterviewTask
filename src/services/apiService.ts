import axios from 'axios';

const API_URL = 'https://tor.appdevelopers.mobi/api/';

interface RegisterParams {
  phone: string;
  name: string;
  password: string;
}

interface LoginParams {
  phone: string;
  password: string;
}

export const registerUser = async (params: RegisterParams) => {
  try {
    const response = await axios.post(`${API_URL}register`, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error registering user:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const loginUser = async (params: LoginParams) => {
  try {
    const response = await axios.post(`${API_URL}login`, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.warn(error)
    if (axios.isAxiosError(error)) {
      console.error('Error registering user:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
