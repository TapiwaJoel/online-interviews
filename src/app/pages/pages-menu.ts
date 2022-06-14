import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Users',
    icon: 'person-outline',
    link: '/pages/users',
  },
  {
    title: 'Sections',
    icon: 'award-outline',
    link: '/pages/sections',
  },
  {
    title: 'Interviews',
    icon: 'award-outline',
    link: '/pages/interviews',
  },
  {
    title: 'Interviews Schedule',
    icon: 'award-outline',
    link: '/pages/interview-schedule',
  },
  {
    title: 'Time Slots',
    icon: 'clock-outline',
    link: '/pages/time-slots',
  },
  {
    title: 'Questions',
    icon: 'question-mark-circle-outline',
    link: '/pages/questions',
  },
  {
    title: 'Job',
    icon: 'question-mark-circle-outline',
    link: '/pages/jobs',
  },
  // {
  //   title: 'Pre-Interview Form',
  //   icon: 'checkmark-square-outline',
  //   link: '/pages/pre-interview-form',
  // },
  // {
  //   title: 'Job Application Form',
  //   icon: 'checkmark-square-outline',
  //   link: '/pages/job-application-form',
  // },
];

export const INTERVIEWEE_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Pre Interview Form',
    icon: 'person-outline',
    link: '/pages/pre-interview-form',
  },
  {
    title: 'Job Application Form',
    icon: 'person-outline',
    link: '/pages/job-application-form',
  },
];
