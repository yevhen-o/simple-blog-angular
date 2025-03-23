import {
  UserInterface,
  UserListValidationSchema,
  UserValidationSchema,
} from '@src/app/types/UserInterface';
import { httpClient } from './httpClient.service';

export const getUsers = async () => {
  return await httpClient<UserInterface[]>(
    'https://jsonplaceholder.typicode.com/users',
    UserListValidationSchema
  );
};

export const getUserById = async (userId: string) => {
  return await httpClient<UserInterface>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    UserValidationSchema
  );
};

export const postNewUser = async (data: Partial<UserInterface>) => {
  return await httpClient(
    'http://localhost:3000/api/users',
    UserValidationSchema,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
};

export const updateUserById = async (data: UserInterface) => {
  return await httpClient(
    `http://localhost:3000/api/users/${data.id}`,
    UserValidationSchema,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    }
  );
};
