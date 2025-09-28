import {AfterViewInit, Component, inject, input, InputSignal, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {ProductType} from '@core/models';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {ProductService} from '@core/services';

@Component({
  selector: 'app-product-caption',
  standalone: true,
  imports: [CommonModule, Button, IconField, InputIcon, InputText, ReactiveFormsModule],
  templateUrl: './product-caption.html',
  styleUrl: './product-caption.scss'
})
export class ProductCaption implements AfterViewInit {
  private router = inject(Router);
  private productService = inject(ProductService);
  selectedProducts: InputSignal<ProductType[]> = input.required();
  searchInput: InputSignal<FormControl> = input.required();
  delete = output<{ event: Event; products: ProductType[] }>();

  ngAfterViewInit(): void {
    this.searchInput().valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe({
        next: value => {
          if (value) {
            this.productService.getProducts({search: value});
          } else {
            this.productService.getProducts({});
          }
        }
      })
  }

  changeRoute(): void {
    this.router.navigate([`/products/new`]).then();
  }
}
