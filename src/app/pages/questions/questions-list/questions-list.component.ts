import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable, of} from 'rxjs';
import {AppState} from '../../app-store/app-state';
import * as SectionActions from '../../section/section.actions';
import {QuestionsAddComponent} from '../questions-add/questions-add.component';
import {QuestionsEditComponent} from '../questions-edit/questions-edit.component';
import * as QuestionActions from '../questions.actions';
import {selectAllQuestions, selectQuestionLoading} from '../questions.selectors';

@Component({
  selector: 'ngx-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent implements OnInit {
  isDetailedDefault: string = '1';
  isDetailedSelected: string = this.isDetailedDefault;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      sectionId: {
        title: 'Section',
        type: 'string',
      },
      question: {
        title: 'Question Body',
        type: 'string',
      },
      weight: {
        title: 'Weight',
        type: 'string',
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
              {value: 'INACTIVE', title: 'INACTIVE'},
              {value: 'DELETED', title: 'DELETED'},
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
  loader$: Observable<boolean> = of(true);

  constructor(private store: Store<AppState>,
              private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.store.dispatch(QuestionActions.loadQuestionRequest());
    this.store.dispatch(SectionActions.loadSectionRequest());

    this.loader$ = this.store.pipe(select(selectQuestionLoading));
    this.store.pipe(select(selectAllQuestions)).subscribe((data) => {
      data = data.map((interview) => {
        return {
          id: interview.id,
          question: interview.question,
          section: interview.section,
          weight: interview.weight,
          sectionId: interview.section.name,
          created: moment(interview.created).locale('en-gb').format('LLLL'),
        };
      });
      this.source.load(data);
    });
  }

  openAddTutorDialogue() {
    this.dialogService.open(QuestionsAddComponent);
  }

  onUserRowSelect(event: any) {
    this.dialogService.open(QuestionsEditComponent, {
      context: {
        question: event.data,
      },
    });
  }
}
