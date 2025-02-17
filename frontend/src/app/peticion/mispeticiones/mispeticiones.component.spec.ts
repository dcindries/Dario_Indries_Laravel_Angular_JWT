import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MispeticionesComponent } from './mispeticiones.component';

describe('MispeticionesComponent', () => {
  let component: MispeticionesComponent;
  let fixture: ComponentFixture<MispeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MispeticionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MispeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
