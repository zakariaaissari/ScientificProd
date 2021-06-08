import { Injectable } from '@angular/core';
import { HttpClient , HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = '/api/publication/';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  singlePublicationData:any;
  constructor(private http: HttpClient) { }

  public getPublications(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }
  public getPublication(id:number) {
    return this.http.get(API_URL + id).subscribe((res: Response) => {
      this.singlePublicationData = res;
    });
  }
  public addPublication(data:Object){
    return this.http.post(API_URL + 'add',data);
  }

  updatePublication(id:Number,data:Object): Observable<any> {
    return this.http.put(API_URL + 'update/'+id,data,{ responseType: 'text' });
  }

  deletePublication(id:Number): Observable<any> {
    return this.http.delete(API_URL + id,{ responseType: 'text' });
  }


}
