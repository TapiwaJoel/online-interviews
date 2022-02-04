import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import * as UserActions from '../users.actions';
import {selectUserLoading} from '../users.selectors';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  addUserForm: FormGroup;
  statuses = [
    {key: 'ADMIN', val: 'ADMIN'},
    {key: 'INTERVIEWEE', val: 'INTERVIEWEE'},
    {key: 'PANELIST', val: 'PANELIST'},
  ];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.addUserForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      msisdn: new FormControl('', Validators.required),
      roles: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const user = {...this.addUserForm.value, status: 'ACTIVE'};
    this.store.dispatch(UserActions.createRequest({user}));

    this.store.pipe(select(selectUserLoading)).subscribe((isLoading) => {
      console.log('isloading', isLoading);
    });
  }
}
