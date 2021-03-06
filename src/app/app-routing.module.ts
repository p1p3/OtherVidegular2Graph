import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'video-analysis',
        loadChildren: 'app/video-analysis/video-analysis.module#VideoAnalysisModule'
    },
        {
        path: 'video-upload',
        loadChildren: 'app/video-upload/video-upload.module#VideoUploadModule'
    },
    { path: '', redirectTo: '/video-analysis', pathMatch: 'full' },
    { path: '**', redirectTo: '/video-analysis', pathMatch: 'full'  },
];
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ],

})
export class AppRoutingModule { }