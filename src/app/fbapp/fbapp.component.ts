import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { FacebookService, InitParams } from 'ngx-facebook';
@Component({
  selector: 'app-fbapp',
  templateUrl: './fbapp.component.html',
  styleUrls: ['./fbapp.component.css']
})
export class FbappComponent {
  constructor(private fb: FacebookService, private http: Http) {
    this.fb.init({
      appId: '301808607003765',
      xfbml: true,
      version: 'v2.8'
    });
  }
  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'text');
  }
  get(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    }).toPromise().then((access_token) => {
      console.log(access_token);
    });
  }
  senRequestToServer(Url) {
    this.get(Url);
  }
  getFBToken() {
    let Url;
    this.fb.login().then((res) => {
      Url = this.fullUrl(res.authResponse.accessToken);
      console.log(res.authResponse.accessToken);
      this.senRequestToServer(Url);
    }).catch((error) => {
      console.error(error);
    });
  }
  fullUrl(access_token) {
    // tslint:disable-next-line:max-line-length
    return 'http://188.166.25.105:2424/api/login/fb?is_sp=1&access_token=' + access_token;
  }
}

