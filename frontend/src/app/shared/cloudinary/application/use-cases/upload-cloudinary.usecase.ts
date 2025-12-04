import { Observable } from "rxjs";
import { CloudinaryImage } from "../../domain/models/cloudinary-image.model";
import { CloudinaryService } from "../../infrastructure/cloudinary.service";

export class UploadCloudinaryUseCase {
    constructor(private cloudinaryService: CloudinaryService) { }

    execute(file: File): Observable<CloudinaryImage> {
        return this.cloudinaryService.upload(file);
    }
}