import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable, of} from 'rxjs';
import {AppState} from '../../app-store/app-state';
import * as SectionActions from '../../section/section.actions';
import {JobAddComponent} from '../job-add/job-add.component';
import {JobEditComponent} from '../job-edit/job-edit.component';
import * as JobActions from '../job.actions';
import {selectAllJobs, selectJobLoading} from '../job.selectors';

@Component({
  selector: 'ngx-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {

  isDetailedDefault: string = '1';
  isDetailedSelected: string = this.isDetailedDefault;
  source: LocalDataSource = new LocalDataSource();
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

  constructor(private dialogService: NbDialogService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(JobActions.loadJobRequest());

    this.store.dispatch(SectionActions.loadSectionRequest());
    this.loader$ = this.store.pipe(select(selectJobLoading));
    this.store.pipe(select(selectAllJobs)).subscribe((data) => {
      data = data.map((section: any) => {
        return {
          id: section.id,
          name: section.name,
          section: section.section.name,
          status: section.status,
          created: moment(section.created).locale('en-gb').format('LLLL'),
        };
      });
      this.source.load(data);
    });
  }

  onUserRowSelect(event: any) {
    this.dialogService.open(JobEditComponent, {
      context: {
        job: event.data,
      },
    });
  }

  openAddTutorDialogue() {
    this.dialogService.open(JobAddComponent);
  }
}
