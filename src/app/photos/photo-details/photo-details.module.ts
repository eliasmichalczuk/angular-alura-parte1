import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';

@NgModule({
  declarations: [PhotoDetailsComponent, PhotoCommentsComponent, PhotoCommentsComponent],
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    VmessageModule
  ],
  exports: [PhotoDetailsComponent, PhotoCommentsComponent]
})
export class PhotoDetailsModule { }
