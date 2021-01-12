import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TesterMatchingComponent} from './components/tester-matching/tester-matching.component';
import { TesterMatchingSearchComponent } from './components/tester-matching-search/tester-matching-search.component';
import { TesterMatchingResultComponent } from './components/tester-matching-result/tester-matching-result.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    TesterMatchingComponent,
    TesterMatchingSearchComponent,
    TesterMatchingResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
