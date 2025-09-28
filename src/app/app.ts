import {Component} from '@angular/core';
import {LayoutComponent} from '@layout/layout.component';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
