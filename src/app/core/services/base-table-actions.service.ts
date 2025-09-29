import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';

export abstract class BaseTableActionsService<T> {
  protected confirmationService = inject(ConfirmationService);
  protected router = inject(Router);

  protected abstract getId(item: T): string;

  protected abstract getDeleteMessage(items: T[]): string;

  protected abstract deleteItems(ids: string[]): void;

  protected abstract getDetailsUrl(item: T): string;

  confirmDelete(event: Event, items: T[], afterDelete: () => void) {
    const ids = items.map(i => this.getId(i));
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: this.getDeleteMessage(items),
      icon: 'pi pi-info-circle',
      rejectButtonProps: {label: 'Cancel', severity: 'secondary', outlined: true},
      acceptButtonProps: {label: 'Confirm', severity: 'danger'},
      accept: () => {
        afterDelete();
        this.deleteItems(ids);
      }
    });
  }

  navigateToDetails(item: T) {
    this.router.navigate([this.getDetailsUrl(item)]).then();
  }
}
