import {Component, inject, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Toolbar} from 'primeng/toolbar';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {AuthService, SharedDataService} from '@core/services';
import {Popover} from 'primeng/popover';
import {LanguageType} from '@core/models';
import {UserInfoComponent} from '@layout/header/user-info/user-info.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Toolbar, FormsModule, Button, RouterLink, Popover, UserInfoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  sharedService = inject(SharedDataService);
  selectedLanguage: WritableSignal<LanguageType> = signal(this.sharedService.data().defaultLanguage);
  icon: WritableSignal<'pi pi-moon' | 'pi pi-sun'> = signal('pi pi-moon');

  constructor() {
    if (!this.authService.isLoggedIn()) {
      return;
    }
    this.authService.userInfo();
  }

  toggleTheme(): void {
    const element = document.querySelector('html');
    element?.classList?.toggle('p-dark');
    this.icon.update(prev => prev === 'pi pi-moon' ? 'pi pi-sun' : 'pi pi-moon');
  }

  onSelected(lang: any): void {
    this.selectedLanguage.set(lang);
  }

  logout(event: boolean) {
    if (event) {
      this.authService.logout();
    }
  }
}
