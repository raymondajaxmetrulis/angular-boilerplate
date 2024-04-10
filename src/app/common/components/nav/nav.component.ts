import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { InitOptions } from 'i18next';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  isCollapsed: boolean = true;

  language: string = 'en';
  languages: string[] = ['en', 'es', 'fr'];

  constructor(
    public router: Router,
    @Inject(I18NEXT_SERVICE) private i18NSvc: ITranslationService
  ) {
  }

  ngOnInit(): void {
    this.i18NSvc.events.initialized.subscribe((options: InitOptions<object>) => {
      if (options) {
        this.updateState(this.i18NSvc.language);
      }
    });
  }

  changeLanguage(event: Event): void {
    const lang = (event.target as HTMLInputElement).value;
    this.i18NSvc.changeLanguage(lang).then(() => {
      this.updateState(lang);
    });
  }

  private updateState(lang: string): void {
    this.language = lang;
  }
}
