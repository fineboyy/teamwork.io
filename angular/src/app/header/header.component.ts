import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service'
import { LocalStorageService } from '../local-storage.service'
import { AuthService } from '../auth.service'
import { EventEmitterService } from '../event-emitter.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

    this.search_form = new FormGroup({
      'search_item' : new FormControl(null, Validators.required)
    })

    this.search_form.get('search_item').valueChanges.subscribe((value) => {
      this.searchForTask(value)
    })
  }

  search_form: FormGroup

  public toggleCalendar() {
    this.api.toggleCalendar()
  }

  public searchForTask(keyword) {
    this.events.searchTaskEvent.emit(keyword)
  }
  

  public show_options: boolean = false
  public showOptions() {
    this.show_options = !this.show_options
  }
}
