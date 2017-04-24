import { Component } from '@angular/core'

@Component({
    selector: 'people',
    template: `<div *ngFor="let person of people | async">
                {{person.name}} is in {{person.time}}
               </div>`
})
export class People {
}
