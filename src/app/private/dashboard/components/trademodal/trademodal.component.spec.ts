import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademodalComponent } from './trademodal.component';

describe('TrademodalComponent', () => {
  let component: TrademodalComponent;
  let fixture: ComponentFixture<TrademodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrademodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
