import { StaticDataAnalysisComponent } from './static-data-analysis/static-data-analysis.component';
import { RealTimeAnalysisComponent } from './real-time-analysis/real-time-analysis.component';
import { VideoAnalysisComponent } from './video-analysis.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const VideoAnalysisRoutes: Routes = [
    {
        path: '',
        component: VideoAnalysisComponent,
        children: [
            {
                path: '',
                component: RealTimeAnalysisComponent,
            },
            {
                path: 'static-analysis',
                component: StaticDataAnalysisComponent
            },
            // {
            //     path: '/real-time',
            //     redirectTo: RealTimeAnalysisComponent,
            //     pathMatch: 'full'
            // }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(VideoAnalysisRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class VideoAnalysisRoutingModule { }