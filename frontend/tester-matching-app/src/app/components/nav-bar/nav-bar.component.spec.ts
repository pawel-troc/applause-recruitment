import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarComponent} from './nav-bar.component';
import {By} from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display app name', () => {
    const appName = fixture.debugElement.query(By.css('.navbar__name')).nativeElement.textContent;
    expect(appName).toBe('Tester matching app');
  });

  it('should display github link', () => {
    const link = fixture.debugElement.query(By.css('.navbar__link'));
    expect(link.attributes.href).toContain('https://github.com/pawel-troc/applause-recruitment');
  });

  it('should display github logo inside github link', () => {
    const image = fixture.debugElement.query(By.css('.navbar__link>.navbar__logo'));
    expect(image.attributes.src).toContain('../../../assets/github.svg');
  });
});
