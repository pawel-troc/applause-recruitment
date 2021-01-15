import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TesterMatchingComponent} from './tester-matching.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatchedTester} from '../../model/MatchedTester';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'app-tester-matching-search',
  template: '<p>mock search component</p>'
})
class MockTesterMatchingSearchComponent {
  @Output() searchPerformed: EventEmitter<MatchedTester[]> = new EventEmitter<MatchedTester[]>();
}

@Component({
  selector: 'app-tester-matching-result-list',
  template: '<p>mock result list</p>'
})
class MockTesterMatchingResultListComponent {
  @Input() matchedTesters: MatchedTester[];
}

describe('TesterMatchingComponent', () => {
  let component: TesterMatchingComponent;
  let fixture: ComponentFixture<TesterMatchingComponent>;
  let searchComponentMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TesterMatchingComponent, MockTesterMatchingResultListComponent, MockTesterMatchingSearchComponent]
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

  it('should call setSearchResult when catch searchPerformed event', () => {
    const expectedTesters = [
      {
        id: 1, firstName: 'Adam', lastName: 'Nowak', foundBugsQuantity: 0
      },
      {
        id: 2, firstName: 'Pawel', lastName: 'Nowak', foundBugsQuantity: 1
      },
    ];

    spyOn(component, 'setSearchResult');
    searchComponentMock = fixture.debugElement.query(By.css('app-tester-matching-search'));
    searchComponentMock.triggerEventHandler('searchPerformed', expectedTesters);
    expect(component.setSearchResult).toHaveBeenCalledWith(expectedTesters);
  });
});
