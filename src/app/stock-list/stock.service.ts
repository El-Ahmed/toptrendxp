import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Stock {
  symbol: string;
}

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private http = inject(HttpClient);

  private readonly STOCKS_URL = '/stocks.json';

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.STOCKS_URL);
  }
}
