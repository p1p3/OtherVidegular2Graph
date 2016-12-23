import { CoreModule } from './core/core.module';
import { EmotionAnalysisModule } from './emotion-analysis/emotion-analysis.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    EmotionAnalysisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
