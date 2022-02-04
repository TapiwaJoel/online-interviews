import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PreInterviewAddComponent} from '../pre-interview-form/pre-interview-add/pre-interview-add.component';
import {PreInterviewFormComponent} from '../pre-interview-form/pre-interview-form.component';
import {JobApplicationFormAddComponent} from './job-application-form-add/job-application-form-add.component';
import {JobApplicationFormComponent} from './job-application-form.component';

const routes: Routes = [{
  path: '',
  component: JobApplicationFormComponent,
  children: [
    {
      path: '',
      component: JobApplicationFormAddComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobApplicationFormRoutingModule { }
