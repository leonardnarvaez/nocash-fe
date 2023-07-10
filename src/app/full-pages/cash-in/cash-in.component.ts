import { Component, OnInit, Input } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cash-in',
  templateUrl: './cash-in.component.html',
  styleUrls: ['./cash-in.component.css']
})
export class CashInComponent implements OnInit{
  cards: Card[] = [];
  constructor(private cardService: CardService, private location: Location){}

  ngOnInit(): void {
    this.cardService.findAll().subscribe((existingCards: Card[]) => {
      this.cards = existingCards;
    })
  }
  goBack(): void {
    this.location.back();
  }

  test(cardId: string | undefined): void {
    if(typeof(cardId) === 'undefined') {
      console.error("card id is undefined");
    } else {
      alert(cardId);
    }
  }
}
