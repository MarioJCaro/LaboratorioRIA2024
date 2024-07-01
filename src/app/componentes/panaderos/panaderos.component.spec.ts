import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanaderosComponent } from './panaderos.component';

describe('PanaderosComponent', () => {
  let component: PanaderosComponent;
  let fixture: ComponentFixture<PanaderosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanaderosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanaderosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
