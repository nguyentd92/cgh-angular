import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthUser } from '../models/auth-user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {
  protected authUserSubject: BehaviorSubject<AuthUser> = new BehaviorSubject<AuthUser>(null);

  constructor(private router: Router) {
    this.authUserSubject.next(this.getAuthUserFromLC())
  }

  protected getAuthUserFromLC(): any {
    return  JSON.parse(localStorage.getItem('authUser'));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authUser$.pipe(
      map(e => !!e),
      tap(e => { if(!e) this.router.navigateByUrl('/login')} )
    );
  }

  get authUser$(): Observable<AuthUser> {
    return this.authUserSubject.asObservable();
  }

  protected setAuthUser(authUser: AuthUser): void {
    this.authUserSubject.next(authUser);
  }

  login(email: string, password: string): Observable<AuthUser>  {
    return this.apiLogin(email, password)
      .pipe(tap(user => {
        this.setAuthUser(user);
        this.storeAuthUserToLC(user);
      }))
  }

  protected storeAuthUserToLC(user: any) {
    localStorage.setItem('authUser', JSON.stringify(user));
  }

  logOut() {
    return this.setAuthUser(null);
  }

  protected apiLogin(email: string, password: string): Observable<any> {
    const isSuccess = email === 'codegym@gmail.com' && password == '12345678'

    if(isSuccess) {
      return timer(1000).pipe(map(_ => ({email, full_name: email} as AuthUser)));
    } else {
      return throwError({message: 'Invalid Credentials'});
    }
  }
}
