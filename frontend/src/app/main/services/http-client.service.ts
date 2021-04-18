import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HttpClientService {
  constructor(private httpClient: HttpClient) { }


  baseUrl: string = 'http://127.0.0.1:5000/api/';

  getNumberOfArtists() {
    return this.httpClient.get(
      `${this.baseUrl}number-of-artists`
    )
  }

  paginate(pageNumber: number) {
    return this.httpClient.get(
      `${this.baseUrl}artists/page/${pageNumber}`
    )
  }

  getArtist(id: number) {
    return this.httpClient.get(
      `${this.baseUrl}artist/${id}`
    )
  }
  
}