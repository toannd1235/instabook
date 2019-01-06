import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login.service';

import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  token: any;
  loged = false;
  user = {name: 'Hello'};

  constructor(private route: ActivatedRoute,
              private router: Router, private loginService: LoginService, private  fb: FacebookService) {
    const initParams: InitParams = {
      appId: '553664878435875',
      version: 'v3.2'
    };

    fb.init(initParams);
    fb.getLoginStatus()
      .then(res => res.status)
      .then(resStatus => {
        if (resStatus === 'connected') {
          this.goHome();
        } else {
          if (localStorage.getItem('user') !== null) {
            this.goHome();
          }
          console.log(resStatus);
        }
      });
  }

  ngOnInit() {

  }

  loginWithOptions() {
    const self = this;
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,email,pages_show_list'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        if (res.status === 'connected') {
          self.me();
        }
      })
      .catch(reason => console.log(reason));

  }

  goHome() {
    const link = ['/home'];
    this.router.navigate(link);
  }

  me() {
    const self = this;
    this.fb.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends')
      .then((res: any) => {
        console.log('Got the users data', res);
        localStorage.setItem('user', (res.id));
        self.loginService.login(res)
          .then(resLogin =>  {
            if (resLogin.code === 1) {
              self.goHome();
            }
          });
      })
      .catch(reason => console.log(reason));
  }

}
