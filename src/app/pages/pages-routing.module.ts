import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {AuthGuard} from './utils/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'interviews',
      canActivate: [AuthGuard],
      loadChildren: () => import('./interviews/interviews.module')
        .then(m => m.InterviewsModule),
    },
    {
      path: 'interview-schedule',
      loadChildren: () => import('./interview-schedule/interview-schedule.module')
        .then(m => m.InterviewScheduleModule),
    },
    {
      path: 'sections',
      loadChildren: () => import('./section/section.module')
        .then(m => m.SectionModule),
    },
    {
      path: 'time-slots',
      loadChildren: () => import('./time-slot/time-slot.module')
        .then(m => m.TimeSlotModule),
    },
    {
      path: 'questions',
      loadChildren: () => import('./questions/questions.module')
        .then(m => m.QuestionsModule),
    },
    {
      path: 'pre-interview-form',
      loadChildren: () => import('./pre-interview-form/pre-interview-form.module')
        .then(m => m.PreInterviewFormModule),
    },
    {
      path: 'job-application-form',
      loadChildren: () => import('./job-application-form/job-application-form.module')
        .then(m => m.JobApplicationFormModule),
    },
    {
      path: 'jobs',
      loadChildren: () => import('./job/job.module')
        .then(m => m.JobModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
