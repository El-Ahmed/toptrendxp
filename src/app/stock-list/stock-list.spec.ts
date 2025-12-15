import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { StockList } from './stock-list';
import { Stock, StockService } from './stock.service';

describe('StockList', () => {
  let component: StockList;
  let fixture: ComponentFixture<StockList>;
  let stocksSubject: BehaviorSubject<Stock[] | null>;
  let mockStockService: Partial<StockService>;

  beforeEach(async () => {
    stocksSubject = new BehaviorSubject<Stock[] | null>([]);

    mockStockService = {
      getStocks: vi.fn().mockReturnValue(stocksSubject.asObservable()),
    };
    await TestBed.configureTestingModule({
      imports: [StockList],
      providers: [{ provide: StockService, useValue: mockStockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StockList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Loading..." when there is no data yet', () => {
    stocksSubject.next(null);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Loading...');
  });

  it('should show "No stocks available" when the stocks array is empty', () => {
    stocksSubject.next([]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No stocks available');
  });

  it('should render a list of stock symbols', () => {
    const mockData: Stock[] = [{ symbol: 'AAPL' }, { symbol: 'GOOG' }];
    stocksSubject.next(mockData);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.card');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('AAPL');
    expect(items[1].textContent).toContain('GOOG');
  });
});
