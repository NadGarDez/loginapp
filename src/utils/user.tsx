import axios, { AxiosError } from 'axios';
import { ACCOUNT_ME_URL } from '../constants/system';
import { type UserReturn, type UserAxiosResponse } from '../types/api';

export const getUser = async (token: string): Promise<UserReturn> => {
  try {
    const { data }: UserAxiosResponse = await axios.get(ACCOUNT_ME_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: error.response?.data.status,
        errorMessage: error.response?.data.message,
      };
    }
    return {
      status: 400,
      errorMessage: 'Unexpected error',
    };
  }
};
