import {Component, Input, OnInit} from '@angular/core';
import {MatchedTester} from '../../model/MatchedTester';

@Component({
  selector: 'app-tester-matching-result-list',
  templateUrl: './tester-matching-result-list.component.html',
  styleUrls: ['./tester-matching-result-list.component.scss']
})
export class TesterMatchingResultListComponent implements OnInit {

  @Input()
  public matchedTesters: MatchedTester[];

  constructor() {
  }

  ngOnInit() {
  }

}
