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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  click$ = new Subject();

  clock;

  constructor(_store: Store<any>) {
    this.clock = _store.select('clock');


    Observable.merge(
        this.click$.mapTo('HOUR'),
        Observable.interval(1000).mapTo('SECOND')
      )
        .subscribe((type) => {
          _store.dispatch({type});
        })
  }
}
