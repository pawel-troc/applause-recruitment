import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterMatchingResultListComponent } from './tester-matching-result-list.component';

describe('TesterMatchingResultComponent', () => {
  let component: TesterMatchingResultListComponent;
  let fixture: ComponentFixture<TesterMatchingResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterMatchingResultListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterMatchingResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
