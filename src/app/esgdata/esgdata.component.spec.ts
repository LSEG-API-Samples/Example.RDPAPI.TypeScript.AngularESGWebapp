import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsgdataComponent } from './esgdata.component';

describe('EsgdataComponent', () => {
  let component: EsgdataComponent;
  let fixture: ComponentFixture<EsgdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsgdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsgdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
