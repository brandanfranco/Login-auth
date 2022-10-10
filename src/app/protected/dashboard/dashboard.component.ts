import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  get user() {
    return this.authService.getterUser;
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logOut() {
    this.router.navigateByUrl('/auth');
  }
}
