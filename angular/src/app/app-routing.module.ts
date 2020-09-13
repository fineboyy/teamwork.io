import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service'

import { PageHomeComponent } from './page-home/page-home.component';
import { PageAccessComponent } from './page-access/page-access.component'


const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "access",
    component: PageAccessComponent,
    canActivate: [AuthService]
  },
  {
    path: "home",
    component: PageHomeComponent,
    canActivate: [AuthService],
    data: {loggedIn: true}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
