import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoInterface } from '../models/crypto.model';
import { CryptoUserInterface } from '../models/cryptoUser.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private cryptoURL: string =
    'http://localhost:5000/api/cryptos/all/';
  private cyptosUser: string = 'http://localhost:5000/api/user-crypto/get/';
  constructor(private http: HttpClient) {}

  getAllCryptos() : Observable<CryptoInterface[]>{
    return this.http.get<CryptoInterface[]>(this.cryptoURL);
  }

  getCryptosUserByUserId(user_id : string) : Observable<CryptoUserInterface[]>{
    return this.http.get<CryptoUserInterface[]>(`${this.cyptosUser}${user_id}`);
  }
}
