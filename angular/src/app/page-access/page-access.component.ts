import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service'
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-page-access',
  templateUrl: './page-access.component.html',
  styleUrls: ['./page-access.component.css']
})

export class PageAccessComponent implements OnInit {

  constructor(
    private api: ApiService,
    private storage: LocalStorageService,
    private router: Router,
    private title: Title,
    @Inject (DOCUMENT) private document: Document,

  ) { }


  ngOnInit(): void {
    this.title.setTitle("TeamWork.io - All your effiency in one place")
  }
  public formError = ""

  public credentials = {
    email: '',
    password: ''
  }

  public formSubmit() {
    this.formError = ""
    if(
      !this.credentials.email ||
      !this.credentials.password
    ) {
      return this.formError = "All fields are required"
    }

    if(!this.formError) {
      this.login()
    }
  }


  public login() {
    let requestObject = {
      method: 'POST',
      location: 'users/login',
      body: this.credentials
    }

    this.api.makeRequest(requestObject).then((val) => {
      if(val.token) {
        this.storage.setToken(val.token)
        this.router.navigate(['/'])
        return
      }
      if (val.message) { this.formError = val.message }
    })
  }

  public toggleRegister() {
    this.document.querySelector('.front').classList.add('rotated')
    this.document.querySelector('.back').classList.remove('rotated')

  }
  public toggleLogin() {
    this.document.querySelector('.back').classList.add('rotated')
    this.document.querySelector('.front').classList.remove('rotated')
  }
}
