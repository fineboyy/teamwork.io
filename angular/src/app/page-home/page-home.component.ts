import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { ApiService } from '../api.service'
import { LocalStorageService } from '../local-storage.service'

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  constructor(
    private title: Title,
    private api: ApiService,
    private storage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Home | TeamWork.io")
  }

}
