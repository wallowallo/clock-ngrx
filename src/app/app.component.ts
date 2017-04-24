import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store, provideStore } from '@ngrx/store';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';

//only need to add this to app.module
//import { Clock } from './clock';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  //only need to add it to app.module
  //directives: [Clock]
})
export class AppComponent {
  //click$ get a value from an input with (click)="click$.next(inputNum.value)" on it
  click$ = new Subject()
    .map((value: string) => ({type: 'HOUR', payload: parseInt(value)}));

  //seconds$ uses interval to pass a value every 1 seconds to update the time
  seconds$ = Observable
    .interval(1000)
    .mapTo({type: 'SECOND', payload: 1});

  //recallPeople$ uses withLatestFrom to send a value from the time variable
  recallPeople$ = new Subject();

  //updatePerson$ is getting a value from the list which person was clicked
  updatePerson$ = new Subject()
    .map((value) => ({type: 'UPDATE_PERSON', payload: value}));

  //person$ is getting a value from an input with the function person$.next(input.value) on it
  person$ = new Subject()
    .map((value: string) => ({type: 'ADD_PERSON', payload: value}))

  time;
  people;

  //set type to store so there is no errors
  constructor(_store: Store<any>) {
    //selecting which reducer to be used
    this.time = _store.select('clock');
    this.people = _store.select('people');

    //subscribing to the observable to be able to act on events
    this.person$.subscribe(_store.dispatch.bind(_store))

    //merges the observables that are related
    Observable.merge(
        this.click$,
        this.seconds$,
        this.updatePerson$,
        this.recallPeople$ //underscore is latest value from recallPeople$
        .withLatestFrom(this.time, (_, y) => y) //y is latest from this.time
        .map((time) => ({type: 'RECALL_PEOPLE', payload: time}))
      )
        .subscribe(_store.dispatch.bind(_store));
  }
}
