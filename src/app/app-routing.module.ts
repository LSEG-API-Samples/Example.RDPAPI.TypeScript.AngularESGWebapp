import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsgComponent } from './esg/esg.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'esg', pathMatch: 'full' },
  { path: 'esg', canActivate: [ AuthGuard ], component: EsgComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
