import {UserColumnType} from '@features/users';
import {DatePipe} from '@angular/common';
import {DATE_CONFIG} from '@core/configs';

const datePipe = new DatePipe('en-US');

export const USER_TABLE_CONFIG: UserColumnType[] = [
  {
    name: 'User ID',
    field: 'userId',
    value: (value) => value?.userId ?? '',
  },
  {
    name: 'Email',
    field: 'email',
    value: (value) => value?.email ?? '',
  },
  {
    name: 'Role',
    field: 'role',
    value: (value) => value?.role ?? '',
  },
  {
    name: 'Created At',
    field: 'createdAt',
    value: (value) => {
      if (value.createdAt) {
        const formated = datePipe.transform(value.createdAt, DATE_CONFIG.format, DATE_CONFIG.timezone);
        return `${formated}`;
      } else {
        return '';
      }
    },
  },
  {
    name: 'Updated At',
    field: 'updatedAt',
    value: (value) => {
      if (value.updatedAt) {
        const formated = datePipe.transform(value.updatedAt, DATE_CONFIG.format, DATE_CONFIG.timezone);
        return `${formated}`;
      } else {
        return '';
      }
    },
  }
]
