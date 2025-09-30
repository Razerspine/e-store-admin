import {AfterViewInit, Component, inject, input, InputSignal, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-table-caption',
  standalone: true,
  imports: [CommonModule, Button, IconField, InputIcon, InputText, ReactiveFormsModule],
  templateUrl: './table-caption.component.html',
  styleUrl: './table-caption.component.scss'
})
export class TableCaptionComponent<T> implements AfterViewInit {
  private router = inject(Router);
  selectedItems: InputSignal<T[]> = input.required();
  searchInput: InputSignal<FormControl> = input.required();
  buttonLabel = input<string>('Add Item');
  buttonRoute = input<string>('');
  onDelete = output<{ event: Event; items: T[] }>();
  onSearch = output<string>();


  ngAfterViewInit(): void {
    this.searchInput().valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
      )
      .subscribe({
        next: value => {
          this.onSearch.emit(value ?? '');
        }
      })
  }

  changeRoute(): void {
    this.router.navigate([this.buttonRoute()]).then();
  }
}
