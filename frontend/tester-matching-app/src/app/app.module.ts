import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TesterMatchingComponent} from './components/tester-matching/tester-matching.component';
import {TesterMatchingSearchComponent} from './components/tester-matching-search/tester-matching-search.component';
import {TesterMatchingResultListComponent} from './components/tester-matching-result-list/tester-matching-result-list.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {TesterMatchingResultItemComponent} from './components/tester-matching-result-item/tester-matching-result-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TesterMatchingComponent,
    TesterMatchingSearchComponent,
    TesterMatchingResultListComponent,
    NavBarComponent,
    TesterMatchingResultItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
