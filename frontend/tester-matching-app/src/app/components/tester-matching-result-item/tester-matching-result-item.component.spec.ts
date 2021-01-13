import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterMatchingResultItemComponent } from './tester-matching-result-item.component';

describe('TesterMatchingResultItemComponent', () => {
  let component: TesterMatchingResultItemComponent;
  let fixture: ComponentFixture<TesterMatchingResultItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterMatchingResultItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterMatchingResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
