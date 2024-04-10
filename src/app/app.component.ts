import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  repoTitle: string;
  ready: boolean = true;

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle(environment.appTitle);
    this.meta.addTags([
      { name: 'keywords', content: '' },
      { name: 'robots', content: 'index, follow' },
      { name: 'writer', content: '' },
      { charset: 'UTF-8' }
    ]);
  }
}
