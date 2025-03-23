import { Injectable } from '@angular/core';
import {
  UserInterface,
  UserListValidationSchema,
  UserValidationSchema,
} from '@src/app/types/UserInterface';
import { httpClient } from './httpClient.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async getUsers() {
    return await httpClient<UserInterface[]>(
      'https://jsonplaceholder.typicode.com/users',
      UserListValidationSchema
    );
  }

  async getUserById(userId: string) {
    return await httpClient<UserInterface>(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      UserValidationSchema
    );
  }
}
