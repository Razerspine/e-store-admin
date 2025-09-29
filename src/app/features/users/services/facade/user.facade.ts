import {inject, Injectable} from '@angular/core';
import {NotificationService} from '@core/services';
import {Router} from '@angular/router';
import {UserApiService, UserFiltersType, UserStore, UserType} from '@features/users';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  private store = inject(UserStore);
  private api = inject(UserApiService);
  private notify = inject(NotificationService);
  private router = inject(Router);

  users = this.store.users;
  paginator = this.store.paginator;

  loadUsers(filters: Partial<UserFiltersType>) {
    this.store.loadUsers(filters).subscribe({
      error: (error) => this.notify.error(error?.error?.message ?? 'Unknown error'),
    });
  }

  getUser(userId: string): Observable<UserType> {
    return this.api.getUser(userId);
  }

  createUser(user: Partial<UserType>) {
    this.api.createUser(user).subscribe({
      next: () => {
        this.loadUsers({});
        this.router.navigate(['/users']).then();
        this.notify.success('User created successfully');
      },
      error: (error) => this.notify.error(error?.error?.message ?? 'Unknown error'),
    });
  }

  updateUser(userId: string, changes: Partial<UserType>) {
    this.api.updateUser(userId, changes).subscribe({
      next: () => {
        this.loadUsers({});
        this.router.navigate(['/users']).then();
        this.notify.success('User updated successfully');
      },
      error: (error) => this.notify.error(error?.error?.message ?? 'Unknown error'),
    });
  }

  deleteUser(userId: string[]) {
    if (!Array.isArray(userId)) return;
    this.api.deleteUser(userId).subscribe({
      next: (response) => {
        this.notify.success(response.message);
        this.loadUsers({});
      },
      error: (error) => this.notify.error(error?.error?.message ?? 'Unknown error'),
    });
  }
}
