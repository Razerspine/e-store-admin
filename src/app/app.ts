import {Component} from '@angular/core';
import {Layout} from './layout/layout';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [Layout, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
