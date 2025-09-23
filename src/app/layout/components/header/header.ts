import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Toolbar} from 'primeng/toolbar';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Toolbar, Select, FormsModule, Button, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  languages = [
    {value: 'en', label: 'ENG'},
    {value: 'uk', label: 'UK'},
  ];
  selectedLanguage: string = 'en';
  theme: 'dark' | 'light' = 'dark';

  toggleTheme(): void {
    const element = document.querySelector('html');
    element?.classList?.toggle('p-dark');
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }
}
