import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbStepperModule} from '@nebular/theme';
import {JobApplicationFormAddComponent} from './job-application-form-add/job-application-form-add.component';

import {JobApplicationFormRoutingModule} from './job-application-form-routing.module';
import {JobApplicationFormComponent} from './job-application-form.component';


@NgModule({
  declarations: [
    JobApplicationFormAddComponent,
    JobApplicationFormComponent,
  ],
  imports: [
    CommonModule,
    JobApplicationFormRoutingModule,
    NbCardModule,
    NbStepperModule,
    NbButtonModule,
    NbDatepickerModule,
    NbCheckboxModule,
  ],
})
export class JobApplicationFormModule {
}
