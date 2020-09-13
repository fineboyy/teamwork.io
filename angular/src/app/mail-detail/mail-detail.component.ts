import { Component, OnInit, Inject } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service'
import { LocalStorageService } from '../local-storage.service'
import { ApiService } from '../api.service'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.css']
})
export class MailDetailComponent implements OnInit {

  constructor(
    private events: EventEmitterService,
    private storage: LocalStorageService,
    private api: ApiService,
    @Inject (DOCUMENT) private document: Document,

  ) { }

  ngOnInit(): void {
    this.events.updateOpenTaskEvent.subscribe((task: any) => {
      if (task.title) {
        this.show = false

        this.title = task.title
        this.date = task.date
        this.assignedTo = task.assignedTo
        this.content = task.content
        this.creatorName = task.creatorName
        this.creatorId = task.creatorId

        this.isCompleted = task.isCompleted
        this.taskId = task._id
      } else {
        console.log(task)
      }
    })
  
    this.events.toggleCalendarEvent.subscribe((val) => {
      if(val === 'clicked') {
        this.document.querySelector('.mail-detail').classList.toggle('hide')
      }
    })
  
    this.events.showFormEvent.subscribe((val) => {
      if(val === 'show') {
        this.show = true
        this.title = ''
      }
    })
  
    this.events.resolveTaskEvent.subscribe((resolved_task) => {
      this.isCompleted = resolved_task.isCompleted
      console.log({'Mail detail isCompleted': this.isCompleted})
    })
  
  }

  public show: boolean = false
  public showForm() {
    this.api.showForm()
  }


  public taskId = ''
  public title = ''
  public date = ''
  public assignedTo = ''
  public creatorName = ''
  public creatorId = ''
  public content = ''
  public isCompleted: boolean

  public taskArr = [
    'Create Adwords campain',
    'Write an article about design',
    'Prepare slides for presentation',
    'Visit clients for product evaluation',
    'Board General Meeting',
    'Finish building the GraphQL API',
    'Contact HR',
    'Discuss the viability of new strategy',
    'Send newsletter to subscribers',
    'Sales reports from last month'

  ]

  public addTask = function () {
    let num = Math.floor(Math.random() * this.taskArr.length)
    console.log(num)

    let taskBody = {
      creatorName: this.storage.getParsedToken().name,
      creatorId: this.storage.getParsedToken()._id,
      assignedTo: 'No one',
      title: this.taskArr[num],
      content: `Yeah I know you would love to see a lot of text here, but I just cannot give you that. What I can give you right now is what I am giving you. If you like it, that's great because I like it too. But if you don't, well, you can go burn the sea!`,
      date: '7 Jun, 2020'
    }

    let requestObject = {
      method: 'POST',
      location: 'users/create-task',
      body: taskBody,
      authorize: true
    }


    this.api.makeRequest(requestObject).then((val) => {
      if (val.message === 'Task Created') {
        this.events.addTaskEvent.emit(val)
      }
    })
  }

  public resolveTask(id) {
    this.api.resolveTask(id)
  }

}
