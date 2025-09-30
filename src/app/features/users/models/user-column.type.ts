import {UserType} from '@features/users';
import {BaseColumnType} from '@core/models/base-column.type';

export type UserColumnType = BaseColumnType<
  Pick<UserType, 'userId' | 'email' | 'role' | 'createdAt' | 'updatedAt'>
>
