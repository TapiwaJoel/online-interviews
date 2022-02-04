import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
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

  constructor(private interviewScheduleService: InterviewScheduleService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.interviewScheduleService.candidates);
    const interviewees = this.interviewScheduleService.candidates;
    this.interviewScheduleService.getScoresByInterviewSchedule(this.interview.id).subscribe((data: any) => {
      if (data.result.length) {
        const candidatesArr = [];
        for (const result of data.result) {
          const candidateId = result.candidateId;
          const candidate = {};
          const index = candidatesArr.findIndex(x => x.candidateId === candidateId);
          if (index < 0) {
            candidate['candidateId'] = candidateId;
            candidate['mark'] = result.mark;
            console.log('candidateId', candidateId);
            const interIndex = interviewees.findIndex(x => x.id === candidateId);
            // if (interIndex >= 0) {
            const userFound = interviewees[interIndex];
            console.log('userFound', userFound);
            candidate['fullname'] = userFound.fullname;
            candidate['email'] = userFound.email;
            candidatesArr.push(candidate);
            // }
          } else {
            const newCandidate = candidatesArr[index];
            newCandidate['mark'] = newCandidate['mark'] + result.mark;
            candidatesArr[index] = newCandidate;
          }
        }
        this.source.load(candidatesArr);
      }
    }, error => {
      console.log('error', error);
    });
  }
}
