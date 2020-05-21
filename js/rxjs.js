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

function createObservable() {
  const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  console.log('just before subscribe');
  observable.subscribe({
    next(x) {
      console.log('got value ' + x);
    },
    error(err) {
      console.error('something wrong occurred: ' + err);
    },
    complete() {
      console.log('done');
    },
  });
  console.log('just after subscribe');
}

function init() {
  createObservable();
}

init();
