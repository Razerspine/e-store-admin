import {UserColumnType  , UserType} from '@features/users';
import {TablePageEvent} from 'primeng/table';
import {Signal, WritableSignal} from '@angular/core';
import {PaginatorType, TableConfigType} from '@core/models';

export const buildUserTable = (
  columns: UserColumnType[],
  pagination: Signal<PaginatorType>,
  data: Signal<UserType[]>,
  selectedUsers: WritableSignal<UserType[]>,
  onPage: (event: TablePageEvent) => void
): TableConfigType<UserType, UserColumnType> => {
  return {
    columns,
    paginator: true,
    lazy: true,
    rows: pagination().limit,
    totalRecords: pagination().total,
    onPage,
    showCurrentPageReport: true,
    rowsPerPageOptions: [10, 20, 50],
    value: data(),
    selection: selectedUsers,
    dataKey: 'userId',
    globalFilterFields: ['role']
  };
};
