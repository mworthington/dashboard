// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  userProfile: any;
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  isAdmin: boolean;
  companyName: string;

  constructor(private router: Router) {
    const lsProfile = localStorage.getItem('profile');
    if (lsProfile && this.tokenValid) {
      this._storeLocalLoginData(lsProfile);
      this._setLoggedIn(true);
    } else if (!this.tokenValid && lsProfile) {
      this.logout();
    }
  }

  private _storeLocalLoginData(lsProfile: string) {
    this.isAdmin = this._getIsAdmin(lsProfile);
    this.companyName = this._getCompanyName(lsProfile);
    this.userProfile = JSON.parse(lsProfile);
  }

  private _resetLocalLoginData() {
    this.userProfile = undefined;
    this.isAdmin = undefined;
    this.companyName = undefined;
  }

  private _getProfileProperty(profile, propertyName) {
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    if (roles.indexOf(propertyName) > -1) {
      return roles[propertyName];
    }
    return '';
  }

  private _getIsAdmin(profile) {
    return this._getProfileProperty(profile, 'admin') !== '';
  }

  private _getCompanyName(profile) {
    return this._getProfileProperty(profile, 'companyName');
  }

  private _setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  private _handleAuth(err, authResult) {
    console.log('Handling authenciation');
    if (err) {
      console.log(err);
      this._clearRedirect();
      alert(`Failed to authenticate: ${err.error_description}. Check the console for further details.`);
      return;
    }
    if (authResult && authResult.accessToken && authResult.idToken) {
      console.log('Succesful authentication');
      window.location.hash = '';
      this._getProfile(authResult);
      this._redirect();
      return;
    }
    this.router.navigate(['/pages/auth/login']);
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      console.log('pre profile');
      if (profile) {
        this._setSession(authResult, profile);
        this._redirect();
      } else if (err) {
        this.router.navigate(['/pages/auth/login']);
        this._clearRedirect();
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    localStorage.removeItem('authRedirect');
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    // Set tokens and expiration in localStorage and props
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.isAdmin = this._getIsAdmin(profile);
    localStorage.setItem('isAdmin', this.isAdmin.toString());
    this.companyName = this._getCompanyName(profile);
    localStorage.setItem('companyName', this.companyName.toString());
    this.userProfile = profile;
    // Update login status in loggedIn$ stream
    this._setLoggedIn(true);
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  private _redirect() {
    // Redirect with or without 'tab' query parameter
    // Note: does not support additional params besides 'tab'
    const fullRedirect = decodeURI(localStorage.getItem('authRedirect'));
    const redirectArr = fullRedirect.split('?tab=');
    const navArr = [redirectArr[0] || '/'];
    const tabObj = redirectArr[1] ? { queryParams: { tab: redirectArr[1] } } : null;

    if (!tabObj) {
      this.router.navigate(navArr);
    } else {
      this.router.navigate(navArr, tabObj);
    }
  }

  public manualRegister(username: string, password: string, email: string, company: string){

  }

  public unauthorizedPageAccess() {
    console.error(`Attempting to access page without authorization`);
    localStorage.setItem('authRedirect', this.router.url);
    this.router.navigate(['pages/auth/login']);
  }


  public manualLogin(username: string, password: string){
    const self = this;
    self._auth0.login(
      {
        realm: AUTH_CONFIG.USERNAMEPASSWORDCONNECTION,
        username: username,
        password: password
      }, (err, authResult) => {
        self._handleAuth(err, authResult);
      }
    );
  }

  public logout() {
    // Ensure all auth items removed from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('authRedirect');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('companyName');
    this._clearRedirect();
    // Reset local properties, update loggedIn$ stream
    this._resetLocalLoginData();
    this._setLoggedIn(false);
    // Return to homepage
    this.router.navigate(['pages/auth/login']);
  }

  public handleAuthentication(): void {
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this._getProfile(authResult);
        return;
      }
      if (err) {
        this.router.navigate(['pages/auth/login']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getUsername(): string {
    if (this.loggedIn) {
      return this.userProfile.name;
    }
    return 'Not logged in';
  }

  public getIsAdmin(): string {
    if (this.isAdmin) {
      return ' (admin)';
    }
    return '';
  }
}
