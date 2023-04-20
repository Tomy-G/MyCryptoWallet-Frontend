import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoInterface } from '../models/crypto.model';
import { CryptoUserInterface } from '../models/cryptoUser.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private cryptoURL: string = 'http://localhost:5000/api/cryptos/all/';
  private cyptosUserUrl: string = 'http://localhost:5000/api/user-crypto/get/';
  private updateCryptoUserUrl: string =
    'http://localhost:5000/api/user-crypto/add';
  constructor(private http: HttpClient) {}

  getAllCryptos(): Observable<CryptoInterface[]> {
    return this.http.get<CryptoInterface[]>(this.cryptoURL);
  }

  getCryptosUserByUserId(user_id: string): Observable<CryptoUserInterface[]> {
    return this.http.get<CryptoUserInterface[]>(
      `${this.cyptosUserUrl}${user_id}`
    );
  }

  updateCryptoUser(
    userId: string,
    cryptoId: string,
    amount: number
  ): Observable<string> {
    const body = {
      userId: userId,
      cryptoId: cryptoId,
      amount: amount,
    };
    return this.http.post<string>(this.updateCryptoUserUrl, body);
  }
}
