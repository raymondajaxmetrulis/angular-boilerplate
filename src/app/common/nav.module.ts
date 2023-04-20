import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './components/nav/nav.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    RouterModule,
    I18NextModule
  ],
  exports: [
    FooterComponent,
    NavComponent
  ],
  declarations: [
    FooterComponent,
    NavComponent
  ],
  providers: [
    {
      provide: I18NEXT_NAMESPACE,
      useValue: ['translation', 'error']
    }
  ]
})
export class NavModule {}
