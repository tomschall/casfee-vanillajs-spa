import {
  Observable,
  Subject,
  ReplaySubject,
  from,
  fromEvent,
  of,
  range,
} from 'https://dev.jspm.io/rxjs@6/_esm2015';

import {
  map,
  filter,
  switchMap,
} from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

const subject = new Subject();

export const messageService = {
  sendMessage: (message) => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable(),
};
