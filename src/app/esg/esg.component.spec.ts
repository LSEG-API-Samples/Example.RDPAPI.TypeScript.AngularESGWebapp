import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgComponent } from './esg.component';

describe('EsgComponent', () => {
  let component: EsgComponent;
  let fixture: ComponentFixture<EsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
