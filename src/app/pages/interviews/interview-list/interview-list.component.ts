import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {LocalDataSource} from 'ng2-smart-table';
import {AppState} from '../../app-store/app-state';
import * as SectionActions from '../../section/section.actions';
import {InterviewAddComponent} from '../interview-add/interview-add.component';
import {InterviewEditComponent} from '../interview-edit/interview-edit.component';
import * as InterviewActions from '../interviews.actions';
import {selectAllInterviews} from '../interviews.selectors';

@Component({
  selector: 'ngx-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss'],
})
export class InterviewListComponent implements OnInit {

  isDetailedDefault: string = '1';
  isDetailedSelected: string = this.isDetailedDefault;
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Title',
        type: 'string',
      },
      sectionId: {
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

  source: LocalDataSource = new LocalDataSource();

  constructor(private dialogService: NbDialogService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(SectionActions.loadSectionRequest());
    this.store.dispatch(InterviewActions.loadInterviewRequest());

    this.store.pipe(select(selectAllInterviews)).subscribe((data) => {
      data = data.map((interview) => {
        return {
          id: interview.id,
          name: interview.name,
          status: interview.status,
          section: interview.section,
          sectionId: interview.section.name,
          created: moment(interview.created).locale('en-gb').format('LLLL'),
        };
      });
      this.source.load(data);
    });
  }

  openAddTutorDialogue() {
    this.dialogService.open(InterviewAddComponent);
  }

  onUserRowSelect(event) {
    this.dialogService.open(InterviewEditComponent, {
      context: {
        interview: event.data,
      },
    });
  }
}
