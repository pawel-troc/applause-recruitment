import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TesterMatchingResultListComponent} from './tester-matching-result-list.component';
import {By} from '@angular/platform-browser';
import {TesterMatchingResultItemComponent} from '../tester-matching-result-item/tester-matching-result-item.component';

describe('TesterMatchingResultComponent', () => {
  let component: TesterMatchingResultListComponent;
  let fixture: ComponentFixture<TesterMatchingResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TesterMatchingResultListComponent, TesterMatchingResultItemComponent]
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

  it('should not display result list when input undefined', () => {
    expect(component.matchedTesters).toBe(undefined);
    const resultList = fixture.debugElement.query(By.css('.testers-result-list'));
    expect(resultList).toBeFalsy();
  });

  it('should display result list after input set', () => {
    component.matchedTesters = [];
    fixture.detectChanges();
    const resultList = fixture.debugElement.query(By.css('.testers-result-list'));
    expect(resultList).toBeTruthy();
  });

  it('should display no results found label when input is empty array', () => {
    component.matchedTesters = [];
    fixture.detectChanges();
    const resultList = fixture.debugElement.query(By.css('.testers-result-list__no-results'));
    expect(resultList).toBeTruthy();
  });

  it('should display result item for each matched tester', () => {
    component.matchedTesters = [
      {
        id: 1, firstName: 'Adam', lastName: 'Nowak', foundBugsQuantity: 0
      },
      {
        id: 2, firstName: 'Pawel', lastName: 'Nowak', foundBugsQuantity: 1
      },
    ];
    fixture.detectChanges();
    const resultList = fixture.debugElement.queryAll(By.css('app-tester-matching-result-item'));
    expect(resultList.length).toBe(2);
  });
});
