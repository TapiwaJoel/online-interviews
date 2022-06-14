import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable, of} from 'rxjs';
import {AppState} from '../../app-store/app-state';
import * as InterviewActions from '../../interviews/interviews.actions';
import {InterviewScheduleAddComponent} from '../interview-schedule-add/interview-schedule-add.component';
import * as InterviewScheduleActions from '../interview-schedule.actions';
import {selectAllInterviewSchedules, selectInterviewScheduleLoading} from '../interview-schedule.selectors';
import {InterviewScheduleService} from '../interview-schedule.service';

@Component({
  selector: 'ngx-interview-list',
  templateUrl: './interview-schedule-list.component.html',
  styleUrls: ['./interview-schedule-list.component.scss'],
})
export class InterviewScheduleListComponent implements OnInit {

  isDetailedDefault: string = '1';
  isDetailedSelected: string = this.isDetailedDefault;
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      section: {
        title: 'Section',
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
              {value: 'PENDING', title: 'PENDING'},
              {value: 'INPROGRESS', title: 'INPROGRESS'},
              {value: 'DONE', title: 'DONE'},
              {value: 'POSTPONED', title: 'POSTPONED'},
              {value: 'DELETED', title: 'DELETED'},
              {value: 'CANCELLED', title: 'CANCELLED'},
            ],
          },
        },
      },
      interviewDate: {
        title: 'Date of Interview',
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

  source: LocalDataSource = new LocalDataSource();

  constructor(private dialogService: NbDialogService,
              private store: Store<AppState>,
              private interviewScheduleService: InterviewScheduleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(InterviewScheduleActions.loadInterviewScheduleRequest());

    this.store.dispatch(InterviewActions.loadInterviewRequest());
    this.loader$ = this.store.pipe(select(selectInterviewScheduleLoading));


    this.store.pipe(select(selectAllInterviewSchedules)).subscribe((data) => {
      data = data.map((interviewSchedule) => {
        console.log('data 0774321535 top 6315 + 10000', data);
        return {
          id: interviewSchedule.id,
          name: interviewSchedule.interview.name,
          status: interviewSchedule.status,
          section: interviewSchedule.interview.section.name,
          sectionId: interviewSchedule.interview.section.id,
          interviewDate: moment(interviewSchedule.dateOfInterview).locale('en-gb').format('LLLL'),
          created: moment(interviewSchedule.created).locale('en-gb').format('LLLL'),
        };
      });
      this.source.load(data);
    });
  }

  openAddTutorDialogue() {
    this.dialogService.open(InterviewScheduleAddComponent);
  }

  onUserRowSelect(event) {
    this.interviewScheduleService.setInterview(event.data);
    this.router.navigate(['/pages/interview-schedule/details']);
  }

}
