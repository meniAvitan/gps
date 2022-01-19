import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesHistotyComponent } from './routes-histoty.component';

describe('RoutesHistotyComponent', () => {
  let component: RoutesHistotyComponent;
  let fixture: ComponentFixture<RoutesHistotyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesHistotyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesHistotyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
