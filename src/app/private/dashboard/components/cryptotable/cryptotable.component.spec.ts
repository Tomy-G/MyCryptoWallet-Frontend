import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptotableComponent } from './cryptotable.component';

describe('CryptotableComponent', () => {
  let component: CryptotableComponent;
  let fixture: ComponentFixture<CryptotableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptotableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
