import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {forkJoin} from 'rxjs';
import {InterviewScheduleService} from '../interview-schedule.service';

@Component({
  selector: 'ngx-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent implements OnInit {
  @Input() interview;
  isDetailedSelected: string = '1';
  settings = {
    actions: false,
    columns: {
      fullname: {
        title: 'Full Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      mark: {
        title: 'Overall Score',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  candidateIds = [];
  candidates$ = [];
  candidatesAll = [];

  constructor(private interviewScheduleService: InterviewScheduleService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit Test', this.interviewScheduleService.candidates);
    const interviewees = this.interviewScheduleService.candidates;
    this.interviewScheduleService.getScoresByInterviewSchedule(this.interview.id).subscribe((data: any) => {
      if (data.result.length) {

        for (const result of data.result) {
          const candidateId = result.candidateId;

          const indexCandidate = this.candidateIds.includes(candidateId);
          if (!indexCandidate) {
            this.candidates$.push(this.interviewScheduleService.getCandidate(candidateId));
            this.candidateIds.push(candidateId);
          }
        }


        forkJoin([...this.candidates$]).subscribe((candidates) => {
          const candidatesArr = [];
          [...candidates].forEach((candidate: any) => {
            this.candidatesAll.push(...candidate.result);
          });


          for (const result of data.result) {

            const candidateId = result.candidateId;
            const candidate = {};
            const index = candidatesArr.findIndex(x => x.candidateId === candidateId);

            if (index < 0) {
              candidate['candidateId'] = candidateId;
              candidate['mark'] = result.mark;
              const interIndex = this.candidatesAll.findIndex(x => x.id === candidateId);
              const userFound = this.candidatesAll[interIndex];
              candidate['fullname'] = userFound.user.fullname;
              candidate['email'] = userFound.user.email;
              candidatesArr.push(candidate);
            } else {
              const newCandidate = candidatesArr[index];
              newCandidate['mark'] = newCandidate['mark'] + result.mark;
              candidatesArr[index] = newCandidate;
            }
          }
          this.candidateIds.forEach(id => {

          });
          this.source.load(candidatesArr);
        });


      }
    }, error => {
      console.log('error', error);
    });
  }
}
