import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import * as SectionActions from '../section.actions';
import {Section} from '../section.entity';
import {selectSectionLoading} from '../section.selectors';

@Component({
  selector: 'ngx-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionEditComponent implements OnInit {
  @Input() section: Partial<Section>;
  statuses = [
    {key: 'ACTIVE', val: 'ACTIVE'},
    {key: 'INACTIVE', val: 'INACTIVE'},
    {key: 'DELETED', val: 'DELETED'},
  ];
  addSectionForm: FormGroup;

  constructor(private store: Store<AppState>,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.addSectionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.addSectionForm.setValue({
      name: this.section.name,
      status: this.section.status,
    });
    this.cdr.detectChanges();
  }

  onSubmit() {

    const section = {...this.section, ...this.addSectionForm.value};
    delete section.created;
    this.store.dispatch(SectionActions.editRequest({section}));

    this.store.pipe(select(selectSectionLoading)).subscribe((isLoading) => {
      console.log('isloading', isLoading);
    });
  }

}
