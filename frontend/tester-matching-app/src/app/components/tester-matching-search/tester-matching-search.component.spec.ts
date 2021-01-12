import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterMatchingSearchComponent } from './tester-matching-search.component';

describe('TesterMatchingSearchComponent', () => {
  let component: TesterMatchingSearchComponent;
  let fixture: ComponentFixture<TesterMatchingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterMatchingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterMatchingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
