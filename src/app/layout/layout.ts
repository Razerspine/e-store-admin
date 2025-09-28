import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Header} from '@app/layout/header/header';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
}
