import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() cardDeleted: EventEmitter<Card> = new EventEmitter<Card>();

  ngOnInit(): void {
    this.cardService.findAll().subscribe((cards: Card[]) => {
      this.cards = cards;
      console.log(cards);
    })
  }

  deleteCard(card: Card) {
    if (!card.id) {
      console.error('Card ID is undefined');
      return;
    }
    this.cardService.deleteCard(card.id).subscribe(
      () => {
        console.log('Card deleted successfully');
        this.cardDeleted.emit(card);
      },
      error => {
        console.error('Failed to delete card:', error);
      }
    );
  }
  
}

