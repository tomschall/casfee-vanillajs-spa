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

import { messageService } from './rxjs.js';

let messages = [];
messageService.getMessage().subscribe((message) => {
  if (message) {
    // add message to local state if not empty
    console.log(message);
    messages.push(message);
  }
});

export { messages };
