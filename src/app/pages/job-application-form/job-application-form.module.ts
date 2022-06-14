import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbStepperModule} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {JobEffects} from '../job/job.effects';
import {jobReducer} from '../job/job.reducer';
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
    StoreModule.forFeature('jobs', jobReducer),
    EffectsModule.forFeature([JobEffects]),
    NbButtonModule,
    NbDatepickerModule,
    NbCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class JobApplicationFormModule {
}
