import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CloudinaryImage } from "../domain/models/cloudinary-image.model";
import { environment } from "environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class CloudinaryService {
    private readonly cloudName = environment.cloudinary.cloudName;
    private readonly uploadPreset = environment.cloudinary.uploadPreset;
    private readonly uploadUrl =
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    constructor(private http: HttpClient) { }

    upload(file: File): Observable<CloudinaryImage> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.uploadPreset);

        return this.http.post<any>(this.uploadUrl, formData).pipe(
            map(res => ({
                publicId: res.public_id,
                url: res.secure_url,
            }))
        );
    }
}