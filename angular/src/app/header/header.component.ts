import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { LocalStorageService } from '../local-storage.service'
import { AuthService } from '../auth.service'

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
  ) { }

  ngOnInit(): void {
    let userid = this.storage.getParsedToken()._id
    this.api.getUserData(userid)
  }

  public toggleCalendar() {
    this.api.toggleCalendar()
  }

  public show_options: boolean = false
  public showOptions() {
    this.show_options = !this.show_options
  }
}
