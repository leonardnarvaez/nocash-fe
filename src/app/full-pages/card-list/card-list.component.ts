import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit{
  cards: Card[] = [];
  constructor(private cardService: CardService){

  }
  ngOnInit(): void {
    this.cardService.findAll().subscribe((retrievedCards: Card[]) => {
      this.cards = retrievedCards;
    })
  }
}
