import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service'
import { LocalStorageService } from '../local-storage.service'
import { AuthService } from '../auth.service'
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private api: ApiService,
    private storage: LocalStorageService,
    public auth: AuthService,
    public events: EventEmitterService,
  ) { }

  ngOnInit(): void {
    let userid = this.storage.getParsedToken()._id
  }

  public searchTerm: string = ''

  public toggleCalendar() {
    this.api.toggleCalendar()
  }

  public searchForTask() {
    this.events.searchTaskEvent.emit(this.searchTerm)
  }
  

  public show_options: boolean = false
  public showOptions() {
    this.show_options = !this.show_options
  }
}
