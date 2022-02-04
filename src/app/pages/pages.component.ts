import {Component} from '@angular/core';

import {INTERVIEWEE_MENU_ITEMS, MENU_ITEMS} from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu;

  constructor() {
    const user = JSON.parse(localStorage.getItem('auth'));
    if (user.user.roles === 'ADMIN') {
      this.menu = MENU_ITEMS;
    }
    if (user.user.roles === 'INTERVIEWEE') {
      this.menu = INTERVIEWEE_MENU_ITEMS;
    }
  }
}
