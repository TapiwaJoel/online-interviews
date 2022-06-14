import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JobListComponent} from './job-list/job-list.component';
import {JobComponent} from './job.component';

const routes: Routes = [{
  path: '',
  component: JobComponent,
  children: [
    {
      path: 'list',
      component: JobListComponent,
    }, {
      path: '',
      component: JobListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {
}
