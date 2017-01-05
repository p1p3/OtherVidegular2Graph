import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoScrollDirective } from './auto-scroll/auto-scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AutoScrollDirective],
  exports: [AutoScrollDirective]
})
export class SharedModule { }
