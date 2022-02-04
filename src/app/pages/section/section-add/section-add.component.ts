import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import * as SectionActions from '../section.actions';
import {selectSectionLoading} from '../section.selectors';

@Component({
  selector: 'ngx-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss'],
})
export class SectionAddComponent implements OnInit {
  addSectionForm: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.addSectionForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const section = {...this.addSectionForm.value, status: 'ACTIVE'};
    this.store.dispatch(SectionActions.createRequest({section}));

    this.store.pipe(select(selectSectionLoading)).subscribe((isLoading) => {
      console.log('isloading', isLoading);
    });
  }
}
