import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InterviewListComponent} from './interview-list/interview-list.component';
import {InterviewsComponent} from './interviews.component';

const routes: Routes = [{
  path: '',
  component: InterviewsComponent,
  children: [
    {
      path: 'list',
      component: InterviewListComponent,
    }, {
      path: '',
      component: InterviewListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewsRoutingModule {
}
