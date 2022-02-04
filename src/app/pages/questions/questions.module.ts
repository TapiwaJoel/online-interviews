import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NbActionsModule, NbCardModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SectionEffects} from '../section/section.effects';
import {sectionReducer} from '../section/section.reducer';
import {QuestionsAddComponent} from './questions-add/questions-add.component';
import {QuestionsEditComponent} from './questions-edit/questions-edit.component';
import {QuestionsListComponent} from './questions-list/questions-list.component';

import {QuestionsRoutingModule} from './questions-routing.module';
import {QuestionsComponent} from './questions.component';
import {QuestionEffects} from './questions.effects';
import {questionReducer} from './questions.reducer';

@NgModule({
  declarations: [
    QuestionsAddComponent,
    QuestionsEditComponent,
    QuestionsListComponent,
    QuestionsComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    NbCardModule,
    StoreModule.forFeature('questions', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
    StoreModule.forFeature('sections', sectionReducer),
    EffectsModule.forFeature([SectionEffects]),
    NbSpinnerModule,
    NbActionsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NbInputModule,
  ],
})
export class QuestionsModule {
}
