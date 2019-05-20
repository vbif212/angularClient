import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Cookie} from 'ng2-cookies';
import {catchError} from 'rxjs/operators';
import {Issue} from './model/issue.model';
import {Comment} from './model/comment.model';

@Injectable()
export class AppService {
  constructor(
    private router: Router, private http: HttpClient) {
  }

  obtainAccessToken(loginData) {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'clientIdPassword');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('clientIdPassword:secret')
    });
    const options = ({headers});

    this.http.post(
      'http://localhost:8081/spring-security-oauth-server/oauth/token',
      params.toString(),
      options)
      .pipe(
        catchError(error => {
            return throwError(error);
          }
        )
      )
      .subscribe(
        data => this.saveToken(data),
        err => console.log(err));
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    this.router.navigate(['/']);
  }

  getResource(resourceUrl): Observable<Issue> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    const options = ({headers});
    return this.http.get(resourceUrl, options)
      .pipe(
        catchError(err => {
          console.log('getResource');
          console.log(err);
          return [];
        })
      );
  }

  createResource(resourceUrl, resource: Issue): Observable<Issue> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    const options = ({headers});
    return this.http.post(resourceUrl, resource, options)
      .pipe(catchError(err => {
          if (err.status === 409) {
            alert('Issue already exist!');
          }
          console.log('createResource');
          console.log(err);
          return [];
        })
      );
  }

  getAllResources(resourceUrl): Observable<Issue[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    const options = ({headers});
    return this.http.get(resourceUrl, options)
      .pipe(catchError(err => {
          console.log('getAllResources');
          console.log(err);
          return [];
        })
      );
  }

  deleteResource(resourceUrl): Observable<{}> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    const options = ({headers});
    return this.http.delete(resourceUrl, options)
      .pipe(catchError(err => {
          console.log('deleteResources');
          console.log(err);
          return Observable.throw(err);
        })
      );
  }

  addComment(resourceUrl, resource: Comment): Observable<Comment> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    const options = ({headers});
    return this.http.post(resourceUrl, resource, options)
      .pipe(catchError(err => {
          console.log('addComment');
          console.log(err);
          return [];
        })
      );
  }

  checkCredentials() {
    if (!Cookie.check('access_token')) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    Cookie.delete('access_token');
    this.router.navigate(['/login']);
  }
}
