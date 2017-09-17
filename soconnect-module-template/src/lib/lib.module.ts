import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibDemoComponent } from './component/demo.component';
import { LibDemoService } from  './service/demo.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LibDemoComponent
  ],
  exports: [
    LibDemoComponent
  ],
  providers: [
    LibDemoService
  ]
})
export class LibModule { }
