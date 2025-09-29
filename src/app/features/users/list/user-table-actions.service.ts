import {UserFacade, UserType} from '@features/users';
import {inject, Injectable} from '@angular/core';
import {BaseTableActionsService} from '@core/services';

@Injectable({providedIn: 'root'})
export class UserTableActions extends BaseTableActionsService<UserType> {
  private userFacade = inject(UserFacade);

  protected getId(item: UserType): string {
    return item.userId;
  }

  protected getDeleteMessage(items: UserType[]): string {
    return `Are you sure you want to delete ${items.length} user(s)?`;
  }

  protected deleteItems(ids: string[]): void {
    this.userFacade.deleteUser(ids)
  }

  protected getDetailsUrl(item: UserType): string {
    return `/users/${item.userId}`;
  }
}
