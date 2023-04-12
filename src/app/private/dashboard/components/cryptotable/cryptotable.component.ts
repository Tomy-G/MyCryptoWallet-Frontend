import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CryptoService } from '../../services/crypto.service';
import { CryptoInterface } from '../../models/crypto.model';
import { CryptoUserInterface } from '../../models/cryptoUser.model';

@Component({
  selector: 'app-cryptotable',
  templateUrl: './cryptotable.component.html',
  styleUrls: ['./cryptotable.component.scss'],
})
export class CryptotableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'value', 'stock', 'amount'];
  dataSource: MatTableDataSource<CryptoInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cryptos: CryptoInterface[];

  userCryptos : CryptoUserInterface[];

  userId: string = '810f8e0a-c7bb-11ed-afa1-0242ac120002';

  constructor(private cryptoService: CryptoService) {}
  ngOnInit() {
    this.cryptoService.getAllCryptos().subscribe((data) => {
      this.cryptos = data;
    });
    this.cryptoService.getCryptosUserByUserId(this.userId).subscribe((data) => {
      this.userCryptos = data;
      this.addCryptoUserData();
      this.dataSource = new MatTableDataSource(this.cryptos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCryptoUserData(){
    this.cryptos.forEach(obj => {
      let found = this.userCryptos.find(element => element.cryptoId === obj.cryptoId);
      if(found){
        obj.amount = found.amount;
        obj.userId = found.userId;
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
