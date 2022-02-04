import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import * as UserActions from '../users.actions';
import {User} from '../users.entity';

@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() user: Partial<User>;
  addUserForm: FormGroup;
  roles = [
    {key: 'ADMIN', val: 'ADMIN'},
    {key: 'INTERVIEWEE', val: 'INTERVIEWEE'},
    {key: 'PANELIST', val: 'PANELIST'},
  ];

  statuses = [
    {key: 'ACTIVE', val: 'ACTIVE'},
    {key: 'INACTIVE', val: 'INACTIVE'},
    {key: 'DELETED', val: 'DELETED'},
  ];


  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      msisdn: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      roles: new FormControl('', Validators.required),
    });


    this.addUserForm.setValue({
      fullname: this.user.fullname,
      email: this.user.email,
      msisdn: this.user.msisdn,
      roles: this.user.roles,
      status: this.user.status,
    });
  }

  onSubmit() {
    const user = {...this.user, ...this.addUserForm.value};
    delete user.created;
    this.store.dispatch(UserActions.editRequest({user}));
  }
}
