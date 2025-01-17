import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service'
import { EventEmitterService } from '../event-emitter.service'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(
    private api: ApiService,
    private events: EventEmitterService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {

    this.events.getUserDataEvent.subscribe((user: any) => {
      let arr = []
     if(user.tasks) {
      for (let i of user.tasks) {
        i.fakeId = this.removeLeadingNumbers(i._id)
        arr.push(i)
      }
     }
      this.tasks = arr.reverse()
    })

    this.events.addTaskEvent.subscribe((val) => {
      val.task.fakeId = this.removeLeadingNumbers(val.task._id)
      this.tasks.unshift(val.task)
    })

    this.events.toggleCalendarEvent.subscribe((val) => {
      if (val === 'clicked') {
        this.document.querySelector('.inbox-container').classList.toggle('hide')
      }
    })

    this.events.updateOpenTaskEvent.subscribe((task) => {
      let messages = Array.from(this.document.querySelectorAll('.msg'))
      for (let message of messages) {
        message.classList.remove('activated')
      }
      for (let i of this.tasks) {
        i.selected = false
      }
      task.selected = true;
    })

    this.events.resolveTaskEvent.subscribe((completed_task) => {

      for(let task of this.tasks) {
        if(task._id == completed_task._id) {
          task.isCompleted = completed_task.isCompleted
          break
        }
      }
    })
    
    this.events.deleteTaskEvent.subscribe((deleted_task) => {
      for(let i = 0; i < this.tasks.length; i++) {
        let task = this.tasks[i]
        if(task._id == deleted_task._id) {
          this.tasks.splice(i, 1)
          // if(this.tasks[i]) {
          //   this.api.updateOpenTask(this.tasks[i])
          // }
          break
        }
      }
    })
  
    this.events.searchTaskEvent.subscribe((data) => {
      this.search_term = data
    })
  }

  public search_term = ''

  public openTask = function (task) {
    this.api.updateOpenTask(task);
    this.document.querySelector('.add-task').classList.add('show')
  }

  public showForm() {
    this.api.showForm()
  }

  private removeLeadingNumbers(string) {
    function isNumber(n) {
      n = Number(n)
      if (!isNaN(n)) {
        return true
      }
    }
    if (string && isNumber(string[0])) {
      string = this.removeLeadingNumbers(string.substr(1))
    }
    return string
  }

  public resolveTask(id) {
    this.api.resolveTask(id)
  }

  public arr = [6, 22, 4, 15, 31, 7, 2, 4, 9]
  public tasks = []

}
