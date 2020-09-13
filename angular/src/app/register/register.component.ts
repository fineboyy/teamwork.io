import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service'
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private api: ApiService,
    private storage: LocalStorageService,
    private router: Router,
    private title: Title,
    @Inject (DOCUMENT) private document: Document,

  ) { }

  ngOnInit(): void {
  }

  public formError = "";

  public credentials = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: ''
  };

  public formSubmit() {
    this.formError = '';

    if (
      !this.credentials.first_name ||
      !this.credentials.last_name ||
      !this.credentials.email ||
      !this.credentials.password ||
      !this.credentials.password_confirm
    ) {
      return this.formError = "All fields are required"
    }

    // var re = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    // if(!re.test(this.credentials.email)) {
    //   return this.formError = "Please enter a valid email address.";
    // }

    if (this.credentials.password !== this.credentials.password_confirm) {
      return this.formError = "Passwords don't match.";
    }

    this.register();

  }

  private register() {
    let requestObject = {
      method: "POST",
      location: "users/register",
      body: this.credentials
    }

    this.api.makeRequest(requestObject).then((val) => {
      if (val.token) {
        this.storage.setToken(val.token);
        this.router.navigate(['/'])
        return;
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
