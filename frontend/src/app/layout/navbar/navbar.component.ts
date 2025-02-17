import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSignedIn: boolean = false;

  constructor(
    private authState: AuthStateService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authState.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }

  signOut(): void {
    this.authState.setAuthState(false);
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
