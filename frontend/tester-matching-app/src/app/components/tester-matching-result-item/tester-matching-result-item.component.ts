import {Component, Input, OnInit} from '@angular/core';
import {MatchedTester} from '../../model/MatchedTester';

@Component({
  selector: 'app-tester-matching-result-item',
  templateUrl: './tester-matching-result-item.component.html',
  styleUrls: ['./tester-matching-result-item.component.scss']
})
export class TesterMatchingResultItemComponent implements OnInit {

  @Input()
  public matchedTester: MatchedTester;

  constructor() {}

  ngOnInit() {
  }

}
