import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {Section} from '../../section/section.entity';
import {selectAllSections} from '../../section/section.selectors';
import * as InterviewActions from '../interviews.actions';

@Component({
  selector: 'ngx-interview-add',
  templateUrl: './interview-add.component.html',
  styleUrls: ['./interview-add.component.scss'],
})
export class InterviewAddComponent implements OnInit {
  addInterviewForm: FormGroup;
  sections: Partial<Section>[] = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.addInterviewForm = new FormGroup({
      name: new FormControl('', Validators.required),
      sectionId: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAllSections)).subscribe((sections) => {
      this.sections = sections;
    });
  }

  onSubmit() {
    this.store.dispatch(InterviewActions.createRequest({interview: this.addInterviewForm.value}));
  }
}
