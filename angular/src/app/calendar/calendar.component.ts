import { Component, OnInit, Inject } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service'
import { DOCUMENT } from '@angular/common'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(
    private events: EventEmitterService,
    @Inject (DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    this.events.toggleCalendarEvent.subscribe((val) => {
      if(val === 'clicked') {
        this.document.querySelector('.calendar-container').classList.toggle('calendar-show')
      }
    })
  }

}
