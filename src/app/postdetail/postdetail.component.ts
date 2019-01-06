import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ListpostService} from '../listpost.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollCmt') private myScrollCmt: ElementRef;
  @Input() idFb;
  myidfb;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private postService: ListpostService) {
    this.myidfb = localStorage.getItem('user');

  }

  isClick = true;
  postdetail;
  id;
  newCmt = '';
  listComment = [];

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });

    this.postService.getPostDetail(this.id, this.idFb)
      .then(resJson => {
        console.log(resJson);
        this.postdetail = resJson.data.post;

        for (let v in this.postdetail.likes) {
          if (this.postdetail.likes[v].idfb === this.myidfb) {
            this.isClick = false;
          }
        }
      });
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  clickLike() {
    this.isClick = !this.isClick;
    this.postService.like(this.postdetail.idpost, this.idFb)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.postdetail.likes = resJson.data.likes;
      });

  }

  pushComment() {
    if (this.newCmt.trim().length !== 0) {
      this.postService.pushComment(this.postdetail.idpost, this.idFb, this.newCmt, 'create')
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.postdetail.comments = res.data.comments;
        });
      this.scrollToBottom();
      this.newCmt = '';
    }
  }

  deleteCmt(id: number) {
    this.postService.delComment(this.id, id)
      .then(res => res.json())
      .then(resJson => {
          console.log(resJson);
          if (resJson.data.comments !== null) {
            this.postdetail.comments = resJson.data.comments;
          }
        }
      );
  }

  deletePost() {
    this.postService.delPost(this.postdetail.idpost, this.postdetail.idfb)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.code === 1) {
          console.log(resJson);
          this.goHome();
        }
      })
      .catch(reason => console.log(reason));
  }

  goHome() {
    const link = ['/home'];
    this.router.navigate(link);
  }

  scrollToBottom(): void {
    try {
      this.myScrollCmt.nativeElement.scrollTop = this.myScrollCmt.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
