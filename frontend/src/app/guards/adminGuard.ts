import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import {AuthService} from '../services/auth-services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class adminGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(): boolean {
        if (this.authService.isLoggedIn() && this.authService.hasRole('admin')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}