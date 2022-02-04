import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InterviewScheduleDetailsComponent} from './interview-schedule-details/interview-schedule-details.component';
import {InterviewScheduleListComponent} from './interview-schedule-list/interview-schedule-list.component';
import {InterviewScheduleStartComponent} from './interview-schedule-start/interview-schedule-start.component';
import {InterviewScheduleComponent} from './interview-schedule.component';

const routes: Routes = [{
  path: '',
  component: InterviewScheduleComponent,
  children: [
    {
      path: 'list',
      component: InterviewScheduleListComponent,
    },
    {
      path: 'details',
      component: InterviewScheduleDetailsComponent,
    },
    {
      path: 'start',
      component: InterviewScheduleStartComponent,
    },
    {
      path: '',
      component: InterviewScheduleListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewScheduleRoutingModule {
}
