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
    @Inject(DOCUMENT) private document: Document,

  ) { }

  ngOnInit(): void {
    this.events.updateOpenTaskEvent.subscribe((task: any) => {
      if (task.title) {
        this.show_form = false

        this.username = this.storage.getParsedToken().name

        this.title = task.title
        this.date_created = task.date_created
        this.date_completed = task.date_completed
        this.assignedTo = task.assignedTo
        this.content = task.content

        if(task.creatorName == this.username ) {
          this.creatorName = 'You'
          this.creatorNameForHeader = this.username
        } else {
          this.creatorName = task.creatorName
          this.creatorNameForHeader = this.creatorName
        }

        this.creatorId = task.creatorId
        if (task.departments.length) {
          this.department = task.departments[0].name


          //To be scrapped or refactored
          if (this.department === 'Marketing') {
            this.tagClass = 'marketing'
          }
          if (this.department === 'Design') {
            this.tagClass = 'designn'
          }
          if (this.department === 'Development') {
            this.tagClass = 'development'
          }
          if (this.department === 'Management') {
            this.tagClass = 'management'
          }
        }

        this.isCompleted = task.isCompleted
        this.taskId = task._id
      } else {
        return
      }
    })

    this.events.toggleCalendarEvent.subscribe((val) => {
      if (val === 'clicked') {
        this.document.querySelector('.mail-detail').classList.toggle('hide')
      }
    })

    this.events.showFormEvent.subscribe((val) => {
      if (val === 'show') {
        this.show_form = true
        this.title = ''
      }
    })

    this.events.resolveTaskEvent.subscribe((resolved_task) => {
      this.isCompleted = resolved_task.isCompleted
      this.date_completed = resolved_task.date_completed
    })
  }

  public show_form: boolean = false
  public showForm() {
    this.api.showForm()
  }
  //Nme of logged in user
  public username: string = ''

  //Task Variables
  public taskId = ''
  public title = ''
  public date_created = ''
  public date_completed = ''
  public assignedTo = ''
  public creatorNameForHeader: string = ''
  public creatorName = ''
  public creatorId = ''
  public content = ''
  public isCompleted: boolean
  public department: string = ''
  public tagClass: string = ''
  

  //Variables for a newly created task
  public newTaskTitle: string = ''
  public newTaskContent: string = ''




  private departments = [
    "Marketing",
    "Design",
    "Development",
    "Management",
  ]

  public addTask = function () {
    let taskBody = {
      creatorName: this.storage.getParsedToken().name,
      // creatorName: 'Daniel Bempong',
      creatorId: this.storage.getParsedToken()._id,
      assignedTo: 'No one',
      title: this.newTaskTitle || 'No Title',
      content: this.newTaskContent || 'Lorem ipsum dolor amet dine fate silum manor telgris aminut semi nade lemo liricus dometis therim alacora senti necod andemadke dolor amet dine fate silum manor telgris aminut semi nade lemo liricus dometis therim alacora dolor amet dine fate silum manor telgris aminut semi nade lemo liricus dometis therim alacora malaki senti dadee.',
      date_created: this.api.getTaskDate(),
      department: this.departments[Math.floor(Math.random() * 4)]
    }

    let requestObject = {
      method: 'POST',
      location: 'users/create-task',
      body: taskBody,
      authorize: true
    }


    this.api.makeRequest(requestObject).then((val) => {
      if (val.message === 'Task Created') {
        this.newTaskTitle = '',
          this.newTaskContent = ''
          this.show_form = false
        this.events.addTaskEvent.emit(val)
      }
    })
  }

  public resolveTask(id) {
    this.api.resolveTask(id)
  }

  public deleteTask(id) {
    let requestObject = {
      method: 'POST',
      location: `users/delete-task/${id}`,
      authorize: true
    }

    this.api.makeRequest(requestObject).then((deleted_task) => {
      if (deleted_task.title) {
        this.title = ''
        this.show_form = false
        this.events.deleteTaskEvent.emit(deleted_task)
      }
    })
  }
}
