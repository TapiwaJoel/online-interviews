import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {InterviewScheduleService} from '../interview-schedule.service';
import {ReferenceCheckAddComponent} from '../reference-check-add/reference-check-add.component';

@Component({
  selector: 'ngx-reference-check-list',
  templateUrl: './reference-check-list.component.html',
  styleUrls: ['./reference-check-list.component.scss'],
})
export class ReferenceCheckListComponent implements OnInit {
  @Input() candidate;
  reference;

  constructor(private interviewScheduleService: InterviewScheduleService,
              private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    console.log('candidate', this.candidate);
    this.interviewScheduleService.getRefCheckById(this.candidate.id).subscribe((data: any) => {
      console.log('data', data);
      this.reference = data.result;
    }, (error: HttpErrorResponse) => {
      console.log('error', error.error.message);
    });
  }

  openAddTutorDialogue() {
    this.dialogService.open(ReferenceCheckAddComponent, {
      context: {
        candidate: this.candidate,
      },
    });
  }
}
