import {Component, inject, signal} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatChipEditedEvent, MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgIf} from "@angular/common";
import {VideoPlayerComponent} from "../video-player/video-player.component";
import {VideoDto} from "../video-dto";

@Component({
  selector: 'app-save-video-details',
  standalone: true,
  imports: [
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    MatChipInput,
    NgIf,
    VideoPlayerComponent
  ],
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']  // Corrected property name to `styleUrls`
})
export class SaveVideoDetailsComponent {

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = "";
  videoId = '';
  fileSelected = false;
  videoUrl!: string;
thumbnailUrl!:string;
  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
    });
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our value
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }


  remove(value: string): void {

    const index = this.tags.indexOf(value);
    if (index >= 0) {
      this.tags.splice(index, 1);
      ;
    }
  }

  onFileSelected($event: Event) {
    // @ts-ignore
    this.selectedFile = $event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId).subscribe(data => {
      console.log(data);
      //show an upload success notification
      this.matSnackBar.open("Thumbnail Upload Successfuly", "OK");
    })
  }

  saveVideo() {
    //make a call to video service to make a http call to our backend
    const videoMetaData: VideoDto = {
      "id" : this.videoId,
      "title": this.saveVideoDetailsForm.get('title')?.value,
      "description":this.saveVideoDetailsForm.get("description")?.value,
      "tags":this.tags,
      "videoStatus":this.saveVideoDetailsForm.get("videoStatus")?.value,
      "videoUrl":this.videoUrl,
      "thumbnailUrl":this.thumbnailUrl
    }
    this.videoService.saveVideo(videoMetaData).subscribe(data => {
      this.matSnackBar.open("Video Metadata Updated Successfully", "OK");
    })
  }
}


































