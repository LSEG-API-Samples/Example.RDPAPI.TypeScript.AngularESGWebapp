import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NogFoundComponent } from './nog-found.component';

describe('NogFoundComponent', () => {
  let component: NogFoundComponent;
  let fixture: ComponentFixture<NogFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NogFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NogFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
