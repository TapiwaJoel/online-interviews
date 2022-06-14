import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {AppState} from '../../app-store/app-state';
import * as JobActions from '../../job/job.actions';
import {selectAllSections, selectSectionLoading} from '../../section/section.selectors';
import {Job} from '../job.entity';

@Component({
  selector: 'ngx-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss'],
})
export class JobEditComponent implements OnInit {
  @Input() job: Partial<Job>;

  statuses = [
    {key: 'ACTIVE', val: 'ACTIVE'},
    {key: 'INACTIVE', val: 'INACTIVE'},
    {key: 'DELETED', val: 'DELETED'},
  ];
  addSectionForm: FormGroup;
  sections = [];

  constructor(private store: Store<AppState>,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.addSectionForm = new FormGroup({
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

    this.addSectionForm.setValue({
      name: this.job.name,
      status: this.job.status,
    });
    this.cdr.detectChanges();
  }

  onSubmit() {

    const job = {...this.job, ...this.addSectionForm.value};
    delete job.created;
    this.store.dispatch(JobActions.editRequest({job}));

    this.store.pipe(select(selectSectionLoading)).subscribe((isLoading) => {
      console.log('isloading', isLoading);
    });
  }
}
