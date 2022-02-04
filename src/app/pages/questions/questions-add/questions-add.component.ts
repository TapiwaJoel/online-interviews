import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
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

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.addQuestionForm = new FormGroup({
      question: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      sectionId: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAllSections)).subscribe((sections) => {
      this.sections = sections;
    });
  }

  onSubmit() {
    this.store.dispatch(QuestionActions.createRequest({question: this.addQuestionForm.value}));
  }
}
