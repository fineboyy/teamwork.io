import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  updateOpenTaskEvent: EventEmitter<any> = new EventEmitter();
  getUserDataEvent: EventEmitter<any> = new EventEmitter();
  addTaskEvent: EventEmitter<any> = new EventEmitter();
  toggleCalendarEvent: EventEmitter<any> = new EventEmitter();
  showFormEvent: EventEmitter<any> = new EventEmitter();
  resolveTaskEvent: EventEmitter<any> = new EventEmitter();
  deleteTaskEvent: EventEmitter<any> = new EventEmitter();
  createTaskEvent: EventEmitter<any> = new EventEmitter();
  searchTaskEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }
}
