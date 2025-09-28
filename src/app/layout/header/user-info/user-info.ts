import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserType} from '@core/models';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss'
})
export class UserInfo {
  user: InputSignal<UserType | null> = input.required();
  logout: OutputEmitterRef<boolean> = output();

  onLogout() {
    this.logout.emit(true);
  }
}
