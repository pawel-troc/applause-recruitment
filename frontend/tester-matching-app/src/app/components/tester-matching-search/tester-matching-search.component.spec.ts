import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CountryCode, TesterMatchingSearchComponent} from './tester-matching-search.component';
import {DeviceService} from '../../services/device.service';
import {CountryCodeService} from '../../services/country-code.service';
import {TesterMatchingService} from '../../services/tester-matching.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {Device} from '../../model/Device';
import {of} from 'rxjs';
import {MatchedTester} from '../../model/MatchedTester';
import {By} from '@angular/platform-browser';

describe('TesterMatchingSearchComponent', () => {
  let component: TesterMatchingSearchComponent;
  let fixture: ComponentFixture<TesterMatchingSearchComponent>;
  let deviceServiceSpy: jasmine.SpyObj<DeviceService>;
  let countryCodeServiceSpy: jasmine.SpyObj<CountryCodeService>;
  let testerMatchingServiceSpy: jasmine.SpyObj<TesterMatchingService>;
  const expectedDevices: Device[] = [
    {id: 1, description: 'iPhone X'},
    {id: 2, description: 'Xiaomi Mi6'}
  ];
  const expectedCountryCodes: CountryCode[] = [
    {code: 'UK'},
    {code: 'PL'},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TesterMatchingSearchComponent],
      providers: [
        FormBuilder,
        {
          provide: DeviceService,
          useValue: jasmine.createSpyObj('DeviceService', ['getDevices'])
        },
        {
          provide: CountryCodeService,
          useValue: jasmine.createSpyObj('CountryCodeService', ['getCountryCodes'])
        },
        {
          provide: TesterMatchingService,
          useValue: jasmine.createSpyObj('TesterMatchingService', ['matchTesters'])
        },
      ],
      imports: [
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    deviceServiceSpy = TestBed.get(DeviceService);
    countryCodeServiceSpy = TestBed.get(CountryCodeService);
    testerMatchingServiceSpy = TestBed.get(TesterMatchingService);

    deviceServiceSpy.getDevices.and.returnValue(of(expectedDevices));
    countryCodeServiceSpy.getCountryCodes.and.returnValue(of(['UK', 'PL']));

    fixture = TestBed.createComponent(TesterMatchingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch countryCodes and devices on init', () => {
    expect(component.devices).toEqual(expectedDevices);
    expect(component.countryCodes).toEqual(expectedCountryCodes);
  });

  it('should initialize form on init', () => {
    expect(component.form.contains('countryCodes')).toBe(true);
    expect(component.form.contains('devices')).toBe(true);
  });

  it('should mark form invalid when countryCodes not selected', () => {
    expect(component.form.get('countryCodes').value).toEqual(null);
    expect(component.form.valid).toBe(false);
  });

  it('should mark form invalid when devices not selected', () => {
    expect(component.form.get('devices').value).toEqual(null);
    expect(component.form.valid).toBe(false);
  });

  it('should form be valid when countryCodes and devices selected', () => {
    component.form.get('countryCodes').setValue(expectedCountryCodes);
    component.form.get('devices').setValue(expectedDevices);
    expect(component.form.valid).toBe(true);
  });

  it('should call testerMatchingService if form is valid', () => {
    component.form.get('countryCodes').setValue(expectedCountryCodes);
    component.form.get('devices').setValue(expectedDevices);
    testerMatchingServiceSpy.matchTesters.and.returnValue(of([]));

    component.submitSearch();

    expect(testerMatchingServiceSpy.matchTesters.calls.count()).toBe(1);
  });

  it('should not call testerMatchingService if form not valid', () => {
    spyOnProperty(component.form, 'valid').and.returnValue(false);

    component.submitSearch();

    expect(testerMatchingServiceSpy.matchTesters.calls.count()).toBe(0);
  });

  it('should emit result of matchTesters call', () => {
    component.form.get('countryCodes').setValue(expectedCountryCodes);
    component.form.get('devices').setValue(expectedDevices);
    const expectedTesters: MatchedTester[] = [{
      id: 1, firstName: 'Paul', lastName: 'Walker', foundBugsQuantity: 10
    }];
    testerMatchingServiceSpy.matchTesters.and.returnValue(of(expectedTesters));
    spyOn(component.searchPerformed, 'emit');

    component.submitSearch();

    expect(component.searchPerformed.emit).toHaveBeenCalledWith(expectedTesters);
  });

  it('should render submit button', () => {
    const button = fixture.debugElement.query(By.css('.search-form__button')).nativeElement;
    expect(button).toBeTruthy();
  });

  it('should disable button when form not valid', () => {
    spyOnProperty(component.form, 'valid').and.returnValue(false);
    const button = fixture.debugElement.query(By.css('.search-form__button')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it('should call submitSearch after clicking button', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('.search-form__button'));
    spyOn(component, 'submitSearch').and.callThrough();

    button.triggerEventHandler('click', null);
    tick();

    expect(component.submitSearch).toHaveBeenCalled();
  }));

  it('should render countryCodes dropdown', () => {
    const dropdown = fixture.debugElement.query(By.css('[name~="countryCodes"]'));
    expect(dropdown).toBeTruthy();
  });

  it('should render devices dropdown', () => {
    const dropdown = fixture.debugElement.query(By.css('[name~="devices"]'));
    expect(dropdown).toBeTruthy();
  });
});
