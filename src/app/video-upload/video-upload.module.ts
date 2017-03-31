import { SubmitJobService } from './shared/submit-job.service';
import { FormsModule } from '@angular/forms';
import { VideoUploadRoutingModule } from './video-upload-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './video-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadFormComponent } from './upload-form/upload-form.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    VideoUploadRoutingModule,
    FormsModule
  ],
  declarations: [VideoUploadComponent, UploadFormComponent],
  providers: [{ provide: 'ISubmitJobService', useClass: SubmitJobService },]
})
export class VideoUploadModule { }
