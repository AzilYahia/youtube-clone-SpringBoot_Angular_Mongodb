import {Component, Input, OnInit} from '@angular/core';
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgCoreModule} from "@videogular/ngx-videogular/core";

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    VgOverlayPlayModule,
    VgBufferingModule,
    VgControlsModule,
    VgCoreModule
  ],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent implements OnInit{

  @Input()
  videoUrl!:string | '';


  constructor() {
  }

  ngOnInit() {
  }

}
