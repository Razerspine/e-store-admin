import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

type UploadResponse = {
  url: string;
  publicId: string;
}

type DeleteResponse = {
  message: string;
  publicId: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private http = inject(HttpClient);

  upload(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<UploadResponse>(`${environment.apiBaseUrl}/api/private/upload`, formData);
  }

  delete(publicId: string): Observable<DeleteResponse> {
    const encodedId = encodeURIComponent(publicId)
    return this.http.delete<DeleteResponse>(`${environment.apiBaseUrl}/api/private/delete/${encodedId}`);
  }
}
