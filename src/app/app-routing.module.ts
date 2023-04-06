import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public-routing.module').then(m => m.PublicRoutingModule)
  },
  { path: 'login/callback', component: OktaCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
