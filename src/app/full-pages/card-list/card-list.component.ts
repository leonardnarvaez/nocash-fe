import { Component, OnInit, Input } from '@angular/core';
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
  @Input() updatedCards: Card[] = [];

  ngOnInit(): void {
    this.cardService.findAll().subscribe((retrievedCards: Card[]) => {
      this.cards = retrievedCards;
    })
  }

  onCardCreated(card: Card) {
    this.cardService.save(card).subscribe(
      (response: Card) => {
        console.log('Card added successfully:', response);
      },
      error => {
        console.error('Failed to add card:', error);
      }
    );
    this.cards.push(card);
  }

  onCardDeleted(deletedCard: Card) {
    this.cards = this.cards.filter(card => card.id !== deletedCard.id);
  }

}
