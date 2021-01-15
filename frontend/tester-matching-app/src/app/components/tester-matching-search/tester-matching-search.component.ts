import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TesterMatchingService} from '../../services/tester-matching.service';
import {MatchedTester} from '../../model/MatchedTester';
import {Device} from '../../model/Device';
import {CountryCodeService} from '../../services/country-code.service';
import {DeviceService} from '../../services/device.service';
import {forkJoin} from 'rxjs';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

export interface CountryCode {
  code: string;
}

@Component({
  selector: 'app-tester-matching-search',
  templateUrl: './tester-matching-search.component.html',
  styleUrls: ['./tester-matching-search.component.scss']
})
export class TesterMatchingSearchComponent implements OnInit {

  @Output()
  public searchPerformed: EventEmitter<MatchedTester[]> = new EventEmitter<MatchedTester[]>();

  public devices: Device[] = [];
  public countryCodes: CountryCode[] = [];
  public form: FormGroup;

  public countryCodeDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'code',
    textField: 'code',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect All',
  };

  public deviceDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'description',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect All',
  };

  constructor(
    private formBuilder: FormBuilder,
    private testerMatchingService: TesterMatchingService,
    private countryCodeService: CountryCodeService,
    private deviceService: DeviceService) {
  }

  ngOnInit() {
    forkJoin(
      this.countryCodeService.getCountryCodes(),
      this.deviceService.getDevices(),
    ).subscribe(([countryCodes, devices]) => {
      this.devices = devices;
      this.countryCodes = countryCodes.map((countryCode) => ({code: countryCode}));
    }, (error) => {
      console.error(error);
    });

    this.form = this.formBuilder.group({
      countryCodes: [null, Validators.required],
      devices: [null, Validators.required],
    });
  }

  public submitSearch(): void {
    if (this.form.valid) {
      this.testerMatchingService.matchTesters(
        this.form.get('countryCodes').value.map((countryCode: CountryCode) => countryCode.code),
        this.form.get('devices').value.map((device) => device.id),
      ).subscribe(
        (matchedTesters) => this.searchPerformed.emit(matchedTesters),
        (error) => {
          console.error(error);
        });
    }
  }
}
