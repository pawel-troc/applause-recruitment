import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TesterMatchingComponent} from './components/tester-matching/tester-matching.component';

const routes: Routes = [
  { path: 'tester-matching', component: TesterMatchingComponent },
  { path: '', redirectTo: '/tester-matching', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
