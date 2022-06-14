import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {AppState} from '../../app-store/app-state';
import * as SectionActions from '../../section/section.actions';
import {selectAllSections} from '../../section/section.selectors';
import * as JobActions from '../job.actions';
import {selectJobLoading} from '../job.selectors';

@Component({
  selector: 'ngx-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
})
export class JobAddComponent implements OnInit {
  addJobForm: FormGroup;
  sections = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.addJobForm = new FormGroup({
      name: new FormControl('', Validators.required),
      sectionId: new FormControl('', Validators.required),
    });


    this.store.pipe(select(selectAllSections)).subscribe((data) => {
      data = data.map((section) => {
        return {
          id: section.id,
          name: section.name,
          status: section.status,
          created: moment(section.created).locale('en-gb').format('LLLL'),
        };
      });

      this.sections = data;
      console.log('sections', data);
    });
  }

  onSubmit() {
    const job = {...this.addJobForm.value};
    this.store.dispatch(JobActions.createRequest({job}));
    this.store.pipe(select(selectJobLoading)).subscribe((isLoading) => {
      console.log('isloading', isLoading);
    });
  }
}
