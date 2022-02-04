import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NbActionsModule, NbCardModule, NbSpinnerModule, NbTooltipModule} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {TimeSlotAddComponent} from './time-slot-add/time-slot-add.component';
import {TimeSlotEditComponent} from './time-slot-edit/time-slot-edit.component';
import {TimeSlotListComponent} from './time-slot-list/time-slot-list.component';
import {TimeSlotRoutingModule} from './time-slot-routing.module';
import {TimeSlotComponent} from './time-slot.component';
import {TimeSlotEffects} from './time-slot.effects';
import {timeSlotReducer} from './time-slot.reducer';


@NgModule({
  declarations: [
    TimeSlotAddComponent,
    TimeSlotComponent,
    TimeSlotEditComponent,
    TimeSlotListComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('timeSlots', timeSlotReducer),
    EffectsModule.forFeature([TimeSlotEffects]),
    TimeSlotRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbActionsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NbTooltipModule,
  ],
})
export class TimeSlotModule {
}
