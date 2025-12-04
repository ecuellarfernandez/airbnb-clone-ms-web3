import { NgModule } from '@angular/core';
import { CloudinaryService } from './infrastructure/cloudinary.service';
import { UploadCloudinaryUseCase } from './application/use-cases/upload-cloudinary.usecase';

@NgModule({
  providers: [CloudinaryService, UploadCloudinaryUseCase]
})
export class CloudinaryModule { }
