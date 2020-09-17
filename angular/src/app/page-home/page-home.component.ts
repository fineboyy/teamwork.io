import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  constructor(
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Home | TeamWork.io")
  }

}
