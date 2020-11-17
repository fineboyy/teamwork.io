import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { LocalStorageService } from '../local-storage.service'
import { ApiService } from '../api.service'
import { EventEmitterService } from '../event-emitter.service'
 
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private storage: LocalStorageService,
    private api: ApiService,
    private events: EventEmitterService
    ) { }

  ngOnInit(): void {
    this.userName = this.storage.getParsedToken().name
    this.userEmail = this.storage.getParsedToken().email
    let userid = this.storage.getParsedToken()._id

    this.api.getUserData(userid)


    this.events.getUserDataEvent.subscribe((user: any) => {
      let arr = []
      for(let t of user.teams) {
        arr.push(t)
      }
      this.teams = arr.reverse()
    })
  }

  public userName: string = ''
  public userEmail: string = ''

  public team_name: string = ''

  public teams = []

  public show_form: boolean = false

    public showForm() {
      this.show_form = !this.show_form
    }


  public createTeam() {
    let requestObj = {
      method: 'POST',
      location: 'users/create-team',
      body: {
        team_name: this.team_name
      },
      authorize: true
    }

    this.api.makeRequest(requestObj).then((val) => {
      if(val.name) {
        this.team_name = ''
        this.show_form = false
        this.teams.unshift(val)
      }
    })
  }

}
