import { Component, OnInit, Input} from '@angular/core';
import {LoginService} from '../login.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ListpostService} from '../listpost.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() listPerson;
  @Input() listPost;
  keyword;
  constructor(private loginService: LoginService, private postService: ListpostService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.keyword = params.get('keyword');
      this.loginService.search(this.keyword)
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          this.listPerson = resJson.data.list;
        })
        .catch(reason => console.log(reason));
      this.postService.search(this.keyword)
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          this.listPost = resJson.data.list;
        })
        .catch(reason => console.log(reason));
    });
  }
}
