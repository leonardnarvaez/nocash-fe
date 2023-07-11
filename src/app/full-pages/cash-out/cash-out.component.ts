import { Component, OnInit, Input } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cash-out',
  templateUrl: './cash-out.component.html',
  styleUrls: ['./cash-out.component.css']
})
export class CashOutComponent implements OnInit{
  cards: Card[] = [];
  constructor(
    private cardService: CardService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.cardService.findAll().subscribe((existingCards: Card[]) => {
      this.cards = existingCards;
    })
  }

  goBack():void {
    this.location.back();
  }
}
