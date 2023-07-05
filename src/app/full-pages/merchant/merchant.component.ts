import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';
import { Merchant } from 'src/app/models/merchant';


@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit{
  constructor(private merchantService: MerchantService, private router: Router) {
  }
  @Input() merchant!: Merchant;

  ngOnInit(): void {
    this.merchantService.findAll().subscribe((merchants: Merchant[]) => {
      console.log(merchants)
    })
  }
}
