import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {TesterMatchingResultItemComponent} from './components/tester-matching-result-item/tester-matching-result-item.component';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavBarComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'tester-matching-client'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tester-matching-client');
  });

  it('should render navbar', () => {
    const compiled = fixture.debugElement.query(By.css('app-nav-bar'));
    expect(compiled).toBeTruthy();
  });
});
