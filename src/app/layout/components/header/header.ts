import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Toolbar} from 'primeng/toolbar';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {SharedDataService} from '@core/services';
import {Popover} from 'primeng/popover';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Toolbar, FormsModule, Button, RouterLink, Popover],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  sharedService = inject(SharedDataService);
  selectedLanguage = signal(this.sharedService.data().defaultLanguage);
  icon: WritableSignal<'pi pi-moon' | 'pi pi-sun'> = signal('pi pi-moon');

  toggleTheme(): void {
    const element = document.querySelector('html');
    element?.classList?.toggle('p-dark');
    this.icon.update(prev => prev === 'pi pi-moon' ? 'pi pi-sun' : 'pi pi-moon');
  }

  onSelected(lang: any): void {
    this.selectedLanguage.set(lang);
  }
}
