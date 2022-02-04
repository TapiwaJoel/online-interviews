import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {Section} from '../../section/section.entity';
import {selectAllSections} from '../../section/section.selectors';
import * as InterviewActions from '../interviews.actions';
import {Interview} from '../interviews.entity';

@Component({
  selector: 'ngx-interview-add',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.scss'],
})
export class InterviewEditComponent implements OnInit {

  @Input() interview: Partial<Interview>;
  addInterviewForm: FormGroup;
  sections: Partial<Section>[] = [];

  statuses = [
    {val: 'PENDING', key: 'PENDING'},
    {val: 'INPROGRESS', key: 'INPROGRESS'},
    {val: 'DONE', key: 'DONE'},
    {val: 'POSTPONED', key: 'POSTPONED'},
    {val: 'DELETED', key: 'DELETED'},
    {val: 'CANCELLED', key: 'CANCELLED'},
  ];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('interview', this.interview);
    this.addInterviewForm = new FormGroup({
      name: new FormControl('', Validators.required),
      sectionId: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAllSections)).subscribe((sections) => {
      this.sections = sections;
    });

    this.addInterviewForm.setValue({
      name: this.interview.name,
      sectionId: this.interview.section.id,
      status: this.interview.status,
    });
  }

  onSubmit() {
    const interview = {...this.interview, ...this.addInterviewForm.value};
    delete interview.created;
    this.store.dispatch(InterviewActions.editRequest({interview}));
  }
}
