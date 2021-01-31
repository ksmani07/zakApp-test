import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoTitleService {

  constructor(private http: HttpClient) { }

  public createAutoTitle(data): Observable<any>{
    const url = `${environment.API_URL}/autotitles/create`;
    return this.http.post(url, data); 
  }

  public updateAutoTitle(autoid, data): Observable<any>{
    const url = `${environment.API_URL}/autotitles/${autoid}`;
    return this.http.patch(url, data);
  }

  public getAutoTitle(): Observable<any>{
    const url = `${environment.API_URL}/autotitles`;
    return this.http.get(url);
  }
}
