import {Component, computed, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableCaptionComponent, TemplateTableComponent} from '@app/shared';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {TableModule, TablePageEvent} from 'primeng/table';
import {buildUserTable, USER_TABLE_CONFIG, UserColumnType, UserFacade, UserType} from '@features/users';
import {UserTableActions} from './user-table-actions.service';
import {TableConfigType} from '@core/models';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TemplateTableComponent, ConfirmPopup, TableModule, TableCaptionComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private facade = inject(UserFacade);
  private actions = inject(UserTableActions);
  columns = USER_TABLE_CONFIG;
  selectedUsers = signal<UserType[]>([]);
  searchInput = new FormControl('');
  tableConfig = computed<TableConfigType<UserType, UserColumnType>>(() =>
    buildUserTable(
      this.columns,
      this.facade.paginator,
      this.facade.users,
      this.selectedUsers,
      this.onPageChange.bind(this),
    )
  );

  constructor() {
    this.facade.loadUsers({});
  }

  onPageChange(event: TablePageEvent): void {
    const {first, rows} = event;
    const page = Math.floor(first / rows) + 1;
    this.facade.loadUsers({page: page, limit: rows});
  }

  onDelete(event: Event, users: UserType[]) {
    this.actions.confirmDelete(event, users, () => this.selectedUsers.set([]));
  }

  showDetails(row: UserType) {
    this.actions.navigateToDetails(row);
  }

  onSearch(event: string) {
    this.facade.loadUsers({search: event});
  }
}
