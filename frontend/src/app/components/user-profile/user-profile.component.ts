import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';

export interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private authState: AuthStateService,
    private router: Router
  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
  }

  ngOnInit(): void {}

  logout(): void {
    this.authState.setAuthState(false);
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
