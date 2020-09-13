import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { LocalStorageService } from '../local-storage.service'
 
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private storage: LocalStorageService,
    ) { }

  ngOnInit(): void {
    this.userName = this.storage.getParsedToken().name
    this.userEmail = this.storage.getParsedToken().email
  }

  public userName: string = ''
  public userEmail: string = ''

}
