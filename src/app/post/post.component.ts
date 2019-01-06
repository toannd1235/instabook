import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ListpostService} from '../listpost.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @ViewChild('scrollCmt') private myScrollCmt: ElementRef;
  @Output() delPost = new EventEmitter<any>();
  @Input() post;
  @Input() idFb;
  myidfb;

  newCmt = '';
  isClick = true;
  isClickComment = true;

  constructor(private listpostService: ListpostService) {
    this.myidfb = localStorage.getItem('user');
  }

  ngOnInit() {
    console.log(this.post);
    for (let v in this.post.likes) {
      if (this.post.likes[v].idfb === this.idFb) {
        this.isClick = false;
      }
    }
  }

  clickLike() {
    this.isClick = !this.isClick;
    this.listpostService.like(this.post.idpost, this.idFb)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.post.likes = resJson.data.likes;
      });
  }

  clickComment() {
    this.isClickComment = !this.isClickComment;
  }

  pushComment() {
    if (this.newCmt.trim().length !== 0) {
      this.listpostService.pushComment(this.post.idpost, this.idFb, this.newCmt, 'create')
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.post.comments = res.data.comments;
          this.scrollToBottom();
        });
      this.newCmt = '';
    }
  }

  deleteCmt(id: number) {
    this.listpostService.delComment(this.post.idpost, id)
      .then(res => res.json())
      .then(resJson => {
          console.log(resJson);
          if (resJson.code === 1) {
            this.post.comments = resJson.data.comments;
          }
        }
      );
  }

  scrollToBottom(): void {
    try {
      this.myScrollCmt.nativeElement.scrollTop = this.myScrollCmt.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  deletePost() {
    this.listpostService.delPost(this.post.idpost, this.post.idfb)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.code === 1) {
          this.delPost.emit(this.post);
          console.log(resJson);
          console.log(this.post.idpost);
        }
      })
      .catch(reason => console.log(reason));
  }

}
