import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable, of} from 'rxjs';
import {AppState} from '../../app-store/app-state';
import {TimeSlotAddComponent} from '../time-slot-add/time-slot-add.component';
import {TimeSlotEditComponent} from '../time-slot-edit/time-slot-edit.component';
import * as TimeSlotActions from '../time-slot.actions';
import {selectAllTimeSlots, selectTimeSlotLoading} from '../time-slot.selectors';

@Component({
  selector: 'ngx-time-slot-list',
  templateUrl: './time-slot-list.component.html',
  styleUrls: ['./time-slot-list.component.scss'],
})
export class TimeSlotListComponent implements OnInit {
  isDetailedDefault: string = '1';
  isDetailedSelected: string = this.isDetailedDefault;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      startTime: {
        title: 'Start Time',
        type: 'string',
      },
      endTime: {
        title: 'End Time',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              {value: 'ACTIVE', title: 'ACTIVE'},
              {value: 'INACTIVE', title: 'INACTIVE'},
              {value: 'DELETED', title: 'DELETED'},
            ],
          },
        },
      },
      created: {
        title: 'Date',
        type: 'date',
        filter: {
          type: 'datepicker',
          config: {
            datepicker: {
              selectMode: 'range',
              placeholder: 'Pick date...',
            },
          },
        },
        editor: {
          type: 'datepicker',
        },
      },
    },
  };
  loader$: Observable<boolean> = of(true);

  constructor(private store: Store<AppState>,
              private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.store.dispatch(TimeSlotActions.loadTimeSlotRequest());
    this.loader$ = this.store.pipe(select(selectTimeSlotLoading));
    this.store.pipe(select(selectAllTimeSlots)).subscribe((data) => {
      this.source.load(data);
    });
  }

  openAddTutorDialogue() {
    this.dialogService.open(TimeSlotAddComponent);
  }

  onUserRowSelect(event: any) {
    this.dialogService.open(TimeSlotEditComponent, {
      context: {
        timeSlot: event.data,
      },
    });
  }
}
