import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {AppState} from '../../app-store/app-state';
import {selectAllJobs} from '../../job/job.selectors';
import {Section} from '../../section/section.entity';
import {selectAllSections} from '../../section/section.selectors';
import * as QuestionActions from '../questions.actions';

@Component({
  selector: 'ngx-questions-add',
  templateUrl: './questions-add.component.html',
  styleUrls: ['./questions-add.component.scss'],
})
export class QuestionsAddComponent implements OnInit {
  addQuestionForm: FormGroup;
  sections: Partial<Section>[] = [];
  weights = [1, 2, 3, 4, 5];
  jobs = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.addQuestionForm = new FormGroup({
      question: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      sectionId: new FormControl('', Validators.required),
      jobId: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAllSections)).subscribe((sections) => {
      this.sections = sections;
    });

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

      this.jobs = data;
    });

  }

  onSubmit() {
    this.store.dispatch(QuestionActions.createRequest({question: this.addQuestionForm.value}));
  }
}
