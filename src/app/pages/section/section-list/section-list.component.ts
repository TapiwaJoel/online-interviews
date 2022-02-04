import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable, of} from 'rxjs';
import {AppState} from '../../app-store/app-state';
import {SectionAddComponent} from '../section-add/section-add.component';
import {SectionEditComponent} from '../section-edit/section-edit.component';
import * as SectionActions from '../section.actions';
import {selectAllSections, selectSectionLoading} from '../section.selectors';

@Component({
  selector: 'ngx-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss'],
})
export class SectionListComponent implements OnInit {
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


  constructor(private dialogService: NbDialogService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(SectionActions.loadSectionRequest());
    this.loader$ = this.store.pipe(select(selectSectionLoading));
    this.store.pipe(select(selectAllSections)).subscribe((data) => {
      data = data.map((section) => {
        return {
          id: section.id,
          name: section.name,
          status: section.status,
          created: moment(section.created).locale('en-gb').format('LLLL'),
        };
      });
      this.source.load(data);
    });
  }

  onUserRowSelect(event: any) {
    this.dialogService.open(SectionEditComponent, {
      context: {
        section: event.data,
      },
    });
  }

  openAddTutorDialogue() {
    this.dialogService.open(SectionAddComponent);
  }
}
