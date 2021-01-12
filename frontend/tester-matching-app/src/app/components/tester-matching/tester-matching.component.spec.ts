import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterMatchingComponent } from './tester-matching.component';

describe('TesterMatchingComponent', () => {
  let component: TesterMatchingComponent;
  let fixture: ComponentFixture<TesterMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesterMatchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
