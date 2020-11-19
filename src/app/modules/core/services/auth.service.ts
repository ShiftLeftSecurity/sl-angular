import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../configs/app.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }
    isAuthenticated() {
        return this.http.get('/auth/isAuthenticated', {
        	withCredentials: true,
        	responseType: 'blob'
        });
    }
    getAuthorizationToken() {
    	return AppConfig.authToken;
    }
    login(username: string, password: string) {
      const formData  = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      return this.http.post<any>(`/login`, formData, options)
        .pipe(map(user => {
            if (user) {
                console.log('aut successful')
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
	  }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
    }

}
