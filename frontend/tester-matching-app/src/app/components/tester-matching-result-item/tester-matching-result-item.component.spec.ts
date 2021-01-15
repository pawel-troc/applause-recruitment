import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterMatchingResultItemComponent } from './tester-matching-result-item.component';
import {By} from '@angular/platform-browser';

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

  it('should not display anything when tester not set', () => {
    component.matchedTester = undefined;
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('.tester-card'));
    expect(card).toBeFalsy();
  });

  it('should display tester name', () => {
    component.matchedTester = {
      id: 1, firstName: 'Adam', lastName: 'Nowak', foundBugsQuantity: 0
    };
    fixture.detectChanges();

    const name = fixture.debugElement.query(By.css('.tester-card__name')).nativeElement.textContent;
    expect(name).toContain('Adam Nowak');
  });

  it('should display amount of bugs found', () => {
    component.matchedTester = {
      id: 1, firstName: 'Adam', lastName: 'Nowak', foundBugsQuantity: 10
    };
    fixture.detectChanges();

    const name = fixture.debugElement.query(By.css('.tester-card__bugs')).nativeElement.textContent;
    expect(name).toContain('10');
  });
});
