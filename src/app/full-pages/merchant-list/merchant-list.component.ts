import { Component, OnInit } from '@angular/core';
import { MerchantService } from 'src/app/services/merchant.service';
import { Merchant } from 'src/app/models/merchant';
import { Location } from '@angular/common';
@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit{
  merchants: Merchant[] = [];
  constructor(private merchantService: MerchantService, private location: Location){

  }
  ngOnInit(): void {
    this.merchantService.findAll().subscribe((retrievedMerchants: Merchant[]) => {
      this.merchants = retrievedMerchants;
    })
  }

  goBack(): void {
    this.location.back();
  }
}
