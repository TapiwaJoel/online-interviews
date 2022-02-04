import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import * as TimeSlotActions from '../time-slot.actions';
import {TimeSlot} from '../time-slot.entity';
import {selectTimeSlotLoading} from '../time-slot.selectors';

@Component({
  selector: 'ngx-time-slot-edit',
  templateUrl: './time-slot-edit.component.html',
  styleUrls: ['./time-slot-edit.component.scss'],
})
export class TimeSlotEditComponent implements OnInit {
  @Input() timeSlot: Partial<TimeSlot>;
  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  addTimeSlotForm: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.addTimeSlotForm = new FormGroup({
      startHour: new FormControl('', Validators.required),
      startMin: new FormControl('', Validators.required),
      endMin: new FormControl('', Validators.required),
      endHour: new FormControl('', Validators.required),
    });

    this.addTimeSlotForm.setValue({
      startHour: this.timeSlot.startTime.split(':')[0],
      startMin: this.timeSlot.startTime.split(':')[1],
      endHour: this.timeSlot.endTime.split(':')[0],
      endMin: this.timeSlot.endTime.split(':')[1],
    });
  }

  onSubmit() {
    const timeSlot: Partial<TimeSlot> = {
      id: this.timeSlot.id,
      startTime: this.addTimeSlotForm.value.startHour + ':' + this.addTimeSlotForm.value.startMin,
      endTime: this.addTimeSlotForm.value.endHour + ':' + this.addTimeSlotForm.value.endMin,
    };
    this.store.dispatch(TimeSlotActions.editRequest({timeSlot}));

    this.store.pipe(select(selectTimeSlotLoading)).subscribe((isLoading) => {
      console.log('isloading', isLoading);
    });
  }

}
