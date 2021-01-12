import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TesterMatchingComponent} from './components/tester-matching/tester-matching.component';

const routes: Routes = [
  { path: '', redirectTo: 'tester-matching', pathMatch: 'full' },
  { path: 'tester-matching', component: TesterMatchingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
