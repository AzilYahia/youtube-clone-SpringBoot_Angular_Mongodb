import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    MatButton,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isAuthenticated: boolean = false;
  constructor(private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit(): void {
  this.oidcSecurityService.isAuthenticated$.subscribe(
    ({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;
    }
  )
  }


  login() {
    this.oidcSecurityService.authorize();
  }

  logOff(){
    this.oidcSecurityService.logoffAndRevokeTokens();
  }
}
