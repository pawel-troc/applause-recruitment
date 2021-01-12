import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterMatchingResultComponent } from './tester-matching-result.component';

describe('TesterMatchingResultComponent', () => {
  let component: TesterMatchingResultComponent;
  let fixture: ComponentFixture<TesterMatchingResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterMatchingResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterMatchingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
