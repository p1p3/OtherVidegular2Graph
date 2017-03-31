import { UploadFormComponent } from './upload-form/upload-form.component';
import { VideoUploadComponent } from './video-upload.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const VideoUploadRoutes: Routes = [{
    path: '',
    component: VideoUploadComponent,
    children: [
        {
            path: '',
            component: UploadFormComponent,
        }
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(VideoUploadRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class VideoUploadRoutingModule { }