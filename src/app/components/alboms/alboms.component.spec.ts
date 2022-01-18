import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbomsComponent } from './alboms.component';

describe('AlbomsComponent', () => {
  let component: AlbomsComponent;
  let fixture: ComponentFixture<AlbomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
