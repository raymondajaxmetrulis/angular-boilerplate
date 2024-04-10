import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { I18NEXT_NAMESPACE_RESOLVER } from 'angular-i18next';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public-routing.module').then(m => m.PublicRoutingModule),
    resolve: {
      i18next: I18NEXT_NAMESPACE_RESOLVER
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
