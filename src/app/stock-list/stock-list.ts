import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock, StockService } from './stock.service';

@Component({
  selector: 'app-stock-list',
  imports: [AsyncPipe],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.scss',
})
export class StockList {
  private stockService = inject(StockService);

  stocks$: Observable<Stock[]> = this.stockService.getStocks();
}
