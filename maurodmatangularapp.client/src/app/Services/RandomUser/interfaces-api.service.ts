import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RandomUser {
  gender: string
  name: Name
  location: Location
  email: string
  dob: Dob
  phone: string
  cell: string
  picture: Picture
}
export interface Name {
  title: string
  first: string
  last: string
}

export interface Location {
  city: string
  state: string
  country: string
  postcode: number
}
export interface Dob {
  date: string
  age: number
}
export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

export interface Results{
  results: Array<RandomUser>
}

@Injectable({
  providedIn: 'root'
})
export class InterfacesApiService {

  private configUrl: string = 'https://randomuser.me/api/';
  constructor(private http: HttpClient) { }

  getRandomUser(): Observable<Results> {
    const randomUser = this.http.get<Results>(this.configUrl);
    console.log(randomUser);
    return randomUser;
  }

}
