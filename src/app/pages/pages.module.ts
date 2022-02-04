import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
