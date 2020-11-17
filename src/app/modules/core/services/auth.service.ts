import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../configs/app.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }
    isAuthenticated() {
        return this.http.get('/auth/isAuthenticated');
    }
    getAuthorizationToken() {
    	return AppConfig.authToken;
    }
}
