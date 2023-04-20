import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CryptoService } from '../../services/crypto.service';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/public/login/services/user.service';

@Component({
  selector: 'app-trademodal',
  templateUrl: './trademodal.component.html',
  styleUrls: ['./trademodal.component.scss'],
})
export class TrademodalComponent implements OnInit {
  userString = sessionStorage.getItem('user');
  userObject = JSON.parse(this.userString ?? '{}');

  cryptoId: string;
  cryptoname: string;
  value: number;
  icon: string;
  asset: string;
  stock: number;
  userId: string;
  amount: number;

  pay = new FormControl(0);

  get = new FormControl(0);

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TrademodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cryptoService : CryptoService,
    private userService : UserService
  ) {
    console.log(data);
    this.cryptoId = data.cryptoId;
    this.cryptoname = data.cryptoname;
    this.value = data.value;
    this.icon = data.icon;
    this.asset = data.asset;
    this.stock = data.stock;
    this.userId = data.userId;
    this.amount = data.amount;

    userHasCrypto : Boolean;
  }

  ngOnInit(): void {}

  refreshGet(){
    this.get.setValue(this.pay.value  /this.value);
  }

  refreshPay(){
    this.pay.setValue(this.get.value * this.value);
  }

  toNumber(text: string) {
    return Number(text);
  }

  public onSubmit(): void {
    this.buyOperation();
  }

  handleError(error: any) {
    if (error.status === 500) {
      //  Show error message
      // this.errorMsg = 'El usuario no existe';
    }
  }

  buyOperation(){
      console.log("Has comprado" + this.get.value + " de " + this.cryptoname);
      console.log(this.userObject.userId + ", " + this.cryptoId + ", " +  Number(this.amount) + Number(this.get.value));

      this.cryptoService.getCryptosUserByUserId(this.userId).subscribe((data) => {
          // this.userHasCrypyo = data.
        },
        (err) => {
          this.handleError(err);
        });

      this.cryptoService.updateCryptoUser(this.userObject.userId, this.cryptoId, this.amount + Number(this.get.value)).subscribe(
        (data) => {
          if (data) {
            this.dialogRef.close();
          }
        },
        (err) => {
          this.handleError(err);
        }
      );;
      // this.userService.
      
  }
}
