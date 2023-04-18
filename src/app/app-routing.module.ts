import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OktaCallbackComponent } from '@okta/okta-angular';
import { I18NEXT_NAMESPACE_RESOLVER } from 'angular-i18next';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public-routing.module').then(m => m.PublicRoutingModule),
    resolve: {
      i18next: I18NEXT_NAMESPACE_RESOLVER
    }
  },
  { path: 'login/callback', component: OktaCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
