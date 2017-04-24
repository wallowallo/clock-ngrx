import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store, provideStore } from '@ngrx/store';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
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
  click$ = new Subject()
    .map((value: string) => ({type: 'HOUR', payload: parseInt(value)}));

  seconds$ = Observable
    .interval(1000)
    .mapTo({type: 'SECOND', payload: 1});

  time;

  constructor(_store: Store<any>) {
    this.time = _store.select('clock');


    Observable.merge(
        this.click$,
        this.seconds$
      )
        .subscribe(_store.dispatch.bind(_store));
  }
}
