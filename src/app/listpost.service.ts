import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

@Injectable()
export class ListpostService {
  url: String = 'https://instabookapp.herokuapp.com/';

  testIdFb;

  constructor(private http: Http) {
  }


  getListPost(idFb: string, page: string) {
    this.testIdFb = idFb;
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({id: idFb, page: page, pagesize: 10});

    return this.http.post(this.url + 'posts/getliststatus', body, headers)
      .toPromise();
  }

  pushStatus(urlImg: string[], cap: string, tags: string[], state) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({idfb: this.testIdFb, urlimage: urlImg, cap: cap, tag: tags, state : state, day: '29/11/2017'});

    return this.http.post(this.url + 'posts/poststatus', body, headers)
      .toPromise()
      .then(res => res.json())
      .catch(reason => console.log(reason));
  }

  getPostDetail(id , idFb) {
    const headers = new Headers({'Content-Type': 'application/json'});

    const body = new Object({id: id, idfb: idFb});

    return this.http.post(this.url + 'posts/getstatus', body, headers)
      .toPromise()
      .then(res => res.json())
      .catch(reason => console.log('Lỗi lấy post detail ' + reason));
  }

  like( idPost, idMember) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({idpost: idPost, idmember: this.testIdFb });
    return this.http.post(this.url + 'posts/like', body, headers)
      .toPromise();

  }

  pushComment(idpost, idfb, cmt, act) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({idpost: idpost, idfb: this.testIdFb, cmt: cmt, act: act});
    return this.http.post(this.url + 'posts/comment', body, headers)
      .toPromise();
  }

  delComment(idpost, idcmt) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({idpost: idpost, idcmt: idcmt, act: 'del'});
    return this.http.post(this.url + 'posts/comment', body, headers)
      .toPromise();
  }

  getMyPost() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({id: this.testIdFb});

    return this.http.post(this.url + 'posts/getmypost', body, headers)
      .toPromise()
      .then(res => res.json())
      .then(resJson => console.log(resJson))
      .catch(reason => console.log(reason));
  }

  search(keyword) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({key: keyword});
    return this.http.post(this.url + 'posts/search', body, headers)
      .toPromise();
  }
  delPost(idpost, idfb) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = new Object({idpost: idpost, idfb: idfb});
    return this.http.post(this.url + 'posts/delete', body, headers)
      .toPromise();
  }
}
