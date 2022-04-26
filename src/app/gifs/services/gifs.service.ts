import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) { 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  private _apiKey : string = 'mjeI49J6OQI1wXSEiHgQLYeVAxNZoKSE';
  private _historial: string[] = [];
  private serviceUrl : string = 'https://api.giphy.com/v1/gifs'

  public resultados : Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query: string = ''){
    
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', query)
      .set('limit', '10');
      
    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( (resp) => {
        this.resultados = resp.data;
        //console.log(resp.data);
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
    
  }
}
