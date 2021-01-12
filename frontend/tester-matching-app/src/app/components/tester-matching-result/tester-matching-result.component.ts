import {Component, Input, OnInit} from '@angular/core';
import {MatchedTester} from '../../model/MatchedTester';

@Component({
  selector: 'app-tester-matching-result',
  templateUrl: './tester-matching-result.component.html',
  styleUrls: ['./tester-matching-result.component.scss']
})
export class TesterMatchingResultComponent implements OnInit {

  @Input()
  public matchedTesters: MatchedTester[] = [
    {id: 1, firstName: 'Adam', lastName: 'Bak', foundBugsQuantity: 1},
    {id: 2, firstName: 'Dupa', lastName: 'Dupa', foundBugsQuantity: 1},
  ];

  public columnsToDisplay = ['name', 'bugsFoundAmount'];

  constructor() {
  }

  ngOnInit() {
  }

}
