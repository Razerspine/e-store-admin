import {inject, Injectable, signal} from '@angular/core';
import {UserApiService, UserFiltersType, UserType} from '@features/users';
import {finalize, Observable, tap} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {PaginatorType} from '@core/models';

type UserResponse = {
  items: UserType[];
  meta: PaginatorType;
}

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private api = inject(UserApiService);

  users = signal<UserType[]>([]);
  paginator = signal<PaginatorType>({
    limit: 20,
    page: 1,
    pages: 0,
    total: 0,
  });
  isLoading = signal<boolean>(false);

  loadUsers({search, role, page = 1, limit = 20}: Partial<UserFiltersType> = {}): Observable<UserResponse> {
    this.isLoading.set(true);
    const params = new HttpParams()
      .set('search', search ?? '')
      .set('role', role ?? '')
      .set('page', page)
      .set('limit', limit);

    return this.api.getUsers(params).pipe(
      tap((response) => {
        this.users.set(response.items ?? []);
        this.paginator.set(response?.meta);
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    );
  }
}
