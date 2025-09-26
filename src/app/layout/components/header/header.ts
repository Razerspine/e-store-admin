import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Toolbar} from 'primeng/toolbar';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {SharedDataService} from '@core/services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Toolbar, Select, FormsModule, Button, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  sharedService = inject(SharedDataService);
  selectedLanguage = signal(this.sharedService.data().defaultLanguage['key']);
  theme: WritableSignal<'dark' | 'light'> = signal('dark');

  toggleTheme(): void {
    const element = document.querySelector('html');
    element?.classList?.toggle('p-dark');
    this.theme.update(prev => prev === 'dark' ? 'light' : 'dark');
  }
}
