import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipRoutingComponent } from './ship-routing.component';

describe('ShipRoutingComponent', () => {
  let component: ShipRoutingComponent;
  let fixture: ComponentFixture<ShipRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipRoutingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
