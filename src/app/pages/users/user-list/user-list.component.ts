import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable, of} from 'rxjs';
import {AppState} from '../../app-store/app-state';
import {UserAddComponent} from '../user-add/user-add.component';
import {UserEditComponent} from '../user-edit/user-edit.component';
import * as UserActions from '../users.actions';
import {selectAllUsers, selectUserLoading} from '../users.selectors';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  isDetailedDefault: string = '1';
  isDetailedSelected: string = this.isDetailedDefault;
  settings = {
    actions: false,
    columns: {
      fullname: {
        title: 'Full Name',
        type: 'string',
      },
      msisdn: {
        title: 'MSISDN',
        type: 'string',
      },
      email: {
        title: 'Email Address',
        type: 'string',
      },
      roles: {
        title: 'Roles',
        type: 'string',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              {value: 'ADMIN', title: 'ADMIN'},
              {value: 'PANELIST', title: 'PANELIST'},
              {value: 'INTERVIEWEE', title: 'INTERVIEWEE'},
            ],
          },
        },
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
              {value: 'DEACTIVATED', title: 'DEACTIVATED'},
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
  loader$: Observable<boolean> = of(true);

  constructor(private dialogService: NbDialogService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUserRequest());
    this.loader$ = this.store.pipe(select(selectUserLoading));
    this.store.pipe(select(selectAllUsers)).subscribe((data) => {
      this.source.load(data);
    });
  }

  openAddTutorDialogue() {
    this.dialogService.open(UserAddComponent);
  }

  onUserRowSelect(event) {
    this.dialogService.open(UserEditComponent, {
      context: {
        user: event.data,
      },
    });
  }
}
