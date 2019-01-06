import {Component, EventEmitter, OnInit} from '@angular/core';
import {ListpostService} from '../listpost.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageNumber = 0;
  idFb;
  listPost= [];

  constructor(private router: Router, private listPostService: ListpostService) {
    this.idFb = localStorage.getItem('user');
    this.getList();
  }
  getList() {
    this.listPostService.getListPost(this.idFb, this.pageNumber.toString())
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.listPost.push(...resJson.data.list);
      });
  }

  savePost(post: any) {
    this.listPost.unshift(post);
  }
  deletePost(post: any) {
    console.log('AAAAAVVVV');
    for (let i = 0 ; i < this.listPost.length ; i++) {
      console.log('AAAAAVVVV');
      if (this.listPost[i].idpost === post.idpost) {
        console.log('BBBBBVVVV');
        this.listPost.splice(i, 1);
      }
    }
  }

  ngOnInit() {
    const self = this;
    window.onscroll = function () {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('nav').style.height = '50px';
        $('#instabook').addClass('animated fadeOutUp');

      } else if (document.body.scrollTop < 50 || document.documentElement.scrollTop < 50) {
        document.getElementById('nav').style.height = '77px';
        $('#instabook').removeClass('animated fadeOutUp');
        $('#instabook').addClass('animated fadeInDown');
      }
      if ($(document).height() - $(window).scrollTop() - $(window).height() < 1 ) {
        console.log($(window).height(), $(window).scrollTop(), $(document).height());
        console.log('load');
        self.pageNumber++;
        self.getList();
      }
    };

  }


  goLogin() {
    const link = ['/login'];
    this.router.navigate(link);
  }
}
