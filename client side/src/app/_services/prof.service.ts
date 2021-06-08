import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = '/api/prof/';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  singleProffeseurData:any;
  constructor(private http: HttpClient) { }

  getProfs(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }
  getProf(id) {
    return this.http.get(API_URL + id).subscribe((res: Response) => {
      this.singleProffeseurData = res;
    });;
  }
  addProf(data:Object): Observable<any> {
    return this.http.post(API_URL + 'add',data,{ responseType: 'text' });
  }
  updateProf(id:Number,data:Object): Observable<any> {
    return this.http.put(API_URL + 'update/'+id,data,{ responseType: 'text' });
  }



  deleteProf(id:Number): Observable<any> {
    return this.http.delete(API_URL+id,{ responseType: 'text' });
  }
  
}
