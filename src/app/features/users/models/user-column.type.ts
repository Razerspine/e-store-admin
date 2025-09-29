import {UserType} from '@features/users';

export type UserColumnType = {
  name: string,
  field: string,
  value: (value: Pick<UserType, 'userId' | 'email' | 'role' | 'createdAt' | 'updatedAt'>) => string
}
