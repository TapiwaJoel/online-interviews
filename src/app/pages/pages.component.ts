import {Component} from '@angular/core';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {

    const auth = localStorage.getItem('auth');
    if (!auth) {
      this.router.navigate(['/']);
      return;
    }

    const user = JSON.parse(auth);
    if (user.user.roles === 'ADMIN' || user.user.roles === 'PANELIST') {
      this.menu = MENU_ITEMS;
    }
    if (user.user.roles === 'INTERVIEWEE') {
      this.menu = INTERVIEWEE_MENU_ITEMS;
    }
  }
}
