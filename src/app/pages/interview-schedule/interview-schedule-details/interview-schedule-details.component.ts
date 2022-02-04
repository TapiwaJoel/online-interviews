import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable, of} from 'rxjs';
import {AppState} from '../../app-store/app-state';
import {Interview} from '../../interviews/interviews.entity';
import * as TimeSlotActions from '../../time-slot/time-slot.actions';
import * as UserActions from '../../users/users.actions';
import {selectUserLoading} from '../../users/users.selectors';
import * as InterviewScheduleActions from '../interview-schedule.actions';
import {InterviewScheduleService} from '../interview-schedule.service';
import {ReferenceCheckListComponent} from '../reference-check-list/reference-check-list.component';
import {ScoreCardComponent} from '../score-card/score-card.component';

@Component({
  selector: 'ngx-interview-schedule-details',
  templateUrl: './interview-schedule-details.component.html',
  styleUrls: ['./interview-schedule-details.component.scss'],
})
export class InterviewScheduleDetailsComponent implements OnInit {
  isDetailedDefault: string = '1';
  isDetailedSelected: string = this.isDetailedDefault;
  settings = {
    actions: false,
    columns: {
      fullname: {
        title: 'Full Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      msisdn: {
        title: 'Phone Number',
        type: 'string',
      },
      timeSlot: {
        title: 'Time Slot',
        type: 'string',
      },
      test: {
        title: 'Reference Check',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a
                    class="btn btn-outline-success btn-icon btn-semi-round btn-demo"
                    id="button"
                    (click)="onSubmit()"
                    type="button">
                  View Ref Check
            </a>`;
        },
      },
      status: {
        title: 'Invitation Status',
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
    },
  };
  questionSettings = {
    actions: false,
    columns: {
      question: {
        title: 'Question',
        type: 'string',
      },
      weight: {
        title: 'Weight',
        type: 'string',
      },
    },
  };
  sourcePanelist: LocalDataSource = new LocalDataSource();
  sourceInterviewee: LocalDataSource = new LocalDataSource();
  sourceQuestions: LocalDataSource = new LocalDataSource();
  loader$: Observable<boolean> = of(true);
  interview: Partial<Interview>;
  interviewStatuses = [
    'PENDING', 'DONE', 'POSTPONED', 'DELETED', 'ACTIVE', 'CANCELLED',
  ];
  panelists = [];
  interviewees = [];
  addType = '';

  constructor(private dialogService: NbDialogService,
              private router: Router,
              private interviewScheduleService: InterviewScheduleService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.interview = this.interviewScheduleService.getInterview();
    this.interviewScheduleService.candidates = [];

    this.store.dispatch(InterviewScheduleActions.loadInterviewSchedulePanelistsRequest({
      id: this.interview?.id,
      role: 'PANELIST',
    }));

    this.store.dispatch(InterviewScheduleActions.loadInterviewSchedulePanelistsRequest({
      id: this.interview?.id,
      role: 'INTERVIEWEE',
    }));

    if (!this.interview) {
      this.router.navigate(['/pages/interview-schedule']);
      return;
    }

    // return `<a title="Add Reference Check ${row.id}"
    // href="Your api key or something/${row.Id}"> <i class="ion-document"></i></a>`;

    this.store.dispatch(UserActions.loadUserRequest());

    this.store.dispatch(TimeSlotActions.loadTimeSlotRequest());

    this.loader$ = this.store.pipe(select(selectUserLoading));

    this.interviewScheduleService.loadScheduledInterviewQuestions(this.interview?.id).subscribe((data: any) => {
      data = data.result.map(d => {
        return {
          id: d.question.id,
          question: d.question.question,
          weight: d.question.weight,
        };
      });
      this.sourceQuestions.load(data);
    });

    this.interviewScheduleService.interviewScheduleInterviewId.subscribe((id: any) => {
      console.log('Interview', id);
      console.log('id.panelists', id.panelists);

      if (id['panelists'] === undefined && Object.keys(id).length) {
        const panel = {
          id: id.user.id,
          fullname: id.user.fullname,
          email: id.user.email,
          role: id.user.roles,
          msisdn: id.user.msisdn,
          timeSlot: id.timeslot.startTime + ' - ' + id.timeslot.endTime,
          status: id.status,
        };

        if (panel.role === 'PANELIST') {
          this.panelists.push(panel);
        } else {
          this.interviewees.push(panel);
        }
      } else {
        if (Object.keys(id).length) {
          for (const panelist of id.panelists) {
            const onePanelist = {
              id: panelist.user.id,
              fullname: panelist.user.fullname,
              email: panelist.user.email,
              role: panelist.user.roles,
              msisdn: panelist.user.msisdn,
              timeSlot: panelist.timeslot.startTime + ' - ' + panelist.timeslot.endTime,
              status: panelist.status,
            };

            if (onePanelist.role === 'PANELIST') {
              this.panelists.push(onePanelist);
            } else {
              this.interviewees.push(onePanelist);
            }
          }
        }
      }
      this.sourcePanelist.load(this.panelists);
      this.sourceInterviewee.load(this.interviewees);
      this.interviewScheduleService.candidates = this.interviewees;
    });
  }

  openAddTutorDialogue() {
  }

  onUserRowSelect($event: any) {
  }

  test($any) {
    console.log('test', $any);
  }

  changeAdd(user: string) {
    this.addType = user;
  }

  startInterview() {
    this.router.navigate(['/pages/interview-schedule/start']);
  }

  onCantRowSelect($event: any) {
    this.dialogService.open(ReferenceCheckListComponent, {
      context: {
        candidate: $event.data,
      },
    });
  }

  openScoreCard() {
    this.dialogService.open(ScoreCardComponent, {
      context: {
        interview: this.interview,
      },
    });
  }
}
