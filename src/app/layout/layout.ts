import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Header} from '@app/layout/components/header/header';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
}
