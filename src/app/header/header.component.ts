import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() idFb;
  myidfb;
  searchText;

  constructor() { }

  ngOnInit() {
    this.myidfb = localStorage.getItem('user');
  }
}
