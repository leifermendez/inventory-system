import {FilePreviewModel} from 'ngx-awesome-uploader';
import {HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {FilePickerAdapter} from 'ngx-awesome-uploader';
import {environment} from "../environments/environment";
import {CookieService} from "ngx-cookie-service";

export class DemoFilePickerAdapter extends FilePickerAdapter {
  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
  }

  parseHeader = () => {
    const token = this.cookieService.get('session');
    let header = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    };
    return new HttpHeaders(header);
  };

  public uploadFile(fileItem: FilePreviewModel) {
    const form = new FormData();
    form.append('files[]', fileItem.file);
    const api = `${environment.api}/storage`;
    const req = new HttpRequest('POST', api, form, {
      reportProgress: true,
      headers: this.parseHeader()
    });
    return this.http.request(req)
      .pipe(
        map((res: HttpEvent<any>) => {
          if (res.type === HttpEventType.Response) {
            return res.body.id.toString();
          } else if (res.type === HttpEventType.UploadProgress) {
            // Compute and show the % done:
            const UploadProgress = +Math.round((100 * res.loaded) / res.total);
            return UploadProgress;
          }
        })
      );
  }

  public removeFile(fileItem): Observable<any> {
    return of({});
  }
}
