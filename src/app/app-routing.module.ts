import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NbAuthComponent} from '@nebular/auth';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('app/authentication/authentication.module').then(m => m.AuthenticationModule),
      },
      {
        path: 'login',
        loadChildren: () => import('app/authentication/authentication.module').then(m => m.AuthenticationModule),
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
