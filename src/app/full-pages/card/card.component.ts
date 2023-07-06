import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  cards: Card[] = [];
  constructor(private cardService: CardService, private router: Router){

  }
  @Input() card!: Card;

  ngOnInit(): void {
    this.cardService.findAll().subscribe((cards: Card[]) => {
      this.cards = cards;
      console.log(cards);
    })
  }
}
