import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTooltipModule,
} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {InterviewEffects} from '../interviews/interviews.effects';
import {interviewReducer} from '../interviews/interviews.reducer';
import {QuestionEffects} from '../questions/questions.effects';
import {questionReducer} from '../questions/questions.reducer';
import {TimeSlotEffects} from '../time-slot/time-slot.effects';
import {timeSlotReducer} from '../time-slot/time-slot.reducer';
import {UserEffects} from '../users/users.effects';
import {userReducer} from '../users/users.reducer';
import {InterviewScheduleAddComponent} from './interview-schedule-add/interview-schedule-add.component';
import {InterviewScheduleDetailsComponent} from './interview-schedule-details/interview-schedule-details.component';
import {InterviewScheduleEditComponent} from './interview-schedule-edit/interview-schedule-edit.component';
import {InterviewScheduleInvitationComponent} from './interview-schedule-invitation/interview-schedule-invitation.component';
import {InterviewScheduleListComponent} from './interview-schedule-list/interview-schedule-list.component';
import {InterviewScheduleRoutingModule} from './interview-schedule-routing.module';
import {InterviewScheduleStartComponent} from './interview-schedule-start/interview-schedule-start.component';
import {InterviewScheduleComponent} from './interview-schedule.component';
import {InterviewScheduleEffects} from './interview-schedule.effects';
import {interviewScheduleReducer} from './interview-schedule.reducer';
import {ReferenceCheckAddComponent} from './reference-check-add/reference-check-add.component';
import {ReferenceCheckListComponent} from './reference-check-list/reference-check-list.component';
import { ScoreCardComponent } from './score-card/score-card.component';

@NgModule({
  declarations: [
    InterviewScheduleComponent,
    InterviewScheduleAddComponent,
    InterviewScheduleListComponent,
    InterviewScheduleEditComponent,
    InterviewScheduleDetailsComponent,
    InterviewScheduleInvitationComponent,
    InterviewScheduleStartComponent,
    ReferenceCheckListComponent,
    ReferenceCheckAddComponent,
    ScoreCardComponent,
  ],
  imports: [
    CommonModule,
    InterviewScheduleRoutingModule,
    NbDatepickerModule,
    NbCardModule,
    ReactiveFormsModule,
    NbActionsModule,
    NbAlertModule,
    NbTooltipModule,
    StoreModule.forFeature('interviews', interviewReducer),
    EffectsModule.forFeature([InterviewEffects]),
    StoreModule.forFeature('interviewSchedules', interviewScheduleReducer),
    EffectsModule.forFeature([InterviewScheduleEffects]),
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature('timeSlots', timeSlotReducer),
    EffectsModule.forFeature([TimeSlotEffects]),
    StoreModule.forFeature('questions', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbSelectModule,
    NbTabsetModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
  ],
})
export class InterviewScheduleModule {
}
