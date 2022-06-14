import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NbCardModule, NbCheckboxModule} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {JobEffects} from '../job/job.effects';
import {jobReducer} from '../job/job.reducer';
import {PreInterviewAddComponent} from './pre-interview-add/pre-interview-add.component';

import {PreInterviewFormRoutingModule} from './pre-interview-form-routing.module';
import {PreInterviewFormComponent} from './pre-interview-form.component';


@NgModule({
  declarations: [
    PreInterviewAddComponent,
    PreInterviewFormComponent,
  ],
    imports: [
      CommonModule,
      PreInterviewFormRoutingModule,
      NbCardModule,

      NbCheckboxModule,
      ReactiveFormsModule,
    ],
})
export class PreInterviewFormModule {
}
