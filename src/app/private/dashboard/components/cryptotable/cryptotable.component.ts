import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CryptoService } from '../../services/crypto.service';
import { CryptoInterface } from '../../models/crypto.model';
import { CryptoUserInterface } from '../../models/cryptoUser.model';
import {MatDialog} from '@angular/material/dialog';
import { TrademodalComponent } from '../trademodal/trademodal.component';

@Component({
  selector: 'app-cryptotable',
  templateUrl: './cryptotable.component.html',
  styleUrls: ['./cryptotable.component.scss'],
})
export class CryptotableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value', 'stock', 'amount', 'trade'];
  dataSource: MatTableDataSource<CryptoInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  user: string | null = sessionStorage.getItem('user');

  cryptos: CryptoInterface[];

  userCryptos : CryptoUserInterface[];

  userId: string = '810f8e0a-c7bb-11ed-afa1-0242ac120002';

  constructor(private cryptoService: CryptoService, public dialog: MatDialog) {
  }

  openDialog(row : any) {
    const rowIndex = this.cryptos.indexOf(row);
    this.dialog.open(TrademodalComponent,  {
      data: {
        cryptoId: this.cryptos[rowIndex].cryptoId,
        cryptoname: this.cryptos[rowIndex].cryptoname,
        value: this.cryptos[rowIndex].value,
        icon: this.cryptos[rowIndex].icon,
        asset: this.cryptos[rowIndex].asset,
        stock: this.cryptos[rowIndex].stock,
        amount: this.cryptos[rowIndex].amount
      },
    });
  }

  ngOnInit() {
    this.cryptoService.getAllCryptos().subscribe((data) => {
      this.cryptos = data;
      this.cryptoService.getCryptosUserByUserId(this.userId).subscribe((data) => {
        this.userCryptos = data;
        this.addCryptoUserData();
        this.dataSource = new MatTableDataSource(this.cryptos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
    
  }

  addCryptoUserData(){
    this.cryptos.forEach(obj => {
      let found = this.userCryptos.find(element => element.cryptoId === obj.cryptoId);
      if(found){
        obj.amount = found.amount;
        obj.userId = found.userId;
      }else{
        obj.amount = 0;
      }
    })
  }

  applyFilter(event: Event) {
    console.log(this.dataSource);
    this.dataSource = new MatTableDataSource(this.cryptos);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
