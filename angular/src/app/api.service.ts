import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {LocalStorageService} from './local-storage.service'
import { EventEmitterService } from './event-emitter.service'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private events: EventEmitterService
    ) { }

  private baseUrl = "http://localhost:3000"
  private successHandler(value) { return value }
  private errorHandler(error) { return error }

  public makeRequest(requestObject): any {
    let method = requestObject.method.toLowerCase()
    if (!method) { return console.log("No method specified in the request object."); }

    let body = requestObject.body || {}
    let location = requestObject.location
    if (!location) { return console.log("No location specified in the request object"); }

    let url = `${this.baseUrl}/${location}`;

    let httpOptions = {};

    if(requestObject.authorize) {
      httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.storage.getToken()}`
        })
      }
    }

    if (method === "get") {
      return this.http.get(url, httpOptions).toPromise()
        .then(this.successHandler)
        .catch(this.errorHandler)
    }

    if (method === 'post') {
      return this.http.post(url, body, httpOptions).toPromise()
        .then(this.successHandler)
        .catch(this.errorHandler)
    }

    console.log("Could not make the request. Make sure a method of GET or POST is supplied");
  }

  public updateOpenTask(task) {
    this.events.updateOpenTaskEvent.emit(task)
  }

  public showForm() {
    this.events.showFormEvent.emit('show')
  }

  public toggleCalendar() {
    this.events.toggleCalendarEvent.emit('clicked')
  }

  public getUserData(id) {
    let requestObject = {
      method: 'GET',
      location: `users/get-user-data/${id}`,
      authorize: true
    }

    this.makeRequest(requestObject).then((user) => {
      this.events.getUserDataEvent.emit(user)
    })
  }

  public resolveTask(id) {
    let requestObj = {
      method: 'POST',
      location: `users/resolve-task/${id}`,
      authorize: true
    }

    this.makeRequest(requestObj).then((completed_task) => {
      this.events.resolveTaskEvent.emit(completed_task);
    })
  }
}
