import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition} from '@nebular/theme';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {Toast} from './toast';

@Injectable({
  providedIn: 'root',
})

export class HttpCallsInterceptor implements HttpInterceptor {

  index = 1;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;

  constructor(private toast: Toast,
              private router: Router) {
  }

  // function which will be called for all http calls
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerObject = {
      'Content-Type': 'application/json',
    };

    // if (request.url.includes('counters') && (request.method === 'GET' || request.method === 'POST')) {
    // } else {
    //   if (localStorage.getItem('auth')) {
    //     headerObject['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('auth')).body.token;
    //   }
    // }

    // console.log('test', JSON.parse(localStorage.getItem('auth')).body.token);
    const headers = new HttpHeaders(headerObject);
    const updatedRequest = request.clone({
      headers: headers,
    });

    return next.handle(updatedRequest).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (event.status === 400) {
              this.toast.makeToast('danger', 'Error', event.body.message);
            } else {
              if (request.method !== 'GET') {
                this.toast.makeToast('success', 'Success', event.body.message);
              }
            }
          }
        },
        (error: HttpErrorResponse) => {
          let title: any;
          let content = `Something went wrong`;
          const status: NbComponentStatus = 'danger';

          if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
              title = '503. Something is wrong and it\'s not you. Call for support';
            } else {
              title = error.status + '. ' + error.statusText;
            }
            content = error.error.message;
            this.toast.makeToast(status, title, content);
          }
        },
      ),
    );
  }
}

