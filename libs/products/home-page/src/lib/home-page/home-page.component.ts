import { Component, inject, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  getProducts,
  getProductsState,
  ProductsPartialState,
} from '@nx-example/shared/product/state';
import { Product } from '@nx-example/shared/product/types';
import '@nx-example/shared/product/ui';
import { PokedexService } from './services/pokedex.service';
import { LoggerService } from './services/logger/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'products-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products: Observable<Product[]> = this.store.pipe(
    select(getProductsState),
    select(getProducts)
  );

  private pokedexService = inject(PokedexService);
  private loggerService = inject(LoggerService);
  constructor(private store: Store<ProductsPartialState>) {}

  ngOnInit(): void {
    const t0 = performance.now();
      this.pokedexService.getPokemons().subscribe({
        next: (success) => {
          console.log(success);
          this.loggerService.info(
            'requisição realizada com sucesso para API Pokedex'
          );
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          const stringError = JSON.stringify(error);
          console.log(stringError);
          this.loggerService.error(
            `falha na requisição para a API, detalhes: ${error.status} - ${error.name}`,
            {},
            error
          );
        },
        complete: () => {
          const t1 = performance.now();
          this.loggerService.info(`tempo total da requisição à API em segundos: ${(t1 - t0)/1000}`)
        },
      });
  }
}
