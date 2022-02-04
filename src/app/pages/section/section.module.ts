import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbCardModule,
  NbDatepickerModule,
  NbSpinnerModule,
  NbTooltipModule,
} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SectionAddComponent} from './section-add/section-add.component';
import {SectionEditComponent} from './section-edit/section-edit.component';
import {SectionListComponent} from './section-list/section-list.component';

import {SectionRoutingModule} from './section-routing.module';
import {SectionComponent} from './section.component';
import {SectionEffects} from './section.effects';
import {sectionReducer} from './section.reducer';

@NgModule({
  declarations: [
    SectionComponent,
    SectionListComponent,
    SectionAddComponent,
    SectionEditComponent,
  ],
  entryComponents: [SectionAddComponent],
  imports: [
    CommonModule,
    SectionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbDatepickerModule,
    NbSpinnerModule,
    NbActionsModule,
    StoreModule.forFeature('sections', sectionReducer),
    EffectsModule.forFeature([SectionEffects]),
    NbAlertModule,
    Ng2SmartTableModule,
    NbTooltipModule,
  ],
})
export class SectionModule {
}
