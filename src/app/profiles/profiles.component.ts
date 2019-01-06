import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FacebookService, InitParams} from 'ngx-facebook';
import {LoginService} from '../login.service';
import {ListpostService} from '../listpost.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {
  @Input() mypost;
  profiles = null;
  myListpost;
  typePost = 'Follow';
  isClick= true;
  numberFollow = 0;
  numberPost = 0;
  myidfb;
  idFb;
  page = 1;

  constructor(private loginService: LoginService,
              private route: ActivatedRoute,
              private facebookService: FacebookService,
              private postService: ListpostService,
              private router: Router) {
    const initParams: InitParams = {
      appId: '183379485553956',
      version: 'v2.8'
    };

    facebookService.init(initParams);
    this.myidfb = localStorage.getItem('user');
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idFb = params.get('idFb');
      this.getUserData();
    });
  }

  getUserData() {
    this.loginService.getuserdata(this.myidfb, this.idFb)
      .then(res => res.json())
      .then(resJson => {
        this.profiles = resJson;
        if (this.profiles.data.follow) {
          this.typePost = 'Following';
          this.isClick = false;
        }
        console.log(this.profiles);
        console.log(this.myidfb, this.profiles.data.user.idfb);
      })
      .catch(res => localStorage.removeItem('user'));

    this.loginService.getListpost(this.myidfb, this.idFb, this.page)
      .then(res =>  res.json())
      .then(res => {console.log(res); this.myListpost = res.data.list; });
  }

  clickfollow() {
    this.follow();
    this.isClick = !this.isClick;
    if (this.isClick === false) {
      this.numberFollow++;
      this.typePost = 'Following';
    } else if (this.isClick === true) {
      this.numberFollow--;
      this.typePost = 'Follow';
    }
  }

  logout() {
    this.facebookService.logout().then(res => console.log(res));
    localStorage.removeItem('user');
    this.goLogin();
  }
  goLogin() {
    const link = ['/login'];
    this.router.navigate(link);
  }
  follow() {
    this.loginService.follow(this.myidfb, this.idFb)
      .then(res => res.json())
      .then(resJson => console.log(resJson))
      .catch(reason => console.log(reason));
  }
}

