import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimeSlotListComponent} from './time-slot-list/time-slot-list.component';
import {TimeSlotComponent} from './time-slot.component';

const routes: Routes = [{
  path: '',
  component: TimeSlotComponent,
  children: [
    {
      path: 'list',
      component: TimeSlotListComponent,
    }, {
      path: '',
      component: TimeSlotListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeSlotRoutingModule {
}
