import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoTrabajosComponent } from './equipo-trabajos.component';

describe('EquipoTrabajosComponent', () => {
  let component: EquipoTrabajosComponent;
  let fixture: ComponentFixture<EquipoTrabajosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoTrabajosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
