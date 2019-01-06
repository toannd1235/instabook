import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

@Injectable()
export class LoginService {
  url: String = 'https://instabookapp.herokuapp.com/';
  constructor(private http: Http) {
  }

  login(user) {
    console.log('LOGIN NOW');
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + 'login', user, headers)
      .toPromise()
      .then(res => res.json())
      .catch(reason => console.log('LOGIN FAIL ' + reason));
  }

  getuserdata(myid, yourid) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({idfb: myid, id: yourid});
    return this.http.post(this.url + 'users/userdetail', body, headers)
      .toPromise();

  }
  getListpost(idFb, id, page) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({idfb: idFb, idmember: id, page: 1, pagesize : 10 });
    return this.http.post(this.url + 'posts/getmemberpost', body, headers)
      .toPromise();
  }

  follow(myid , yourid ) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({idfb: myid, idmember: yourid});
    return this.http.post(this.url + 'users/follow', body, headers)
      .toPromise();
  }
  search(keyword) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({key: keyword});
    return this.http.post(this.url + 'users/search', body, headers)
      .toPromise();
  }
}
