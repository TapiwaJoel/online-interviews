import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NbActionsModule, NbCardModule, NbSpinnerModule, NbTooltipModule} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SectionEffects} from '../section/section.effects';
import {sectionReducer} from '../section/section.reducer';
import {JobAddComponent} from './job-add/job-add.component';
import {JobEditComponent} from './job-edit/job-edit.component';
import {JobListComponent} from './job-list/job-list.component';
import {JobRoutingModule} from './job-routing.module';
import {JobComponent} from './job.component';
import {JobEffects} from './job.effects';
import {jobReducer} from './job.reducer';


@NgModule({
  declarations: [
    JobAddComponent,
    JobEditComponent,
    JobListComponent,
    JobComponent,
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    NbCardModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbActionsModule,
    StoreModule.forFeature('jobs', jobReducer),
    EffectsModule.forFeature([JobEffects]),
    StoreModule.forFeature('sections', sectionReducer),
    EffectsModule.forFeature([SectionEffects]),
    Ng2SmartTableModule,
    NbTooltipModule,
  ],
})
export class JobModule {
}
