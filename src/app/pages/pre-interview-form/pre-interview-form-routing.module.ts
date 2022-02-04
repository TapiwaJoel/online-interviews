import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionsListComponent} from '../questions/questions-list/questions-list.component';
import {QuestionsComponent} from '../questions/questions.component';
import {PreInterviewAddComponent} from './pre-interview-add/pre-interview-add.component';
import {PreInterviewFormComponent} from './pre-interview-form.component';

const routes: Routes = [{
  path: '',
  component: PreInterviewFormComponent,
  children: [
   {
      path: '',
      component: PreInterviewAddComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreInterviewFormRoutingModule { }
