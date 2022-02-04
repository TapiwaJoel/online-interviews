import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbCardModule,
  NbDatepickerModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTooltipModule,
} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SectionEffects} from '../section/section.effects';
import {sectionReducer} from '../section/section.reducer';
import {InterviewAddComponent} from './interview-add/interview-add.component';
import {InterviewEditComponent} from './interview-edit/interview-edit.component';
import {InterviewListComponent} from './interview-list/interview-list.component';
import {InterviewsRoutingModule} from './interviews-routing.module';
import {InterviewsComponent} from './interviews.component';
import {InterviewEffects} from './interviews.effects';
import {interviewReducer} from './interviews.reducer';

@NgModule({
  declarations: [
    InterviewListComponent,
    InterviewEditComponent,
    InterviewsComponent,
    InterviewAddComponent,
  ],
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbActionsModule,
    NbAlertModule,
    Ng2SmartTableModule,
    NbTooltipModule,
    StoreModule.forFeature('interviews', interviewReducer),
    EffectsModule.forFeature([InterviewEffects]),
    StoreModule.forFeature('sections', sectionReducer),
    EffectsModule.forFeature([SectionEffects]),
    ReactiveFormsModule,
    NbDatepickerModule,
    NbTabsetModule,
    NbSelectModule,
  ],
})
export class InterviewsModule {
}
