import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {InterviewScheduleService} from '../interview-schedule.service';
import {JobApplicationFormComponent} from '../job-application-form-add/job-application-form-add.component';
import {PreInterviewComponent} from '../pre-interview-add/pre-interview-add.component';
import {ReferenceCheckAddComponent} from '../reference-check-add/reference-check-add.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-reference-check-list',
  templateUrl: './reference-check-list.component.html',
  styleUrls: ['./reference-check-list.component.scss'],
})
export class ReferenceCheckListComponent implements OnInit {
  @Input() candidate;
  reference;

  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };

  constructor(private interviewScheduleService: InterviewScheduleService,
              private router: Router,
              private dialogService: NbDialogService) {
  }

  ngOnInit(): void {

  }

  openRefDialogue() {
    this.dialogService.open(ReferenceCheckAddComponent, {
      context: {
        candidate: this.candidate,
      },
    });
  }

  openRefDialogueJob() {
    this.dialogService.open(JobApplicationFormComponent, {
      context: {
        candidate: this.candidate,
      },
    });
  }

  openRefDialoguePre() {
    this.dialogService.open(PreInterviewComponent, {
      context: {
        candidate: this.candidate,
      },
    });
  }
}
