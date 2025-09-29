import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserType} from '@features/users';
import {PaginatorType} from '@core/models';

type UserResponse = {
  items: UserType[];
  meta: PaginatorType;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/api/private/users`;

  getUsers(params: HttpParams): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl, {params});
  }

  getUser(userId: string): Observable<UserType> {
    return this.http.get<UserType>(`${this.baseUrl}/${userId}`);
  }

  createUser(user: Partial<UserType>): Observable<UserType> {
    return this.http.post<UserType>(this.baseUrl, user);
  }

  updateUser(userId: string, changes: Partial<UserType>): Observable<UserType> {
    return this.http.patch<UserType>(`${this.baseUrl}/${userId}`, changes);
  }

  deleteUser(userId: string[]): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.baseUrl, {body: userId});
  }
}
