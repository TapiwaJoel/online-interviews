import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SectionListComponent} from './section-list/section-list.component';
import {SectionComponent} from './section.component';

const routes: Routes = [{
  path: '',
  component: SectionComponent,
  children: [
    {
      path: 'list',
      component: SectionListComponent,
    }, {
      path: '',
      component: SectionListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionRoutingModule {
}
