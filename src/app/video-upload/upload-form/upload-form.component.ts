import { ISubmitJobService } from './../shared/definitions/i-submit-job.service';
import { VideoMetadata } from './../shared/video-metadata.model';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FileDropDirective, FileUploader, FileItem } from 'ng2-file-upload';

const URL = 'http://bsksimulationapi.azurewebsites.net/v1/uploadVideoFile/';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  public header = { name: 'Ocp-Apim-Subscription-Key', value: '744f8b379a6745089d540706d84c70e2' };
  public uploader: FileUploader = new FileUploader({ url: URL, headers: [this.header], autoUpload: false });

  public allCompleted: boolean = false;
  public AssetId: string;
  public model: VideoMetadata;

  public removeItem(fileItem: FileItem): void {
    fileItem.remove();
    this.allCompleted = false;
  }

  public onSubmit() {
    this.submitJobService.submitJob(this.AssetId, this.model).subscribe(response => {
      console.log(response);
    });
  }

  constructor(private ref: ChangeDetectorRef,
    @Inject('ISubmitJobService') private submitJobService: ISubmitJobService) {
    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      this.ref.detectChanges();
    };

    this.uploader.onSuccessItem = (fileItem: FileItem, response: string) => {
      this.allCompleted = true;
      this.AssetId = JSON.parse(response)[0].split(':').pop();
    };

    this.model = new VideoMetadata();
  }

  ngOnInit() {
  }



}
