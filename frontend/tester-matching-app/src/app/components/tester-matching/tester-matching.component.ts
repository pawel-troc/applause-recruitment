import {Component, OnInit} from '@angular/core';
import {MatchedTester} from '../../model/MatchedTester';

@Component({
  selector: 'app-tester-matching',
  templateUrl: './tester-matching.component.html',
  styleUrls: ['./tester-matching.component.scss']
})
export class TesterMatchingComponent implements OnInit {

  public searchResult: MatchedTester[];

  constructor() {
  }

  ngOnInit(): void {
  }

  public setSearchResult($event: MatchedTester[]): void {
    this.searchResult = $event;
  }
}
