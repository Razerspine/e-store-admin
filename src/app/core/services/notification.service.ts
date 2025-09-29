import {inject, Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private message = inject(MessageService);

  success(detail: string, summary = 'Success!', life = 5000): void {
    this.message.add({
      severity: 'success',
      summary,
      detail,
      life,
    });
  }

  error(detail: string, summary = 'Error!', life = 8000): void {
    this.message.add({
      severity: 'error',
      summary,
      detail,
      life,
    });
  }

  warn(detail: string, summary = 'Warning!', life = 5000): void {
    this.message.add({
      severity: 'warn',
      summary,
      detail,
      life,
    });
  }

  info(detail: string, summary = 'Info!', life = 5000): void {
    this.message.add({
      severity: 'info',
      summary,
      detail,
      life,
    });
  }
}
