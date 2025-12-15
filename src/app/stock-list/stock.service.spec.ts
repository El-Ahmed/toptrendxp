import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Stock, StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;
  let httpTestingController: HttpTestingController;

  const mockStocks: Stock[] = [{ symbol: 'AAPL' }, { symbol: 'GOOGL' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(StockService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch stocks', async () => {
    const promise = firstValueFrom(service.getStocks());

    const req = httpTestingController.expectOne('/stocks.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockStocks);

    const stocks = await promise;
    expect(stocks).toEqual(mockStocks);
  });
});
