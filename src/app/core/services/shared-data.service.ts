import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, forkJoin, of} from 'rxjs';
import {CategoryType, CurrencyType, LanguageType} from '@core/models';
import {CATEGORIES_CONFIG, CURRENCY_CONFIG, LANGUAGES_CONFIG} from '@core/configs';

type ShareDataType = {
  languages: LanguageType[];
  defaultLanguage: LanguageType;
  currencies: CurrencyType[];
  defaultCurrency: CurrencyType;
  categories: CategoryType[];
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private http = inject(HttpClient);
  fallBackLanguages: LanguageType[] = LANGUAGES_CONFIG;
  fallBackCurrencies: CurrencyType[] = CURRENCY_CONFIG;
  fallBackCategories: CategoryType[] = CATEGORIES_CONFIG;
  data: WritableSignal<ShareDataType> = signal({
    languages: this.fallBackLanguages,
    defaultLanguage: this.fallBackLanguages.find(l => l.isDefault)!,
    currencies: this.fallBackCurrencies,
    defaultCurrency: this.fallBackCurrencies.find(c => c.isDefault)!,
    categories: this.fallBackCategories
  });

  constructor() {
    this.getData();
  }

  getData(): void {
    const languages$ = this.http.get<LanguageType[]>(`${environment.apiBaseUrl}/api/public/languages`)
      .pipe(
        catchError((error) => {
          console.log('Error load languages: ', error);
          return of(this.fallBackLanguages);
        })
      );

    const currencies$ = this.http.get<CurrencyType[]>(`${environment.apiBaseUrl}/api/public/currencies`)
      .pipe(
        catchError((error) => {
          console.log('Error load currencies: ', error);
          return of(this.fallBackCurrencies);
        })
      );

    const categories$ = this.http.get<CategoryType[]>(`${environment.apiBaseUrl}/api/public/categories`).pipe(
      catchError((error) => {
        console.log('Error load categories: ', error);
        return of(this.fallBackCategories);
      })
    );

    forkJoin({
      languages: languages$,
      currencies: currencies$,
      categories: categories$,
    }).subscribe(({languages, currencies, categories}) => {
      const defaultLanguage = languages.find(lang => lang.isDefault) ?? this.fallBackLanguages.find(l => l.isDefault)!;
      const defaultCurrency = currencies.find(curr => curr.isDefault) ?? this.fallBackCurrencies.find(c => c.isDefault)!;
      this.data.set({
        languages,
        defaultLanguage,
        currencies,
        defaultCurrency,
        categories
      });
    });
  }
}
