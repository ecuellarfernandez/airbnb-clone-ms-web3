import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CloudinaryService } from "../../infrastructure/cloudinary.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteCloudinaryUseCase {
    constructor(private cloudinaryService: CloudinaryService) { }

    execute(publicId: string): Observable<void> {
        return this.cloudinaryService.delete(publicId);
    }
}
