import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {Section} from '../../section/section.entity';
import {selectAllSections} from '../../section/section.selectors';
import * as QuestionActions from '../questions.actions';
import {Question} from '../questions.entity';

@Component({
  selector: 'ngx-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.scss'],
})
export class QuestionsEditComponent implements OnInit {
  @Input() question: Partial<Question>;
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

    console.log('question', this.question);

    this.addQuestionForm.setValue({
      question: this.question.question,
      sectionId: this.question.section.id,
      weight: this.question.weight,
    });
  }

  onSubmit() {

    const question = {...this.question, ...this.addQuestionForm.value};
    delete question.created;
    delete question.section;
    this.store.dispatch(QuestionActions.editRequest({question}));
    // this.store.dispatch(QuestionActions.createRequest({question: this.addQuestionForm.value}));
  }
}
