import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {LoginResponse, OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'youtube-clone-ui';


  constructor(private oidcSecurityService: OidcSecurityService) {

  }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        const {isAuthenticated} = loginResponse;
        console.log("app is authenticated", isAuthenticated);

        /*...*/
      });

  }


}
